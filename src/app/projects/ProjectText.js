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
    const [layoutMode, setLayoutMode] = useState("full");

    useEffect(()=> {
        if (window.innerWidth > 750) {
            setLayoutMode("full")
        } else {
            setLayoutMode("list")
        }
        window.addEventListener("resize", windowResize)
    }, [])

    function windowResize() {
        if (window.innerWidth > 750) {
            setLayoutMode("full")
        } else {
            setLayoutMode("list")
        }
    }

    //project info to display on left
    const projectInfo = [
        {
            name: "My Projects",
            desc: "I design tools that make complex engineering simpler and more accessible. From interactive VR documentation and digital twin platforms to teaching apps and research prototypes, my projects aim to cut down manual work, speed up insight, and help teams collaborate more effectively.",
            link: "none",
            anim: "projectText"
        },
        {
            name: "Tech / Coding",
            desc: "Leverages Google's Maps API and cloud services to enable users to search for places by name, type and location. This data can then be filtered, saved to the cloud or exported for personal use.",
            link: "/projects/tech",
            anim: "projectText2"
        },
        {
            name: "Univeristy",
            desc: "Led a team that designed and manufactured an autonomous buggy. Optimised the vehicles suspension response using Matlab to evaluate a kinematic model constructed from 1st Principles.",
            link: "/projects/uol",
            anim: "projectText"
        },
        {
            name: "Volunteering",
            desc: "Travelled to Tanzania to participate in several aid projects, including Civil Engineering work redirecting rainwater around a local school, refrbishing desks and working with children",
            link: "/projects/other",
            anim: "projectText1"
        },
    ]

    const projectBullets = [
        {text1: "", text2: "", text3: "", extLink: ""},
        {text1: "Built using HTML, CSS, JS", text2: "Powered by React, Firebase, Google APIs", text3: "Responsive design", extLink: "/projects/tech"},
        {text1: "Computer aided, analysis led design.", text2: "Project Managed team", text3: "Achieved 86% in this coursework", extLink: "/projects/uol"},
        {text1: "Fund raised over 2 years", text2: "Collaborated with a diverse team", text3: "Harboured a love for travel", extLink: "/projects/other"},
    ]

    const imageStyle = {
        width: '100%',
        height: 'auto'
      }
    
    //image info for right pane
    const imagesInfo = [
        {
            link: "splash",
            images: [{src: "/buggy/buggy1.png", h:4267, w:4267},
                     {src: "/searchmap2.png", h:862, w:862},
                     {src: "/tanzania/tanzania1.png", h:654, w:654}]
        },
        {
            link: "searchmap",
            images: [{src: "/searchmap1.png", h:1456, w:892},
                     {src: "/searchmap2.png", h:862, w:862},
                     {src: "/searchmap3.png", h:529, w:529}]
        },
        {
            link: "daringdash",
            images: [{src: "/buggy/buggy1.png", h:4267, w:2400},
                     {src: "/buggy/buggy2.png", h:624, w:624},
                     {src: "/buggy/buggy3.png", h:1340, w:1340}]
        },
        {
            link: "volunteering",
            images: [{src: "/tanzania/tanzania3.png", h:1062, w:681},
                     {src: "/tanzania/tanzania1.png", h:654, w:654},
                     {src: "/tanzania/tanzania2.png", h:654, w:654}]
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
        var {ref, inView } = useInView({threshold: 0.3})
        prj.prjRef = ref
        prj.isVisible = inView
    });

    var [pageBorder, borderInView] = useInView({threshold:1})
    const [ready, setShow] = useState(false);
    useEffect(() => {
        setShow(true)
    })

    return ((ready) ? 
    <div className="md:grid md:grid-cols-2"> {(layoutMode=="full") ? <>
        <div ref={pageBorder} className="h-8"></div> 
        <div className="col-start-1 col-span-1 hidden sm:block " >
            <div className={`xl:pl-8 lg:pl-0 md:pl-4 ${(borderInView)? "" : "md:fixed top-2 "} ${isVis? "" : "hidden"} xl:max-w-md lg:max-w-sm lg:pr-6 md:pr-8 md:max-w-sm`}>
            <h1 className={` xl:text-6xl md:text-5xl xl:mt-6 lg:mt-16 md:mt-8 font-bold tracking-tight text-gray-900 dark:text-gray-200 ${(scrollY<1)? projectInfo[scrollY].anim : ""}`}>{projectInfo[scrollY].name}</h1>
            <p className={`${projectInfo[scrollY].anim} mt-4 ml-1 text-lg leading-8 text-gray-600 dark:text-gray-200`}>{projectInfo[scrollY].desc}</p>
            {(projectBullets[scrollY].text1 != "") ? 
            <><ul className={`${projectInfo[scrollY].anim} transition-all md:mt-4 ml-8 list-disc `}>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text1}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text2}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text3}</li>
            </ul>
            <button href={projectBullets[scrollY].extLink}  className={` mt-6 z-50 ml-2 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl`}>
                <Link href={projectBullets[scrollY].extLink}> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
            </>
            : <></>}
            <ul className={`flex transition-all flex-wrap mt-4 ${(scrollY < 1)? "projectText": "hidden xl:flex"} `}>
            {[...projectInfo].splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:ring-indigo-600" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}>
                <a href={link} className="font-semibold text-blue-600 dark:text-gray-400">{name}  </a>
                </li> 
            ))}
            </ul>
            </div>
        </div>

        <div className="md:col-start-2 md:col-span-1 md:block hidden">
            {imagesInfo.map(({ images, prjRef, isVisible, link }, index) => (
            <div ref={prjRef} id={link} key={index} 
                className={`p-4 pt-8 transition-all mb-20
                ${(isVisible && (index>0))?         //if visible and not first card, check card above then render, else render if visible
                    (imagesInfo[index-1].isVisible)? "" : "md:shadow-xl md:scale-105 md:-translate-x-3 lg:translate-x-0  " 
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



        </> :
        <div className="block md:hidden">
            {projectInfo.map(({name,desc},index)=> (<div key={index}>
            <div id={imagesInfo[index].link}  className="col-start-1 col-span-1 sm:p-6 p-1 mt-8" >
                <div>
                <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">{name}</h1>
                <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">{desc}</p>
                {(projectBullets[index].text1 != "")? <>
                <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                    <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[index].text1}</li>
                    <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[index].text2}</li>
                    <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[index].text3}</li>
                </ul>
                <button href={projectBullets[index].extLink}  className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl">
                    <Link href={projectBullets[index].extLink}> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
                </>:
                <ul className="flex flex-wrap transition-all md:fixed xl:mt-64 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none ml-2">  
                    {[...projectInfo].splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                        <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:ring-indigo-600" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}>
                        <a href={link} className="font-semibold text-blue-600 dark:text-gray-400">{name}  </a>
                        </li> 
                    ))}</ul>
                }
                </div>
            </div>
            <div  className={`p-4`}>
                <Image unoptimized={true} src={imagesInfo[index].images[0].src} style={imageStyle} width={imagesInfo[index].images[0].w} height={imagesInfo[index].images[0].h} alt="todo"/>
            <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-1">
                    <Image src={imagesInfo[index].images[1].src} style={imageStyle} width={imagesInfo[index].images[1].w} height={imagesInfo[index].images[1].h} alt="todo"/></div>
                <div className="col-start-2 col-span-1">
                    <Image src={imagesInfo[index].images[2].src} style={imageStyle} width={imagesInfo[index].images[2].w} height={imagesInfo[index].images[2].h} alt="todo"/></div>
                </div>
            </div>
            </div>))}
        </div>}
    </div>
    :<></>)
}

export default ProjectText;

/*
(ready) ? 
        <div className="md:grid md:grid-cols-2"><div ref={pageBorder} className="h-8"></div> 
        <div className="col-start-1 col-span-1 p-6 transition-all hidden sm:block" >
            <h1 className={`text-4xl ml-3 md:mt-10 lg:mt-12 transition-all ${(borderInView)? "" : "md:fixed top-10 "} ${isVis? "" : "hidden"} font-bold tracking-tight text-gray-900 sm:text-6xl md:max-w-xs xl:max-w-none md:pr-12 pr-0  sm:max-w-none dark:text-gray-200`}>{projectInfo[scrollY].name}</h1>
            <p className={` mt-4 ml-3 mb-4 text-lg ${(borderInView)? "" : "md:fixed md:top-52 md:mt-0 xl:top-40 lg:top-54 lg:pt-3 xl:pt-2"} ${isVis? "" : "hidden"} xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600 dark:text-gray-200`}>{projectInfo[scrollY].desc}</p>
            {(projectBullets[scrollY].text1 != "") ? <>
            <ul className={` transition-all xl:mt-2 lg:mt-10 md:mt-6 ml-8 list-disc  ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none`}>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text1}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text2}</li>
                <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">{projectBullets[scrollY].text3}</li>
            </ul>
            <button href={projectBullets[scrollY].extLink}  className={` z-50 xl:mt-44 lg:mt-52 md:mt-36 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg  ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 "}  ${isVis? "" : "hidden"} flex text-xl font-bold dark:text-blue-500 text-blue-700 drop-shadow-2xl`}>
                <Link href={projectBullets[scrollY].extLink}> Check it out</Link> <RxExternalLink className="mt-1 ml-2" /></button>
            </>
            : <></>}
            {(scrollY < 1) ?
            <ul className={`flex flex-wrap ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none
                                            ${(projectBullets[scrollY].text1 != "")? "xl:mt-28 lg:mt-32 md:mt-24 md:ml-2 md:pt-2" : ""}`}>
            {projectInfo.splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:ring-gray-300" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:hover:dark:bg-gray-900`}>
                <a href={link} className="font-semibold text-indigo-600">{name}  </a>
                </li> 
            ))}
            </ul>
            :
            <ul className={`hidden xl:flex flex-wrap ${(borderInView)? "" : "md:fixed md:top-96 xl:top-64 lg:top-80 lg:pt-8 xl:pt-12"}  ${isVis? "" : "hidden"}  xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none
                                            ${(projectBullets[scrollY].text1 != "")? "xl:mt-48 lg:mt-32 md:mt-24 md:ml-2 md:pt-2" : ""}`}>
            {projectInfo.splice(1).map(({ name, link }, index) => (  //remove first spalsh page, then add links
                <li key={index} className={`${(scrollY==(index+1))? "shadow-xl dark:bg-gray-900" : ""} rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:hover:dark:bg-gray-900 dark:ring-gray-500`}>
                <a href={link} className="font-semibold text-indigo-600">{name}  </a>
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
        */

/*
<h1 className="text-4xl ml-3 md:mt-12 lg:mt-12 md:fixed font-bold tracking-tight text-gray-900 sm:text-6xl xl:max-w-md lg:max-w-sm pr-12 md:max-w-sm sm:max-w-none">{projectInfo[scrollY].name}</h1>
<p className="md:mt-32 mt-4 ml-3 mb-4 text-lg md:fixed xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600">{projectInfo[scrollY].desc}</p>
<ul className="flex flex-wrap md:fixed xl:mt-72 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none">
{projectInfo.map(({ name, link }, index) => (
    <li key={index} className={`${(scrollY==index)? "shadow-xl" : ""} rounded-full ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}>
    <a href={link} className="font-semibold text-indigo-600">{name}  </a>
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