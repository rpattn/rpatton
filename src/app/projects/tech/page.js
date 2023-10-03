
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
                  <AllProjects title="Tech Projects" type="tech" 
                  desc="I have always had a passion for engineering and technology, and have completed many personal projects around the areas I am interested in, from apps and games when I was younger, to my current projects around data analysis tools and engineering visualisations." 
                  desc2="My passion for computer programming started at age 12, when I started to use my raspberry pi to create games. I have since used this skill to create complex web applications, and to enhance my university projects. I believe these skills make me a more dynamic, creative problem solver." 
                  splashImages={
                    [{src: "/fea/fea1.png", h:4267, w:4267},
                     {src: "/searchmap3.png", h:862, w:862},
                     {src: "/tech/apps3.png", h:654, w:654},
                     {src: "/tech/games5.png", h:654, w:654}]}/>

              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </body>
  )
}
