export interface ProjectImage {
  src: string;
  w?: number;
  h?: number;
}

export interface ProjectLink {
  name?: string;
  url: string;
}

export interface ProjectAsset {
  type: string;
  label: string;
  href: string;
}

export interface ProjectTimeline {
  startDate: string;
  endDate?: string;
}

export interface Project {
  slug: string;
  title?: string;
  title_var?: string;
  summary?: string;
  summary_var?: string;
  details?: string;
  details_var?: string;
  category: string;
  animation?: string;
  links: {
    live: string | null;
    repos: ProjectLink[];
    docs: string | null;
    assets: ProjectAsset[];
  };
  bullets?: string[];
  images: ProjectImage[];
  timeline?: ProjectTimeline; // Make timeline optional
}

export interface ProjectsData {
  projects: Project[];
}
