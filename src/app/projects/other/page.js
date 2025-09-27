import Header from "../../components/navbar/Header";
import TopHeader from "../../components/navbar/TopHeader";
import ProjectsGallery from "../AllProjects";

const SUMMARY = "A grab bag of experiments and collaborations that don’t fit neatly into one category.";
const DETAILS = "From community initiatives to playful prototypes, these projects highlight curiosity and cross-disciplinary learning.";

export default function OtherProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10 pt-16">
        <div className="max-w-[var(--content-max-width)] mx-auto px-[var(--content-padding-x-sm)] sm:px-[var(--content-padding-x-md)] lg:px-[var(--content-padding-x-lg)] xl:px-[var(--content-padding-x-xl)]">
          <ProjectsGallery
            categorySlug="other"
            pageTitle="Other Projects"
            pageSummary={SUMMARY}
            pageDetails={DETAILS}
          />
        </div>
      </main>
      <TopHeader />
    </>
  );
}
