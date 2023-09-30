"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const ProjectNavigation = () => {

    const [scrollY, setScrollY] = useState(0);
    const main = useRef();

    useEffect(() => {
        const handleScroll = () => {
        setScrollY(window.scrollY);
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
    }, []);
    return (
        <ul ref={main} style={(scrollY>50)? {transform: "translate(0px,-60px)"} : {}}   
            className={`mt-4 hidden ${(scrollY>50)? " xl:block xl:fixed" : ""} }`}>

            <li className="mt-2 mb-1"><strong>Project 1</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#uol">...</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<480 & scrollY>380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#alevels">...</Link></li></div>
            </ul>
            <li className="mt-2 mb-1"><strong>Project 2</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<550 & scrollY>480) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#cummins">...</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<640 & scrollY>550) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#rolls-royce">...</Link></li></div>
            </ul>
    
        </ul>
    )
}

export default ProjectNavigation;