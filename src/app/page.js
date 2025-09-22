
import Image from "next/image";
import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import ProjectText from "./projects/ProjectText";
import ProjectImages from "./projects/ProjectImages";
import GearBg from "./components/GearBg";
import TypeText from "./TypeText";
import GearComp3 from "./Gears/Gear3Comp";
import Pinion1Comp from "./Gears/Pinion1Comp";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {
  const imageStyle = {
    width: '100%',
    height: 'auto'
  }
  
  return (
    <>
      <Header />
      {children}

        <main >
          <GearBg />

            <div className="sm:grid xl:grid-cols-10 lg:px-32 xl:px-16 splashCard mt-0">
              <div className="xl:col-start-1 xl:col-span-1  hidden lg:block">
                  
              </div>

              <div className="xl:col-start-2 xl:col-span-8  sm:-translate-y-0 -translate-y-14 -z-50 relative">
                <div className="sm:grid sm:grid-cols-2">
                <div className="sm:col-start-1 sm:col-span-1">
                <h1 className="absolute draftText text-8xl pt-24 md:pl-12 pl-4 font-bold tracking-tight text-gray-900 dark:text-gray-200">Hi</h1>
                <h1 className="absolute draftText2 transition-all text-5xl pt-48 md:pl-12 pl-4 font-bold tracking-tight text-gray-900 w-60 dark:text-gray-300"><TypeText text="I love design, engineering and problem solving" /></h1>
                <div className="dlsm draftLinexb bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinext2 bg-blue-900 bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinexb2 bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinext3 bg-blue-900 bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinexb3 bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinext4 bg-blue-900 bg-opacity-30 dark:bg-blue-500"></div>
                <div className="dlsm draftLinexb4 bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                <div className="hidden md:block dlsm draftLineyl absolute bg-blue-900 bg-opacity-30 xl:h-3/5 lg:h-3/5 md:h-3/5 sm:h-3/5 h-5/6 dark:bg-blue-500"></div>
                </div>
                <div className="sm:col-start-2 sm:col-span-1 hidden sm:block">
                  <div className="block dark:hidden">
                    <GearComp3 mode="light" />
                    <Pinion1Comp mode="light" />
                    </div>
                  <div className="dark:block hidden">
                    <GearComp3 mode="dark" />
                    <Pinion1Comp mode="dark" />
                  </div>
                  <div className="gearLine1 bg-gray-900  bg-opacity-30 dark:bg-gray-100" ></div>
                  <div className="gearLine2 bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                  <div className="gearLine3 bg-blue-900 bg-opacity-30 dark:bg-blue-500"></div>
                  <div className="gearLine4 bg-blue-900  bg-opacity-30 dark:bg-blue-500"></div>
                  <div className="gearLine5 bg-blue-900 bg-opacity-30 dark:bg-blue-500"></div>
                  <div className="gearLine2s bg-gray-900  bg-opacity-30 dark:bg-gray-100"></div>
                  <div className="gearLine3s bg-gray-900  bg-opacity-30 dark:bg-gray-100"></div>
                  <div className="gearLine2s2 bg-gray-900  bg-opacity-30 dark:bg-gray-100"></div>
                  <div className="gearLine3s2 bg-gray-900  bg-opacity-30 dark:bg-gray-100"></div>
                  <div className="gearDim1 italic font-serif"><p className=" text-3xl">x</p></div>
                </div>
                <div className="block sm:hidden">
                  <div className="block dark:hidden">
                    <Image src="/gear3.svg" alt="img" width={100} height={100} className="gearImgMobile"/>
                    </div>
                  <div className="dark:block hidden">
                    <Image src="/gear3-drk.svg" alt="img" width={100} height={100} className="gearImgMobile"/>
                  </div>
                </div>
                </div>
                <div className="dark:hidden mt-0 -z-50 relative">
                <div className="hidden md:block -z-50 relative"><Image alt="img" src="/title-block-ls.svg" width={500} height={500} style={imageStyle}/></div>
                <div className="block md:hidden sm:translate-y-0 translate-y-11 -z-50 relative"><Image alt="img" src="/title-block-pt.svg" width={500} height={500} style={imageStyle} className="-z-50 relative"/></div>
                </div>
                <div className="hidden dark:block mt-0 ">
                <div className="hidden md:block"><Image alt="img" src="/title-block-ls-drk.svg" width={500} height={500} style={imageStyle}/></div>
                <div className="block md:hidden sm:translate-y-0 translate-y-11"><Image alt="img" src="/title-block-pt-drk.svg" width={500} height={500} style={imageStyle}/></div>
                </div>
              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>

            <div className="min-h-screen sm:grid xl:grid-cols-10 lg:px-32 md:px-6 px-1 xl:px-16 splashCard md:mb-20 mb-4">
              <div id="projects" className="mt-4"></div>
              
              <div  className="xl:col-start-2 xl:col-span-8 ">
                  <ProjectText  />

              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </>
  )
}
