import Header from "../../components/navbar/Header";
import TopHeader from "../../components/navbar/TopHeader";
import ProjectsGallery from "../AllProjects";

const SUMMARY = "Mechanical Engineering at Leeds gave me the foundation to solve complex, real-world problems.";
const DETAILS = "These university projects mix rigorous analysis with creative prototyping, often extending briefs with simulation or software tooling.";

export default function UniversityProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10 pt-16">
        <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding-x-sm)] sm:px-[var(--content-padding-x-md)] lg:px-[var(--content-padding-x-lg)] xl:px-[var(--content-padding-x-xl)]">
          <ProjectsGallery
            categorySlug="uol"
            pageTitle="University Projects"
            pageSummary={SUMMARY}
            pageDetails={DETAILS}
          />
        </div>
      </main>
      <TopHeader />
    </>
  );
}
