//import Image from 'next/image'

import { AiFillCheckCircle, AiFillPlusCircle } from "react-icons/ai";
import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import AlevelsDropDown from "./components/cv/AlevelsDropDown";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {
  const skillsList = ["CAD", "Technical Drawing", "Engineering Standards", " GD&T", " Failure Investigation", " Verification & Validation", " Cost Analysis"]
  const skillsList2 = ["Problem solving", "Critical thinking", " Collaboration", " Communication", "Risk Management"]
  return (
    <body>
      <Header />
      {children}

        <main className="min-h-screen splashCard">

        </main>
      <TopHeader/>
    </body>
  )
}
