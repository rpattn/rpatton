"use client";
import React, { useEffect } from "react";
import { render } from "react-dom";

const TypeText = ({text}) => {
    const targetText = text;

    const [targetTextTyped, setText] = React.useState("");
    const [count, setCount] = React.useState(null);

    useEffect(()=> {
        if (count < targetText.length-1) {
            setText(targetTextTyped + targetText[targetTextTyped.length])
            setTimeout(()=>{
                setCount(targetTextTyped.length)
            }, 75)
        }
    }, [count])

    return(
        <p>{targetTextTyped} <span className="cursor-ping">I</span></p>
    )
}

export default TypeText;