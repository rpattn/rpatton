<<<<<<< HEAD
"use client"
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const AlevelsDropDown = () => {

    var [dropDownOpen, setDropDownOpen] = React.useState(false);

    function dropDownClick() {
        setDropDownOpen(!dropDownOpen)
    }

    return !dropDownOpen ? (
            <div id="alevels" className="mt-6 flex">
                <h2 className="text-base font-semibold leading-7 dark:text-gray-200  text-gray-900">A-Levels: </h2>
                <p className="ml-2 leading-7">A*,A*,A</p>
                <AiFillPlusCircle onClick={dropDownClick} className=" align-middle m-auto mr-0 ml-2 fill-indigo-700 hover:fill-teal-700 w-5 h-5"/>
            </div>
    ): (
            <div id="alevels">
            <div className="grid grid-cols-13 mt-6">
                <div className="col-start-1 col-span-10">
                <h2 className="text-base dark:text-gray-200  font-semibold leading-7 text-gray-900 flex">Ashby Sixth Form <AiFillMinusCircle onClick={dropDownClick} className=" align-middle m-auto mr-0 ml-2 fill-indigo-700 hover:fill-teal-700 w-5 h-5"/></h2>
                <p className="text-base font-semibold leading-7 text-indigo-600 italic text-xs">A-Levels</p>
                </div>

                <div className="col-start-11 col-span-2 ">
                <p className="text-base text-right font-semibold leading-7 text-gray-900 text-lg">Leicester, UK</p>
                <p className="text-base text-right font-semibold leading-7 text-indigo-600 italic text-xs">2017 – 2019</p>
                </div>
            </div>

            <p>Physics – A*, Chemistry – A*, Mathematics – A. Further Maths (AS) – A.</p>
            </div>
    )
}


=======
"use client"
import React from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

const AlevelsDropDown = () => {

    var [dropDownOpen, setDropDownOpen] = React.useState(false);

    function dropDownClick() {
        setDropDownOpen(!dropDownOpen)
    }

    return !dropDownOpen ? (
            <div id="alevels" className="mt-6 flex">
                <h2 className="text-base font-semibold leading-7 dark:text-gray-200  text-gray-900">A-Levels: </h2>
                <p className="ml-2 leading-7">A*,A*,A</p>
                <AiFillPlusCircle onClick={dropDownClick} className=" align-middle m-auto mr-0 ml-2 fill-indigo-700 hover:fill-teal-700 w-5 h-5"/>
            </div>
    ): (
            <div id="alevels">
            <div className="grid grid-cols-13 mt-6">
                <div className="col-start-1 col-span-10">
                <h2 className="text-base dark:text-gray-200  font-semibold leading-7 text-gray-900 flex">Ashby Sixth Form <AiFillMinusCircle onClick={dropDownClick} className=" align-middle m-auto mr-0 ml-2 fill-indigo-700 hover:fill-teal-700 w-5 h-5"/></h2>
                <p className="text-base font-semibold leading-7 text-indigo-600 italic text-xs">A-Levels</p>
                </div>

                <div className="col-start-11 col-span-2 ">
                <p className="text-base text-right font-semibold leading-7 text-gray-900 text-lg">Leicester, UK</p>
                <p className="text-base text-right font-semibold leading-7 text-indigo-600 italic text-xs">2017 – 2019</p>
                </div>
            </div>

            <p>Physics – A*, Chemistry – A*, Mathematics – A. Further Maths (AS) – A.</p>
            </div>
    )
}


>>>>>>> dafc2641d0c2992b207e80ad8989b6af5aa5b977
export default AlevelsDropDown;