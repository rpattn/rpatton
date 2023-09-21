
import Image from "next/image";
import Header from "../components/navbar/Header";
import TopHeader from "../components/navbar/TopHeader";
import ProjectNavigation from "./ProjectNavigation";
import ProjectText from "./ProjectText";
import ProjectImages from "./ProjectImages";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {
    
  return (
    <body>
      <Header />
      {children}

        <main className="min-h-screen grid xl:grid-cols-10 lg:px-32 px-6 xl:px-16 splashCard mb-20">
            <div className="xl:col-start-1 xl:col-span-1  hidden lg:block"> 
                
            </div>

            <div className="xl:col-start-2 xl:col-span-8 ">
                <ProjectText />
                
            </div>

            <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
                
            </div>
        </main>
      <TopHeader/>
    </body>
  )
}
