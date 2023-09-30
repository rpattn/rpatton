"use client";
import React, { useEffect } from "react";
import { render } from "react-dom";

const TypeText = ({text}) => {
    const targetText = text;

    const [targetTextTyped, setText] = React.useState("");
    const [count, setCount] = React.useState(null);

    useEffect(()=> {
        if (count < targetText.length-1) {
            var dt = 75
            if (targetText[targetTextTyped.length] == " ") {
                dt = 150
            }
            setText(targetTextTyped + targetText[targetTextTyped.length])
            setTimeout((dt)=>{
                setCount(targetTextTyped.length)
            }, dt)
        }
    }, [count])

    return(
        <p>{targetTextTyped} <span className="cursor-ping">I</span></p>
    )
}

export default TypeText;