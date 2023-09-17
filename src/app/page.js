//import Image from 'next/image'

import { AiFillCheckCircle } from "react-icons/ai";
import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
//bg-base-100 shadow-xl

export default function RootLayout({ children }) {
  return (
    <body>
      <Header />
      {children}

        <main className="min-h-screen grid lg:grid-cols-10 md:px-14 px-6 splashCard">

          <div className="lg:col-start-1 lg:col-span-2 shadow-md"> 
            Navigation
          </div>

          <div className="lg:col-start-3 lg:col-span-6">

            <div className=" shadow-md">
            <h1 className="mt-2 font-bold tracking-tight text-gray-900 text-4xl mb-1">Statement</h1>
            <div className="line mb-4"></div>
            <p className="mt-2 text-x1 leading-8 text-gray-800">Final year master’s student (MEng) at the University of Leeds. Looking to apply my strong analytical and project management skills to solve complex problems in the Engineering Industry. Experience gained as a Design Engineer at Cummins has developed my ability to work as part of a global team to find data driven solutions that work for both client and business.</p>
            </div>

            <div className=" shadow-md">
            <h1 className="mt-6 font-bold tracking-tight text-gray-900 text-4xl mb-1">Education</h1>
            <div className="line mb-4"></div>
            <div className="grid grid-cols-13">
              <div className="col-start-1 col-span-10 ">
              <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">University of Leeds | School of Mechanical Engineering</h2>
              <p className="text-base font-semibold leading-7 text-indigo-600 italic text-xs">Mechanical Engineering (Industrial) MEng, BEng | Predicted 1st</p>
              </div>

              <div className="col-start-11 col-span-2 ">
              <p className="text-base text-right font-semibold leading-7 text-gray-900 text-lg">Leeds, UK</p>
              <p className="text-base text-right font-semibold leading-7 text-indigo-600 italic text-xs">09/2019 – Present</p>
              </div>
            </div>
            <ul>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Exceptional academic performance (average 77%) in individual coursework and team projects, accomplished whilst adapting to new teaching and team-working methods due to the COVID-19 pandemic</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3"><strong>Dissertation: </strong>Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            </ul>

            <div className="grid grid-cols-13 mt-6">
              <div className="col-start-1 col-span-10">
              <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">Ashby School | A-Levels</h2>
              <p className="text-base font-semibold leading-7 text-indigo-600 italic text-xs">Physics – A*, Chemistry – A*, Mathematics – A. Further Maths (AS) – A.</p>
              </div>

              <div className="col-start-11 col-span-2 ">
              <p className="text-base text-right font-semibold leading-7 text-gray-900 text-lg">Leicester, UK</p>
              <p className="text-base text-right font-semibold leading-7 text-indigo-600 italic text-xs">2017 – 2019</p>
              </div>
            </div>

            </div>


            <div className=" shadow-md">
            <h1 className="mt-6 font-bold tracking-tight text-gray-900 text-4xl mb-1">Industry Experience</h1>
            <div className="line mb-4"></div>
            <div className="grid grid-cols-13">
              <div className="col-start-1 col-span-10 ">
              <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">Cummins | Engineering</h2>
              <p className="text-base font-semibold leading-7 text-indigo-600 italic text-xs">Design Engineering Placement</p>
              </div>

              <div className="col-start-11 col-span-2 ">
              <p className="text-base text-right font-semibold leading-7 text-gray-900 text-lg">Darlington, UK</p>
              <p className="text-base text-right font-semibold leading-7 text-indigo-600 italic text-xs">07/2022 – Present</p>
              </div>
            </div>
            <ul>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Exceptional academic performance (average 77%) in individual coursework and team projects, accomplished whilst adapting to new teaching and team-working methods due to the COVID-19 pandemic</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3"><strong>Dissertation: </strong>Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            </ul>
            </div>


            <div className=" shadow-md">
            <h1 className="mt-6 font-bold tracking-tight text-gray-900 text-4xl mb-1">Leadership Activities</h1>
            <div className="line mb-4"></div>
            <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg">Cummins | Engineering</h2>   

            <ul>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Exceptional academic performance (average 77%) in individual coursework and team projects, accomplished whilst adapting to new teaching and team-working methods due to the COVID-19 pandemic</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            </ul>

            <h2 className="text-base font-semibold leading-7 text-gray-900 text-lg mt-2">Cummins | Engineering</h2>
            <ul>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Exceptional academic performance (average 77%) in individual coursework and team projects, accomplished whilst adapting to new teaching and team-working methods due to the COVID-19 pandemic</p>
            </li>
            <li className="grid grid-cols-14">
              <AiFillCheckCircle className="col-start-1 col-span-1 m-1" />
              <span className="col-start-2 col-span-1 m-1"></span>
              <p className="col-start-3">Something else can go here with action verbs and stuff bust must be long enough to start a new line</p>
            </li>
            </ul>
            </div>
          </div>

          <div className="lg:col-start-9 lg:col-span-2 shadow-md"> 
            Skills
          </div>
      </main>
      <TopHeader/>
    </body>
  )
}
