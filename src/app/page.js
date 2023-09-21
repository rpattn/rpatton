//import Image from 'next/image'

import { AiFillCheckCircle, AiFillPlusCircle } from "react-icons/ai";
import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import AlevelsDropDown from "./components/cv/AlevelsDropDown";
import Image from "next/image";
import GearBg from "./components/GearBg";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {
  //const skillsList = ["CAD", "Technical Drawing", "Engineering Standards", " GD&T", " Failure Investigation", " Verification & Validation", " Cost Analysis"]
  //const skillsList2 = ["Problem solving", "Critical thinking", " Collaboration", " Communication", "Risk Management"]
  
  return (
    <body>
      <Header />
      {children}

        <main className="min-h-screen grid xl:grid-cols-10 lg:px-32 px-6 xl:px-16 splashCard mb-20">

        </main>
      <TopHeader/>
    </body>
  )
}
