import Header from "@/app/components/navbar/Header";
import TopHeader from "@/app/components/navbar/TopHeader";
import ProjectsGallery from "../AllProjects";

const SUMMARY = "I have always had a passion for engineering and technology, and have completed projects ranging from data visualisation tools to automation apps.";
const DETAILS = "These builds span full-stack web, data science, and 3D visualisation efforts. They show how I apply software engineering to real-world problems.";

export default function TechProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10 pt-16">
        <ProjectsGallery
          categorySlug="tech"
          pageTitle="Tech Projects"
          pageSummary={SUMMARY}
          pageDetails={DETAILS}
        />
      </main>
      <TopHeader />
    </>
  );
}
