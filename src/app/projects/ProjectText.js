"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import ProjectImages from "./ProjectImages";
//import useOnScreen from "../components/useOnScreen";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { RxExternalLink } from "react-icons/rx";

const ProjectText = () => {

    const [scrollY, setScrollY] = useState(0); //used to track current project in view
    const [isVis, setVis] = useState(true);    //used to track if a project or splash page is in view 

    //project info to display on left
    const projectInfo = [
        {
            name: "My Projects",
            desc: "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
            link: "none",
        },
        {
            name: "Search Map",
            desc: "Leverages Google's Maps API and cloud services to enable users to search for places by name, type and location. This data can then be filtered, saved to the cloud or exported.",
            link: "#searchmap"
        },
        {
            name: "Project 200",
            desc: "Anim auto Magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
            link: "#project2",
        },
        {
            name: "Project 300",
            desc: "Anim auto Magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.",
            link: "#project3",
        },
    ]

    const projectBullets = [
        {text1: "", text2: "", text3: "", extLink: ""},
        {text1: "Built using HTML, CSS, JS", text2: "Powered by React, Firebase, Google APIs", text3: "Responsive design", extLink: "https://searchmap.web.app/"},
        {text1: "Built using Reasct", text2: "Built using React", text3: "Built using React", extLink: ""},
        {text1: "Built using React", text2: "Built using React", text3: "Builts using React", extLink: ""},
    ]

    const imageStyle = {
        width: '100%',
        height: 'auto'
      }
    
    //image info for right pane
    const imagesInfo = [
        {
            link: "splash",
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        },
        {
            link: "searchmap",
            images: [{src: "/searchmap1.png", h:1456, w:892},
                     {src: "/searchmap2.png", h:862, w:862},
                     {src: "/searchmap3.png", h:529, w:529}]
        },
        {
            link: "project2",
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        },
        {
            link: "project3",
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        }
    ]

    //set the current project window when images info changes - triggered by inViewEffect
    useEffect(()=> {
        var i = 0;
        var vis = false;
        for (let index = 0; index < imagesInfo.length; index++) {
            if (imagesInfo[index].isVisible) {
                i = index;
                vis = true;
                break;
            }
        }

        setScrollY(i)
        setVis(vis)
    }, [imagesInfo])

    //assign a ref and in view hook for each image card in imageInfo
    imagesInfo.forEach(prj => {
        var {ref, inView } = useInView({threshold: 0.35})
        prj.prjRef = ref
        prj.isVisible = inView
    });

    var [pageBorder, borderInView] = useInView({threshold:1})
    const [ready, setShow] = useState(false);
    useEffect(() => {
        setShow(true)
    })

    return (
        (ready) ? 
        <div className="md:grid md:grid-cols-2"><div ref={pageBorder} className="h-8"></div> 
        <div className="col-start-1 col-span-1 p-6 transition-all hidden sm:block" >
            <h1 className={`text-4xl ml-3 md:mt-10 lg:mt-12 transition-all ${(borderInView)? "" : "md:fixed top-10 "} ${isVis? "" : "hidden"} font-bold tracking-tight text-gray-900 sm:text-6xl md:max-w-xs xl:max-w-none md:pr-12 pr-0  sm:max-w-none dark:text-gray-200`}>{projectInfo[scrollY].name}</h1>
            <p class={` mt-4 ml-3 mb-4 text-lg ${(borderInView)? "" : "md:fixed md:top-52 md:mt-0 xl:top-40 lg:top-54 lg:pt-3 xl:pt-2"} ${isVis? "" : "hidden"} xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600 dark:text-gray-200`}>{projectInfo[scrollY].desc}</p>
            {(projectBullets[scrollY].text1 != "") ? <>
            <ul className={`xl:mt-2 lg:mt-10 md:mt-6 ml-8 list-disc  ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none`}>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text1}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text2}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text3}</li>
            </ul>
            <button href={projectBullets[scrollY].extLink}  className={` z-50 xl:mt-44 lg:mt-52 md:mt-36 ml-4 pl-4 pr-4 pt-2 pb-2 bg-blue-500 rounded-lg  ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 "}  ${isVis? "" : "hidden"} flex text-xl font-bold text-gray-100 `}>
                <Link href={projectBullets[scrollY].extLink}> Check it out</Link> <RxExternalLink className="mt-1 ml-2" /></button>
            </>
            : <></>}
            {(scrollY < 1) ?
            <ul className={`flex flex-wrap ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none
                                            ${(projectBullets[scrollY].text1 != "")? "xl:mt-28 lg:mt-32 md:mt-24 md:ml-2 md:pt-2" : ""}`}>
            {projectInfo.splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:ring-gray-300" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}>
                <a href={link} class="font-semibold text-indigo-600">{name}  </a>
                </li> 
            ))}
            </ul>
            :
            <ul className={`hidden xl:flex flex-wrap ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none
                                            ${(projectBullets[scrollY].text1 != "")? "xl:mt-48 lg:mt-32 md:mt-24 md:ml-2 md:pt-2" : ""}`}>
            {projectInfo.splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:bg-gray-900" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:hover:dark:bg-gray-900 dark:ring-gray-500`}>
                <a href={link} class="font-semibold text-indigo-600">{name}  </a>
                </li> 
            ))}
            </ul>}
        </div>

        <div className="md:col-start-2 md:col-span-1 md:block hidden">
            {imagesInfo.map(({ images, prjRef, isVisible, link }, index) => (
            <div ref={prjRef} id={link} key={index} 
                className={`p-4 pt-8 transition-all 
                ${(isVisible && (index>0))?         //if visible and not first card, check card above then render, else render if visible
                    (imagesInfo[index-1].isVisible)? "" : "md:shadow-xl md:scale-105 md:-translate-x-3 lg:translate-x-0" 
                : (isVisible)? "md:shadow-xl" : ""}`}> 

            <Image unoptimized={true} src={images[0].src} style={imageStyle} width={images[0].w} height={images[0].h} alt="todo"/>
            <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-1">
                    <Image src={images[1].src} style={imageStyle} width={images[1].w} height={images[1].h} alt="todo"/></div>
                <div className="col-start-2 col-span-1">
                    <Image src={images[2].src} style={imageStyle} width={images[2].w} height={images[2].h} alt="todo"/></div>
                </div>
            </div>
            ))}

            <div className="md:h-28 lg:h-16"></div>
        </div>
        </div>
        : <></>
    )
}

export default ProjectText;

/*
<h1 className="text-4xl ml-3 md:mt-12 lg:mt-12 md:fixed font-bold tracking-tight text-gray-900 sm:text-6xl xl:max-w-md lg:max-w-sm pr-12 md:max-w-sm sm:max-w-none">{projectInfo[scrollY].name}</h1>
<p class="md:mt-32 mt-4 ml-3 mb-4 text-lg md:fixed xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600">{projectInfo[scrollY].desc}</p>
<ul className="flex flex-wrap md:fixed xl:mt-72 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none">
{projectInfo.map(({ name, link }, index) => (
    <li key={index} className={`${(scrollY==index)? "shadow-xl" : ""} rounded-full ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}>
    <a href={link} class="font-semibold text-indigo-600">{name}  </a>
    </li>
))}
</ul>*/

/*
className={`${(isVisible && (index>0))? 
                    (imagesInfo[index-1].isVisible)? "hidden" : "" 
                    : (isVisible)? "" : "hidden"}`}*/


                    /*useEffect(() => {
        const handleScroll = () => {
            var scrollIndex = Math.round((window.scrollY-150)/(window.screen.width/3))
            if (scrollIndex < 0) {
                scrollIndex = 0
            }
            if (scrollIndex > (projectInfo.length - 2)) {
                scrollIndex = projectInfo.length - 1
            }
            setScrollY(scrollIndex);
        };

        // just trigger this so that the initial state 
        // is updated as soon as the component is mounted
        // related: https://stackoverflow.com/a/63408216
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
        window.removeEventListener("scroll", handleScroll);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);*/