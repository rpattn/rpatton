import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail, AiOutlineInfoCircle } from "react-icons/ai";
import Link from "next/link";
const TopHeader = () => {
  const items = [
    { icon: <BsFillTelephoneFill />, description: "07931 418928", link:"tel:07931 418928" },
    { icon: <AiOutlineMail />, description: "rn.patton@outlook.com", link:"mailto: rn.patton@outlook.com" },
    { icon: <AiOutlineInfoCircle />, description: "See my CV", link:"/cv" },
  ];
  
  return (
    <div className="mx-3 py-5 text-center pt-6">
      <div className="flex gap-3 flex-wrap justify-center self-center">
        <div className="bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent font-bold text-2xl">
          
        </div>
        <ul className="flex flex-wrap gap-2 md:gap-8 justify-center text-center">
          {items.map(({ icon, description,link }, index) => (
            <li key={index} className="flex items-center gap-2">
              <span>{icon}</span>
              <Link href={link}><span>{description}</span></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TopHeader;