"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const GearBg = () => {

    const [scrollY, setScrollY] = useState(0);

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

  const [imageStyle, setImageStyle] = useState({
    width: "50vh",
    height: "50vh",
    transform: "translate(0px, 0px)",
  })
  const [imageStyle2, setImageStyle2] = useState({
    width: "50vh",
    height: "50vh",
    transform: "translate(33vh, 29vh)" 
  })

  var scale = 1;
  useEffect(() => {
    scale = (window.innerWidth > 1000) ? 1.1 : 1.3
  })

  useEffect(() => {
    setImageStyle({
        width: (50*scale) + "vh",
        height: (50*scale) + "vh",
        transform: "translate(" + ((-27*scale) + "vh") + ", " + (((20*scale)+25) + "vh") + ")" + 
                    "rotate(" + (scrollY/5) + "deg)"
      })
    setImageStyle2({
        width: (50*scale) + "vh",
        height: (50*scale) + "vh",
        transform: "translate(" + ((6*scale) + "vh") + ", " + (((49*scale)+25) + "vh") + ")" + 
                    "rotate(" + (-scrollY/5) + "deg)"
      })
  }, [scrollY])
      
  return (
    <div >
      <Image className="z-10 fixed " style={imageStyle} src="/gear3.svg" width={500} height={500}></Image>
      <Image className="z-10 fixed" style={imageStyle2} src="/gear3.svg" width={500} height={500}></Image>
    </div>
  );
};
export default GearBg;