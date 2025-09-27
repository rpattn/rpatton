"use client";



import { useEffect, useState } from "react";

import Link from "next/link";

import { AiFillCheckCircle } from "react-icons/ai";

import cvData from "./cv-data.json";

import { useInView } from "react-intersection-observer";

import Header from "../components/navbar/Header";

import TopHeader from "../components/navbar/TopHeader";

import Navigation from "../components/cv/Navigation";



const bulletIconClass = "m-1 bulletIcon";



export default function RootLayout({ children }) {

  const { ref: topSentinelRef, inView: topInView } = useInView({ threshold: 1 });

  const { ref: statementRef, inView: statementInView } = useInView({ threshold: 0.2 });

  const { ref: skillsRef, inView: skillsInView } = useInView({ threshold: 0.2 });

  const { ref: experienceRef, inView: experienceInView } = useInView({ threshold: 0.2 });

  const { ref: projectsRef, inView: projectsInView } = useInView({ threshold: 0.2 });

  const { ref: educationRef, inView: educationInView } = useInView({ threshold: 0.2 });

  const { ref: interestsRef, inView: interestsInView } = useInView({ threshold: 0.2 });



  const { statement, coreSkills, experience, projectGroups, education, interestGroups } = cvData;



  const [activeSection, setActiveSection] = useState("statement");



  useEffect(() => {

    const states = [

      { id: "statement", inView: statementInView },

      { id: "skills", inView: skillsInView },

      { id: "experience", inView: experienceInView },

      { id: "projects", inView: projectsInView },

      { id: "education", inView: educationInView },

      { id: "interests", inView: interestsInView },

    ];



    const nextState = states.find((state) => state.inView);



    if (nextState && nextState.id !== activeSection) {

      setActiveSection(nextState.id);

    } else if (!nextState && topInView && activeSection !== "statement") {

      setActiveSection("statement");

    }

  }, [

    activeSection,

    statementInView,

    skillsInView,

    experienceInView,

    projectsInView,

    educationInView,

    interestsInView,

    topInView,

  ]);



  const isPinned = !topInView;



  return (

    <>

      <Header />

      {children}



      <main className="min-h-screen grid xl:grid-cols-10 md:px-32 px-6 xl:px-16 splashCard mb-20 pt-16">

        <div ref={topSentinelRef} className="col-span-full h-0" />

        <div className="xl:col-start-1 xl:col-span-2 hidden lg:block">

          <Navigation activeSection={activeSection} isPinned={isPinned} />

        </div>



        <div className="xl:col-start-3 xl:col-span-7">

          <div className="xl:col-start-3 xl:col-span-8">

            <section id="statement" ref={statementRef} className="">

              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{statement.credential}</p>

              <p className="text-sm text-gray-600 dark:text-gray-300">

                {statement.contact.map((item, index) => (

                  <span key={item.label}>

                    {index > 0 ? " | " : null}

                    {item.href ? (

                      item.href.startsWith("http") ? (

                        <a className="text-indigo-600" href={item.href} target="_blank" rel="noopener noreferrer">

                          {item.label}

                        </a>

                      ) : (

                        <a className="text-indigo-600" href={item.href}>

                          {item.label}

                        </a>

                      )

                    ) : (

                      item.label

                    )}

                  </span>

                ))}

              </p>

              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-200">{statement.bio}</p>

            </section>



            <section id="skills" ref={skillsRef} className="mt-10">

              <h1 className="font-bold tracking-tight text-gray-900 dark:text-gray-200 text-4xl mb-1">Skills</h1>

              <div className="line mb-4 dark:bg-gray-400" />

              <div className="grid gap-4">

                {coreSkills.map(({ title, description }) => (

                  <div key={title}>

                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">

                      {title}

                    </h2>

                    <p className="text-gray-600 dark:text-gray-300">{description}</p>

                  </div>

                ))}

              </div>

            </section>



            <section id="experience" ref={experienceRef} className="mt-10">

              <h1 className="font-bold tracking-tight text-gray-900 dark:text-gray-200 text-4xl mb-1">

                Experience

              </h1>

              <div className="line mb-4 dark:bg-gray-400" />

              {experience.map(({ company, role, location, period, bullets }) => (

                <article key={`${company}-${role}`} className="mt-6">

                  <div className="grid grid-cols-13">

                    <div className="col-start-1 col-span-10">

                      <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">

                        {company} | {role}

                      </h2>

                    </div>

                    <div className="col-start-11 col-span-3 text-right">

                      <p className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">

                        {location}

                      </p>

                      <p className="text-xs font-semibold leading-7 text-indigo-600 dark:text-indigo-400">

                        {period}

                      </p>

                    </div>

                  </div>

                  <ul className="mt-2">

                    {bullets.map((item, index) => (

                      <li key={index} className="flex">

                        <AiFillCheckCircle className={bulletIconClass} />

                        <p className="ml-2 text-gray-700 dark:text-gray-200">{item}</p>

                      </li>

                    ))}

                  </ul>

                </article>

              ))}

            </section>



            <section id="projects" ref={projectsRef} className="mt-10">

              <h1 className="font-bold tracking-tight text-gray-900 dark:text-gray-200 text-4xl mb-1">

                Projects

              </h1>

              <div className="line mb-4 dark:bg-gray-400" />

              {projectGroups.map(({ heading, items }, groupIndex) => (

                <div key={heading ?? groupIndex} className="mt-6">

                  {heading ? (

                    <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">{heading}</h2>

                  ) : null}

                  <ul className="mt-2">

                    {items.map(({ name, href, description }) => (

                      <li key={name} className="flex">

                        <AiFillCheckCircle className={bulletIconClass} />

                        <p className="ml-2 text-gray-700 dark:text-gray-200">

                          {href ? (

                            <Link

                              href={href}

                              className="font-semibold text-indigo-600"

                              target={href?.startsWith("http") ? "_blank" : undefined}

                              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}

                            >

                              {name}

                            </Link>

                          ) : (

                            <span className="font-semibold text-gray-900 dark:text-gray-100">{name}</span>

                          )}

                          {": "}{description}

                        </p>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </section>



            <section id="education" ref={educationRef} className="mt-10">

              <h1 className="font-bold tracking-tight text-gray-900 dark:text-gray-200 text-4xl mb-1">

                Education

              </h1>

              <div className="line mb-4 dark:bg-gray-400" />

              <ul>

                {education.map(({ title, detail }) => (

                  <li key={title} className="flex">

                    <AiFillCheckCircle className={bulletIconClass} />

                    <p className="ml-2 text-gray-700 dark:text-gray-200">

                      <span className="font-semibold text-gray-900 dark:text-gray-100">{title}</span>

                      {": "}{detail}

                    </p>

                  </li>

                ))}

              </ul>

            </section>



            <section id="interests" ref={interestsRef} className="mt-10">

              <h1 className="font-bold tracking-tight text-gray-900 dark:text-gray-200 text-4xl mb-1">

                Hobbies & Interests

              </h1>

              <div className="line mb-4 dark:bg-gray-400" />

              {interestGroups.map(({ title, items }) => (

                <div key={title} className="mt-4">

                  <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-gray-200">

                    {title}

                  </h2>

                  <ul>

                    {items.map((item, index) => (

                      <li key={index} className="flex">

                        <AiFillCheckCircle className={bulletIconClass} />

                        <p className="ml-2 text-gray-700 dark:text-gray-200">{item}</p>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </section>

          </div>

        </div>

      </main>



      <TopHeader />

    </>

  );

}
