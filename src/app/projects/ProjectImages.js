"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import useOnScreen from "../components/useOnScreen";

const ProjectImages = ({setScroll}) => {

    const imageStyle = {
        width: '100%',
        height: 'auto'
      }

    const imagesInfo = [
        {
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        },
        {
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        },
        {
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        },
        {
            images: [{src: "/project_splash_1.jpg", h:424, w:238},
                     {src: "/project_splash_2.jpg", h:539, w:360},
                     {src: "/project_splash_3.jpg", h:508, w:339}]
        }
    ]

    return (
        <div className="md:col-start-2 md:col-span-1   md:block">
            {imagesInfo.map(({ images }, index) => (
            <div  key={index} className={`p-4 pt-8`}>
            <Image src={images[0].src} style={imageStyle} width={images[0].w} height={images[0].h} alt="todo"/>
            <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-1">
                    <Image src={images[1].src} style={imageStyle} width={images[1].w} height={images[1].h} alt="todo"/></div>
                <div className="col-start-2 col-span-1">
                    <Image src={images[2].src} style={imageStyle} width={images[2].w} height={images[2].h} alt="todo"/></div>
            </div>
            </div>
            ))}

            <div className="min-h-screen"></div>
        </div>
    )
}

export default ProjectImages;