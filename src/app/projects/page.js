
import Header from "../components/navbar/Header";
import TopHeader from "../components/navbar/TopHeader";
import AllProjects from "./AllProjects";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {

  return (
    <>
      <Header />
      {children}

        <main >

            <div className="min-h-screen sm:grid xl:grid-cols-10 lg:px-32 xl:px-16 splashCard mb-20">
              
              <div className="xl:col-start-2 xl:col-span-8 ">
                  <AllProjects title="All Projects" type="all" 
                  desc="Here you can see all of my projects, from my university work to my personal and hobby projects. Scroll, or click on any of the links to see more:" 
                  desc2="Scroll, or click on any of the links to see more:" 
                  splashImages={
                    [{src: "/buggy/buggy1.png", h:4267, w:4267},
                     {src: "/uol/wing3.png", h:862, w:862},
                     {src: "/uol/bridge2.png", h:654, w:654}]}/>

              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </>
  )
}
