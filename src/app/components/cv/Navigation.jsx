<<<<<<< HEAD
"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Navigation = () => {

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
        <ul ref={main} style={(scrollY>50)? {transform: "translate(0px,-60px)"} : {}}   className={`mt-4 hidden xl:block ${(scrollY>50)? " lg:fixed" : ""}`}>

            <li className="mt-2 mb-1"><strong>Education</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#uol">University of Leeds</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<480 & scrollY>380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#alevels">A-Levels</Link></li></div>
            </ul>
            <li className="mt-2 mb-1"><strong>Industry Experience</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<550 & scrollY>480) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#cummins">Cummins</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<640 & scrollY>550) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#rolls-royce">Rolls-Royce</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Leadership Activities</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<780 & scrollY>640) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#projectman">Project Management | Cummins</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<950 & scrollY>780) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#daringdash">Daring Dash Competition</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<1110 & scrollY>950) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#volunteering">Volunteering</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Employment History</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<1280 & scrollY>1110) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#bfb">British Food Box</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<1500 & scrollY>1280) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#edge">The Edge</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Skills</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY>1500) ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#technical">Technical</Link></li>
                <li className="ml-2"> <Link href="#projectman2">Project Management</Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Hobbies & Interests</strong></li>
            <li className="mt-6"><strong>Projects</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY>2000) 
                    ? "border-lime-500 dark:border-blue-600" : "border-blue-300"}`}>
                    <li className="ml-3 w-48"> <Link href="/projects#searchmap" className="flex">Search Map <AiOutlineInfoCircle className=" fill-blue-900 m-1 w-4 h-4" /></Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY>2500) 
                    ? "border-lime-500 dark:border-blue-600" : "border-blue-300"}`}>
                    <li className="ml-3 w-48"> <Link href="/projects#viseng" className="flex">VisEng <AiOutlineInfoCircle className=" fill-blue-900 m-1 w-4 h-4" /></Link></li></div>
            </ul>
        </ul>
    )
}

=======
"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Navigation = () => {

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
        <ul ref={main} style={(scrollY>50)? {transform: "translate(0px,-60px)"} : {}}   className={`mt-4 hidden xl:block ${(scrollY>50)? " lg:fixed" : ""}`}>

            <li className="mt-2 mb-1"><strong>Education</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#uol">University of Leeds</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<480 & scrollY>380) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#alevels">A-Levels</Link></li></div>
            </ul>
            <li className="mt-2 mb-1"><strong>Industry Experience</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<550 & scrollY>480) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#cummins">Cummins</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<640 & scrollY>550) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#rolls-royce">Rolls-Royce</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Leadership Activities</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<780 & scrollY>640) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#projectman">Project Management | Cummins</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<950 & scrollY>780) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#daringdash">Daring Dash Competition</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<1110 & scrollY>950) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#volunteering">Volunteering</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Employment History</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY<1280 & scrollY>1110) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#bfb">British Food Box</Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY<1500 & scrollY>1280) 
                    ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}>
                    <li className="ml-3 w-48"> <Link href="#edge">The Edge</Link></li></div>
            </ul>
            <li className="mt-2"><strong>Skills</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY>1500) ? "border-lime-500 dark:border-blue-600" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#technical">Technical</Link></li>
                <li className="ml-2"> <Link href="#projectman2">Project Management</Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Hobbies & Interests</strong></li>
            <li className="mt-6"><strong>Projects</strong></li>
            <ul className="ml-4 mb-2">
                <div className={`border-2 w-0 mt-0 ${(scrollY>2000) 
                    ? "border-lime-500 dark:border-blue-600" : "border-blue-300"}`}>
                    <li className="ml-3 w-48"> <Link href="/projects#searchmap" className="flex">Search Map <AiOutlineInfoCircle className=" fill-blue-900 m-1 w-4 h-4" /></Link></li></div>
                <div className={`border-2 w-0 mt-0 ${(scrollY>2500) 
                    ? "border-lime-500 dark:border-blue-600" : "border-blue-300"}`}>
                    <li className="ml-3 w-48"> <Link href="/projects#viseng" className="flex">VisEng <AiOutlineInfoCircle className=" fill-blue-900 m-1 w-4 h-4" /></Link></li></div>
            </ul>
        </ul>
    )
}

>>>>>>> dafc2641d0c2992b207e80ad8989b6af5aa5b977
export default Navigation;