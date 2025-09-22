"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AiFillCheckCircle } from "react-icons/ai";
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

  const coreSkills = useMemo(
    () => [
      {
        title: "Programming & DevOps",
        description:
          "JavaScript, Python, Go, C# (.NET & Unity 3D), Docker, Kubernetes, CI/CD, Git, REST APIs.",
      },
      {
        title: "Applications & Cloud",
        description:
          "CAD (Solidworks, Creo), Digital Twins, VR, Machine Learning, Microsoft Azure, Google Cloud.",
      },
      {
        title: "Project Management",
        description:
          "Problem-solving, Critical thinking, Agile/SCRUM, Failure Investigation, Risk Management.",
      },
    ],
    []
  );

  const experience = useMemo(
    () => [
      {
        company: "Ramboll",
        role: "Graduate Consultant",
        location: "London, UK",
        period: "September 2024 - Present",
        bullets: [
          "Developed a VR-ready full-stack web and desktop application that embeds existing CAD models into interactive documentation, including automated pipelines to convert CAD to OBJ/GLB, extract metadata, and transform Word to HTML/CSS, eliminating manual conversion.",
          "Enhanced a production wind asset management platform with Azure SSO and SMTP integration, managing Dockerised deployments, CI/CD pipelines, and Google Cloud Kubernetes infrastructure to ensure availability and security.",
          "Extended an internal lifecycle simulation tool written in Python by adding new functionality, a REST API, and a web interface to increase usability for non-technical colleagues while contributing to Agile SCRUM sprints.",
          "Delivered interdisciplinary engineering and advisory scopes across offshore wind projects, collaborating as part of a global team.",
        ],
      },
      {
        company: "Cummins",
        role: "Design Engineering Placement",
        location: "Darlington, UK",
        period: "June 2022 - June 2024",
        bullets: [
          "Developed engine components from concept to production, ensuring designs complied with new European and American regulations.",
          "Applied generative CAD (Creo) workflows in collaboration with CFD and FEA specialists to optimise complex geometries for performance and manufacturability.",
          "Led research and feasibility analysis for new European-market technology, developing concepts and cost evaluations.",
          "Managed a global, interdisciplinary team to implement a 7-Step solution to a product issue, chairing meetings to share results, review progress, and successfully mitigate risk.",
        ],
      },
    ],
    []
  );

  const projectGroups = useMemo(
    () => [
      {
        heading: null,
        items: [
          {
            name: "Machine Learning",
            description:
              "Extended Masters year group project by training a machine learning model to predict erosion and corrosion.",
          },
          {
            name: "Operational Analysis",
            description:
              "Built a full-stack Python/TypeScript/Docker application enabling non-technical users to run wind plant system design simulations, with automated post-processing for metrics and Gantt charts plus CI/CD deployment.",
          },
          {
            name: "NextCMMS",
            description:
              "Developing an enterprise-grade CMMS in Go, PostgreSQL, and Next.js with a flexible physical/EAV schema, role-based authentication (OAuth, 2FA), and planned 3D model ingest and IoT metering.",
          },
        ],
      },
    ],
    []
  );

  const education = useMemo(
    () => [
      {
        title: "Mechanical Engineering (Industrial) MEng, First Class Honours",
        detail:
          "University of Leeds, 2019 � 2024. Achieved first-class honours with a 77% average while continuing placement work part time in the final year; represented the university in rugby.",
      },
      {
        title: "Dissertation",
        detail:
          "Consulted with medical startup Eventum Orthopaedics to validate prototype medical hardware (grade 78.5%).",
      },
      {
        title: "Research Publication",
        detail:
          "Co-authored paper on erosion-corrosion of additively manufactured materials presented at EuroCorr2025.",
      },
      {
        title: "A-Levels",
        detail: "Ashby School | Physics A*, Chemistry A*, Mathematics A, Further Mathematics A (AS-Level).",
      },
    ],
    []
  );

  const interestGroups = useMemo(
    () => [
      {
        title: "Tech",
        items: [
          "Self-taught programmer since early teens, building games and robotics projects with a Raspberry Pi and following emerging AI for engineering workflows.",
        ],
      },
      {
        title: "Sport",
        items: [
          "Enjoy rugby and competitive swimming; avid Formula 1 fan following technical developments.",
        ],
      },
      {
        title: "Other",
        items: [
          "Keen musician | Grade 8 cornet, played in orchestras; currently learning piano.",
        ],
      },
    ],
    []
  );

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

      <main className="min-h-screen grid xl:grid-cols-10 md:px-32 px-6 xl:px-16 splashCard mb-20">
        <div ref={topSentinelRef} className="col-span-full h-0" />
        <div className="xl:col-start-1 xl:col-span-2 hidden lg:block">
          <Navigation activeSection={activeSection} isPinned={isPinned} />
        </div>

        <div className="xl:col-start-3 xl:col-span-7">
          <div className="xl:col-start-3 xl:col-span-8">
            <section id="statement" ref={statementRef} className="">
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">MEng EngTech IMechE</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <a className="text-indigo-600" href="mailto:rn.patton@outlook.com">rn.patton@outlook.com</a>
                {" | "}
                <a className="text-indigo-600" href="tel:+447931418928">07931 418928</a>
                {" | "}
                <Link className="text-indigo-600" href="https://linkedin.com/in/r-patton" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/r-patton
                </Link>
                {" | London, UK"}
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-200">
                Mechanical Engineer and Consultant with experience developing digital tools for engineering projects in the built environment, supported by industrial engineering and research into applied materials and machine learning. I apply technical knowledge and software development skills to build APIs and automation pipelines that enhance engineering design workflows and project delivery.
              </p>
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
