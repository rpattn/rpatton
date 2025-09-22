"use client"
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { RxExternalLink } from "react-icons/rx";
import ProjectImageCard from "./ProjectImageCard";

const imageStyle = {
    width: "100%",
    height: "auto",
};

const baseProjectInfo = Object.freeze([
    {
        name: "My Projects",
        desc: "I design tools that make complex engineering simpler and more accessible. From interactive VR documentation and digital twin platforms to teaching apps and research prototypes, my projects aim to cut down manual work, speed up insight, and help teams collaborate more effectively.",
        link: "none",
        anim: "projectText",
    },
    {
        name: "Tech / Coding",
        desc: "A collection of personal coding projects, from search tools and mobile apps to data visualisation and automation pipelines. Includes work with APIs, cloud deployment, and front-end interfaces.",
        link: "/projects/tech",
        anim: "projectText2",
    },
    {
        name: "University",
        desc: "Group and individual engineering projects completed during my MEng, ranging from an autonomous buggy and turbine optimisation to FEA simulations and control system studies.",
        link: "/projects/uol",
        anim: "projectText",
    },

    {
        name: "Volunteering",
        desc: "Travelled to Tanzania to participate in several aid projects, including Civil Engineering work redirecting rainwater around a local school, refrbishing desks and working with children",
        link: "/projects/other",
        anim: "projectText1",
    },
]);

const baseProjectBullets = Object.freeze([
    { text1: "", text2: "", text3: "", extLink: "" },
    {
        text1: "Self-taught programmer since early teens",
        text2: "Projects include APIs, automation pipelines, and cloud deployments",
        text3: "Experience across web, mobile, and XR applications",
        extLink: "/projects/tech"
    },
    {
        text1: "Group and individual engineering projects during MEng",
        text2: "Applied CAD, FEA, MATLAB, and control system methods",
        text3: "Highlights include autonomous buggy (86%) and turbine optimisation",
        extLink: "/projects/uol"
    },
    { text1: "Fund raised over 2 years", text2: "Collaborated with a diverse team", text3: "Harboured a love for travel", extLink: "/projects/other" },
]);

const baseImagesInfo = Object.freeze([
    {
        link: "splash",
        images: [
            { src: "/images/ddm_demo.png", h: 4267, w: 4267 },
            { src: "/images/wombat2.png", h: 862, w: 862 },
            { src: "/images/ncmms1.png", h: 862, w: 862 },
        ],
    },
    {
        link: "searchmap",
        images: [
            { src: "/images/wombat1.png", h: 1456, w: 892 },
            { src: "/searchmap2.png", h: 862, w: 862 },
            { src: "/images/ncmms1.png", h: 529, w: 529 },
        ],
    },
    {
        link: "daringdash",
        images: [
            { src: "/buggy/buggy1.png", h: 4267, w: 2400 },
            { src: "/buggy/buggy2.png", h: 624, w: 624 },
            { src: "/buggy/buggy3.png", h: 1340, w: 1340 },
        ],
    },
    {
        link: "volunteering",
        images: [
            { src: "/tanzania/tanzania3.png", h: 1062, w: 681 },
            { src: "/tanzania/tanzania1.png", h: 654, w: 654 },
            { src: "/tanzania/tanzania2.png", h: 654, w: 654 },
        ],
    },
]);

const ProjectText = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isVis, setVis] = useState(true);
    const [layoutMode, setLayoutMode] = useState("full");
    const [ready, setReady] = useState(false);

    const handleWindowResize = useCallback(() => {
        setLayoutMode(window.innerWidth > 750 ? "full" : "list");
    }, []);

    useEffect(() => {
        handleWindowResize();
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [handleWindowResize]);

    const { ref: pageBorderRef, inView: borderInView } = useInView({ threshold: 1 });

    const projectInfo = useMemo(() => baseProjectInfo, []);
    const projectBullets = useMemo(() => baseProjectBullets, []);
    const imagesInfo = useMemo(() => baseImagesInfo, []);

    const [visibility, setVisibility] = useState(() => new Array(imagesInfo.length).fill(false));

    useEffect(() => {
        setVisibility(new Array(imagesInfo.length).fill(false));
        setScrollY(0);
    }, [imagesInfo.length]);

    useEffect(() => {
        if (!visibility.length) {
            setVis(false);
            setScrollY(0);
            return;
        }

        const firstVisible = visibility.findIndex(Boolean);

        if (firstVisible === -1) {
            setVis(false);
            setScrollY(0);
        } else {
            setVis(true);
            setScrollY((prev) => (prev === firstVisible ? prev : firstVisible));
        }
    }, [visibility]);

    const handleVisibilityChange = useCallback((index, inView) => {
        setVisibility((prev) => {
            if (index < 0 || index >= prev.length || prev[index] === inView) {
                return prev;
            }
            const next = [...prev];
            next[index] = inView;
            return next;
        });
    }, []);

    useEffect(() => {
        setReady(true);
    }, []);

    const activeIndex = projectInfo.length ? Math.min(scrollY, projectInfo.length - 1) : 0;
    const activeProject = projectInfo[activeIndex];
    const activeBullets = projectBullets[activeIndex];

    return ready ? (
        <div className="md:grid md:grid-cols-2">
            {layoutMode === "full" ? (
                <>
                    <div ref={pageBorderRef} className="h-8"></div>
                    <div className="col-start-1 col-span-1 hidden sm:block ">
                        <div
                            className={`xl:pl-8 lg:pl-0 md:pl-4 ${borderInView ? "" : "md:fixed top-10 "
                                } ${isVis ? "" : "hidden"} xl:max-w-md lg:max-w-sm lg:pr-6 md:pr-8 md:max-w-sm`}
                        >
                            <h1
                                className={` xl:text-4xl md:text-4xl   font-bold tracking-tight text-gray-900 dark:text-gray-200 ${activeIndex < 1 ? activeProject?.anim ?? "" : ""
                                    }`}
                            >
                                {activeProject?.name}
                            </h1>
                            <p
                                className={`${activeProject?.anim ?? ""} mt-2 ml-1 text-md leading-8 text-gray-600 dark:text-gray-200`}
                            >
                                {activeProject?.desc}
                            </p>
                            {activeBullets?.text1 ? (
                                <>
                                    <ul className={`${activeProject?.anim ?? ""} transition-all md:mt-4 ml-8 list-disc`}>
                                        <li className="text-md xl:mb-1 text-gray-700 dark:text-gray-200">{activeBullets.text1}</li>
                                        <li className="text-md xl:mb-1 text-gray-700 dark:text-gray-200">{activeBullets.text2}</li>
                                        <li className="text-md xl:mb-1 text-gray-700 dark:text-gray-200">{activeBullets.text3}</li>
                                    </ul>
                                    {activeBullets.extLink !== "" &&
                                        <button
                                            href={activeBullets.extLink}
                                            className=" mt-6 z-50 ml-2 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl"
                                        >
                                            <Link href={activeBullets.extLink}> Check it out</Link>
                                            <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" />
                                        </button>}
                                </>
                            ) : null}
                            <ul className="flex transition-all flex-wrap mt-4 ">
                                {[...projectInfo].splice(1).map(({ name, link }, index) => (
                                    <li
                                        key={`${name}-${index}`}
                                        className={`${scrollY === index + 1 ? "shadow-xl dark:ring-indigo-600" : ""
                                            } rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}
                                    >
                                        <a href={link} className="font-semibold text-blue-600 dark:text-gray-400">
                                            {name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="md:col-start-2 md:col-span-1 md:block hidden">
                        {imagesInfo.map((imageSet, index) => (
                            <ProjectImageCard
                                key={imageSet.link ?? index}
                                images={imageSet.images}
                                link={imageSet.link}
                                index={index}
                                previousVisible={visibility[index - 1] ?? false}
                                onVisibilityChange={handleVisibilityChange}
                                showExtraImage={false}
                            />
                        ))}

                        <div className="md:h-28 lg:h-72"></div>
                    </div>
                </>
            ) : (
                <div className="block md:hidden">
                    {projectInfo.map((project, index) => (
                        <div key={`${project.name}-${index}`}>
                            <div id={imagesInfo[index]?.link} className="col-start-1 col-span-1 sm:p-6 p-1 mt-8">
                                <div>
                                    <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
                                        {project.name}
                                    </h1>
                                    <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">
                                        {project.desc}
                                    </p>
                                    {projectBullets[index]?.text1 ? (
                                        <>
                                            <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                                                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">
                                                    {projectBullets[index].text1}
                                                </li>
                                                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">
                                                    {projectBullets[index].text2}
                                                </li>
                                                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">
                                                    {projectBullets[index].text3}
                                                </li>
                                            </ul>
                                            {projectBullets[index].extLink !== "" &&
                                                <button
                                                    href={projectBullets[index].extLink}
                                                    className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl"
                                                >
                                                    <Link href={projectBullets[index].extLink}> Check it out</Link>
                                                    <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" />
                                                </button>}
                                        </>
                                    ) : (
                                        <ul className="flex flex-wrap transition-all md:fixed xl:mt-64 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none ml-2">
                                            {[...projectInfo].splice(1).map(({ name, link }, linkIdx) => (
                                                <li
                                                    key={`${name}-${linkIdx}`}
                                                    className={`${scrollY === linkIdx + 1
                                                        ? "shadow-xl dark:ring-indigo-600"
                                                        : ""
                                                        } rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}
                                                >
                                                    <a href={link} className="font-semibold text-blue-600 dark:text-gray-400">
                                                        {name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="p-4">
                                {imagesInfo[index] ? (
                                    <>
                                        <Image
                                            unoptimized
                                            src={imagesInfo[index].images[0].src}
                                            style={imageStyle}
                                            width={imagesInfo[index].images[0].w}
                                            height={imagesInfo[index].images[0].h}
                                            alt="todo"
                                            className="sm:hidden"
                                        />
                                        <div className="grid grid-cols-2">
                                            <div className="col-start-1 col-span-1">
                                                <Image
                                                    src={imagesInfo[index].images[1].src}
                                                    style={imageStyle}
                                                    width={imagesInfo[index].images[1].w}
                                                    height={imagesInfo[index].images[1].h}
                                                    alt="todo"
                                                />
                                            </div>
                                            <div className="col-start-2 col-span-1">
                                                <Image
                                                    src={imagesInfo[index].images[2].src}
                                                    style={imageStyle}
                                                    width={imagesInfo[index].images[2].w}
                                                    height={imagesInfo[index].images[2].h}
                                                    alt="todo"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ) : (
        <></>
    );
};

export default ProjectText;
