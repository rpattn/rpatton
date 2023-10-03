
//bg-base-100 shadow-xl

import Header from "@/app/components/navbar/Header";
import TopHeader from "@/app/components/navbar/TopHeader";
import AllProjects from "../AllProjects";

export default function RootLayout({ children }) {

  return (
    <body>
      <Header />
      {children}

        <main >

            <div className="min-h-screen sm:grid xl:grid-cols-10 lg:px-32 xl:px-16 splashCard mb-20">
              
              <div className="xl:col-start-2 xl:col-span-8 ">
                  <AllProjects title="Other Projects" type="other" desc="Other projects description" desc2="more"
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
    </body>
  )
}
