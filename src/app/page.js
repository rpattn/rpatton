
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
    <body>
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
              <div className="xl:col-start-1 xl:col-span-1  hidden lg:block">
                
              </div>
              
              <div id="projects" className="xl:col-start-2 xl:col-span-8 ">
                  <ProjectText  />


                  <div className="block md:hidden">
                  <div className="col-start-1 col-span-1 sm:p-6 p-1 transition-all " >
                      <h1 className="text-5xl ml-3 mt:4 md:fixed font-bold tracking-tight text-gray-900 sm:text-5xl xl:max-w-md lg:max-w-sm pr-12 md:max-w-sm sm:max-w-none dark:text-gray-200">My Projects</h1>
                      <p className="dark:text-gray-200 md:mt-32 mt-4 ml-3 mb-4 text-lg md:fixed xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                      <ul className="flex flex-wrap transition-all md:fixed xl:mt-64 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none ml-2">  
                          <li className={`dark:ring-indigo-500 rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="#searchmap2"  className="font-semibold text-indigo-600">Search Map</a> </li> 
                          <li className={`dark:ring-indigo-500 rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="#daringdash2"  className="font-semibold text-indigo-600">University Projects</a> </li> 
                          <li className={`dark:ring-indigo-500 rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="#feasandbox2"  className="font-semibold text-indigo-600">FEA Sandbox</a> </li> 
                          <li className={`dark:ring-indigo-500 rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="#volunteering2"  className="font-semibold text-indigo-600">Volunteering</a> </li> 
                      </ul>
                  </div>

                  <div id="searchmap2"  className="col-start-1 col-span-1 sm:p-6 p-1 mt-8" >
                    <div>
                    <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Search Map</h1>
                    <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">Leverages Google's Maps API and cloud services to enable users to search for places by name, type and location. This data can then be filtered, saved to the cloud or exported for personal use.</p>
                    <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Built using HTML, CSS, JS</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Powered by React, Firebase, Google APIs</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Responsive Design</li>
                    </ul>
                    <button href="https://searchmap.web.app/"  className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl">
                        <Link href="https://searchmap.web.app/"> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
                    </div>
                  </div>
                  <div  className={`p-4`}>
                    <Image src="/searchmap3.png" style={imageStyle} width={529} height={529} alt="searchmapImg"/>
                  </div>
            

                  <div id="daringdash2" className="col-start-1 col-span-1 sm:p-6 p-1 mt-8" >
                    <div>
                    <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Daring Dash</h1>
                    <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">Led a team that designed and manufactured an autonomous buggy. Optimised the vehicles suspension response using Matlab to evaluate a kinematic model constructed from 1st Principles.</p>
                    <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Computer aided, analysis led design.</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Project Managed Team and achieved 86% on this assigment</li>
                    </ul>
                    <button href="/projects"  className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl">
                        <Link href="/projects"> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
                    </div>
                  </div>
                  <div  className={`p-4`}>
                    <Image src="/buggy/buggy2.png" style={imageStyle} width={624} height={624} alt="daringdashImg"/>
                  </div>

                  <div id="feasandbox2" className="col-start-1 col-span-1 sm:p-6 p-1 mt-8" >
                    <div>
                    <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">FEA Sandbox</h1>
                    <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">Browser based playground. Construct 2D node element models, apply forces, boundary conditions, and calculate the structure's response. Constructs intermediate matricies to help students visualise the finite element method.</p>
                    <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Designed as an Educational tool</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">First in a family of Engineering visualisations I am working on</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Open source, free to use</li>
                    </ul>
                    <button href="/fea/"  className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl">
                        <Link href="/fea/"> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
                    </div>
                  </div>
                  <div  className={`p-4`}>
                    <Image src="/fea/fea3.png" style={imageStyle} width={826} height={826} alt="feasandboxImg"/>
                  </div>

                  <div id="volunteering2" className="col-start-1 col-span-1 sm:p-6 p-1 mt-8" >
                    <div>
                    <h1 className="ml-3 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-200">Volunteering</h1>
                    <p className="mt-4 ml-3 text-lg leading-8 text-gray-600 dark:text-gray-200">Travelled to Tanzania to participate in several aid projects, including Civil Engineering work redirecting rainwater around a local school, refrbishing desks and working with children.</p>
                    <ul className="pt-4 transition-all md:mt-4 ml-8 list-disc ">
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Fund raised over 2 years to cover travel and accomodation costs</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Collaborated with a diverse group of people from around the world</li>
                        <li className="text-lg xl:mb-1 text-gray-700 dark:text-gray-200">Harboured a love for travel</li>
                    </ul>
                    <button href="/cv"  className="mt-6 z-50 ml-4 pl-4 pr-4 pt-2 pb-2 outline outline-1 outline-blue-500 rounded-lg flex text-xl font-bold dark:text-gray-300 dark:outline-indigo-600 text-blue-700 drop-shadow-2xl">
                        <Link href="/cv"> Check it out</Link> <RxExternalLink className="projectButton animate-pulse mt-1 ml-2" /></button>
                    </div>
                  </div>
                  <div  className={`p-4 pb-0`}>
                    <Image src="/tanzania/tanzania2.png" style={imageStyle} width={654} height={654} alt="volunteeringImg"/>
                  </div>

                  </div>
              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </body>
  )
}
