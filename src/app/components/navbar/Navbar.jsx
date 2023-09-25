"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import Dropdown from "./Dropdown";
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const menu = [
    { name: "Home", url: "/" },
    {
      name: "Projects",
      url: "/#projects",
      dropdown: [
        { name: "SearchMap", url: "/projects/searchmap" },
        { name: "VisEng", url: "/projects/viseng" },
      ],
    },
    { name: "CV", url: "/cv" },
    { name: "Contact", url: "/contact" },
  ];

  const [drop1, setDrop1] = useState(false)
  const [menuOpenBool, setMenu] = useState(false)
  const router = usePathname();

  function toggleMenu() {
    setMenu(!menuOpenBool)
  }

  function dropdownEnter() {
    setDrop1(true)
  }

  function dropdownLeave() {
    setDrop1(false)
  }

  function toggleDropdown() {setDrop1(!drop1)}
  
  return (
<div className="sm:grid xl:grid-cols-10 lg:px-32 xl:px-16 md:px-4 px-2" >
<div className={`xl:col-start-1 ${(router=="/cv")? "xl:col-span-2" : "xl:col-span-1"}  hidden lg:block`}></div>
<div className={`${(router=="/cv")? "xl:col-start-3 xl:col-span-7" : "xl:col-start-2 xl:col-span-8"}`}>
    <nav  className="border-gray-200 mt-4 mb-2">
    <div className=" mx-auto flex flex-wrap items-center justify-between">
        <a href="#" className="flex"> {/*inline svg logo*/}
            <span className="self-center ml-1 text-2xl font-semibold whitespace-nowrap">Robert Patton</span>
        </a>
        <button data-collapse-toggle="mobile-menu" onClick={toggleMenu} type="button" className="md:hidden ml-3 mr-2 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
        <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
        <div className={`${(menuOpenBool)? "block":"hidden md:block"} w-full md:w-auto`} id="mobile-menu">
        <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
            <a href="/" className={`${(router=="/")? "bg-blue-700 md:text-blue-700 text-white": "text-gray-700 md:hover:text-blue-700"} md:bg-transparent dark:text-gray-200 text-lg pl-3 pr-4 py-2  md:p-0 rounded focus:outline-none flex items-center justify-between w-full md:w-auto`} aria-current="page">Home</a>
            </li>
            <li>
                <button id="dropdownNavbarLink" onMouseEnter={dropdownEnter} onClick={toggleDropdown}  data-dropdown-toggle="dropdownNavbar"  className={`dark:text-gray-200 ${(router=="/projects")? "bg-blue-700 md:text-blue-700 text-white": "text-gray-700 md:hover:text-blue-700"} md:bg-transparent text-lg pl-3 pr-4 py-2  md:p-0 rounded focus:outline-none flex items-center justify-between w-full md:w-auto`} >
                  Projects <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></button>

                <div id="dropdownNavbar" onMouseLeave={dropdownLeave} className={` ${(drop1)? "fixed":"hidden"} bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-2`}>
                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                    <li>
                        <a href="#projects" onClick={dropdownLeave} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Overview</a>
                    </li>
                    <li>
                        <a href="#searchmap"  onClick={dropdownLeave} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Search Map</a>
                    </li>
                    <li>
                        <a href="#"  onClick={dropdownLeave} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">University Projects</a>
                    </li>
                    <li>
                        <a href="#feasandbox"  onClick={dropdownLeave} className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Engineering Visualisation</a>
                    </li>
                    </ul>
                    <div className="py-1">
                    <a href="#volunteering" className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">All Projects</a>
                    </div>
                </div>
            </li>
            <li>
            <a href="/cv"  className={`dark:text-gray-200 ${(router=="/cv")? "bg-blue-700 md:text-blue-700 text-white": "text-gray-700 md:hover:text-blue-700"} md:bg-transparent text-lg pl-3 pr-4 py-2  md:p-0 rounded focus:outline-none flex items-center justify-between w-full md:w-auto`} >CV</a>
            </li>
            <li>
            <a href="#"  className={`dark:text-gray-200 ${(router=="/contact")? "bg-blue-700 md:text-blue-700 text-white": "text-gray-700 md:hover:text-blue-700"} md:bg-transparent text-lg pl-3 pr-4 py-2  md:p-0 rounded focus:outline-none flex items-center justify-between w-full md:w-auto`} >Contact</a>
            </li>
        </ul>
        </div>
    </div>
    </nav>
</div>
</div>
  );
};
export default Navbar;