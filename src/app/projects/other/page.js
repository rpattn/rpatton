import Header from "@/app/components/navbar/Header";
import TopHeader from "@/app/components/navbar/TopHeader";
import ProjectsGallery from "../AllProjects";

const SUMMARY = "A grab bag of experiments and collaborations that don’t fit neatly into one category.";
const DETAILS = "From community initiatives to playful prototypes, these projects highlight curiosity and cross-disciplinary learning.";

export default function OtherProjectsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-transparent pb-10">
        <ProjectsGallery
          categorySlug="other"
          pageTitle="Other Projects"
          pageSummary={SUMMARY}
          pageDetails={DETAILS}
        />
      </main>
      <TopHeader />
    </>
  );
}
