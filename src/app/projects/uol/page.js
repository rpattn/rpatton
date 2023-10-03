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
                  <AllProjects title="University" type="uol" 
                  desc="Studying at the University of Leeds has given me a solid foundation of engineering knowledge and the opportunity to apply my studies to solve real-world problems."
                  desc2="I have also been able to use my computer programming skills to extend my projects beyond their initial brief, to improve accuracy of models, increase efficiency and display data in creative ways."
                  splashImages={
                    [{src: "/buggy/buggy1.png", h:4267, w:4267},
                     {src: "/uol/wing3.png", h:862, w:862},
                     {src: "/uol/bridge2.png", h:654, w:654}]}
                     />

              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </body>
  )
}
