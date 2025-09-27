import Header from "../components/navbar/Header";
import TopHeader from "../components/navbar/TopHeader";
import ProjectsGallery from "./AllProjects";

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10 pt-16">
        <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding-x-sm)] sm:px-[var(--content-padding-x-md)] lg:px-[var(--content-padding-x-lg)] xl:px-[var(--content-padding-x-xl)]">
          <ProjectsGallery />
        </div>
      </main>
      <TopHeader />
    </>
  );
}
