import Header from "../components/navbar/Header";
import TopHeader from "../components/navbar/TopHeader";
import ProjectsGallery from "./AllProjects";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10">
        <ProjectsGallery />
      </main>
      <TopHeader />
    </>
  );
}
