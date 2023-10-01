
import Header from "../components/navbar/Header";
import TopHeader from "../components/navbar/TopHeader";
import AllProjects from "./AllProjects";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {

  return (
    <body>
      <Header />
      {children}

        <main >

            <div className="min-h-screen sm:grid xl:grid-cols-10 lg:px-32 xl:px-16 splashCard mb-20">
              
              <div className="xl:col-start-2 xl:col-span-8 ">
                  <AllProjects title="All Projects" type="all" desc="Description here" desc2="View all projects:"/>

              </div>

              <div className="xl:col-start-10 xl:col-span-1 hidden lg:block"> 
              </div>
            </div>
        </main>
      <TopHeader/>
    </body>
  )
}
