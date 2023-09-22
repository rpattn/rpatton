
import Image from "next/image";
import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import ProjectText from "./projects/ProjectText";
import ProjectImages from "./projects/ProjectImages";
import GearBg from "./components/GearBg";
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

            <div className="sm:grid xl:grid-cols-10 lg:px-32 px-6 xl:px-16 splashCard mt-4">
              <div className="xl:col-start-1 xl:col-span-1  hidden lg:block">
                  
              </div>

              <div className="xl:col-start-2 xl:col-span-8 ">
                <h1 className="absolute text-8xl pt-24 pl-12 font-bold tracking-tight text-gray-900">HI</h1>
                <div className="hidden md:block"><Image src="/title-block-ls.svg" width={500} height={500} style={imageStyle}/></div>
                <div className="block md:hidden"><Image src="/title-block-pt.svg" width={500} height={500} style={imageStyle}/></div>
              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>

            <div className="min-h-screen sm:grid xl:grid-cols-10 lg:px-32 px-6 xl:px-16 splashCard mb-20">
              <div className="xl:col-start-1 xl:col-span-1  hidden lg:block">
                
              </div>
              
              <div id="projects" className="xl:col-start-2 xl:col-span-8 ">
                  <ProjectText  />
                  <div className="block md:hidden">
                  <div className="col-start-1 col-span-1 p-6 transition-all " >
                      <h1 className="text-4xl ml-3 mt:4 md:fixed font-bold tracking-tight text-gray-900 sm:text-6xl xl:max-w-md lg:max-w-sm pr-12 md:max-w-sm sm:max-w-none">My Projects</h1>
                      <p class="md:mt-32 mt-4 ml-3 mb-4 text-lg md:fixed xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none leading-8 text-gray-600">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                      <ul className="flex flex-wrap transition-all md:fixed xl:mt-64 lg:mt-64 md:mt-72 xl:max-w-md lg:max-w-sm pr-12 md:max-w-xs sm:max-w-none">  
                          <li className={`rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="/project1"  class="font-semibold text-indigo-600">Project 1 </a> </li> 
                          <li className={`rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="/project2"  class="font-semibold text-indigo-600">Project 2 </a> </li> 
                          <li className={`rounded-full transition-all ml-1 mr-1 mt-3 mb-1 px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20`}><a href="/project3"  class="font-semibold text-indigo-600">Project 3 </a> </li> 
                      </ul>
                  </div>
                  <ProjectImages />
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
