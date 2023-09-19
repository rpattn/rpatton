"use client"
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";

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
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY>490) ? "border-gray-300" : "border-lime-500"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#uol">University of Leeds</Link></li>
                <li className="ml-2"> <Link href="#alevels">A-Levels</Link></li>
                </div>
            </ul>
            <li className="mt-2 mb-1"><strong>Industry Experience</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY<710 & scrollY>490) ? "border-lime-500" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#uol">Cummins</Link></li>
                <li className="ml-2"> <Link href="#alevels">Rolls-Royce</Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Leadership Activities</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-18 w-0 m-1 mt-0 ${
                (scrollY<1160 & scrollY>710) ? "border-lime-500" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#uol">Project Management</Link></li>
                <li className="ml-2"> <Link href="#alevels">Daring Dash Comp.</Link></li>
                <li className="ml-2"> <Link href="#alevels">Volunteering </Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Employment History</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY<1570 & scrollY>1160) ? "border-lime-500" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#uol">British Food Box</Link></li>
                <li className="ml-2"> <Link href="#alevels">The Edge</Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Skills</strong></li>
            <ul className="ml-2 flex mb-2">
                <div className={`border-2 h-12 w-0 m-1 mt-0 ${
                (scrollY>1570) ? "border-lime-500" : "border-gray-300"}`}></div>
                <div>
                <li className="ml-2"> <Link href="#uol">Technical</Link></li>
                <li className="ml-2"> <Link href="#alevels">Project Management</Link></li>
                </div>
            </ul>
            <li className="mt-2"><strong>Hobbies & Interests</strong></li>
            <li className="mt-2"><strong>Projects</strong></li>
        </ul>
    )
}

export default Navigation;