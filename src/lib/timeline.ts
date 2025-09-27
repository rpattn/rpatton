import cvData from "../app/cv/cv-data.json";
import projectsData from "../app/projects/projects.json";

export type TimelineEntryType = "milestone" | "experience" | "project";

export type TimelineEra = "current" | "recent" | "formative" | "roots";

export interface TimelineLink {
  href: string;
  label: string;
}

export interface TimelineImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  endDate?: string | null;
  category?: string;
  location?: string;
  tags: string[];
  link: TimelineLink;
  image?: TimelineImage;
  variant?: "default" | "minimal";
  era: TimelineEra;
}

export interface TimelineGraphRow {
  entry: TimelineEntry;
  branchKey: string;
  branchLabel: string;
  branchColor: string;
  columnIndex: number;
  columnsBefore: string[];
  columnsCurrent: string[];
  columnsAfter: string[];
  isNewBranch: boolean;
  endedBranches: string[];
  spawnFromIndex?: number | null;
  mergeFromIndices: number[];
}

interface ExperienceEntry {
  company: string;
  role: string;
  location?: string;
  period?: string;
  bullets?: string[];
  startDate?: string;
  endDate?: string | null;
}

interface ProjectEntry {
  slug: string;
  title?: string;
  summary?: string;
  details?: string;
  category?: string;
  links?: {
    live?: string | null;
    repos?: { name?: string; url: string }[];
    docs?: string | { label?: string; href: string }[] | null;
  };
  images?: { src: string; w?: number; h?: number }[];
  timeline?: {
    startDate?: string;
    endDate?: string | null;
  };
}

const UNKNOWN_DESCRIPTION = "Details coming soon.";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const toIsoDate = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
};

const computeEra = (isoDate: string | null): TimelineEra => {
  if (!isoDate) {
    return "recent";
  }

  const year = new Date(isoDate).getFullYear();
  const currentYear = new Date().getFullYear();

  if (year >= currentYear - 1) {
    return "current";
  }

  if (year >= currentYear - 5) {
    return "recent";
  }

  if (year >= currentYear - 10) {
    return "formative";
  }

  return "roots";
};

const selectPrimaryLink = (project: ProjectEntry): TimelineLink => {
  if (project.links?.live) {
    return { href: project.links.live, label: "View project" };
  }

  const repo = project.links?.repos?.[0];
  if (repo?.url) {
    return { href: repo.url, label: repo.name ?? "View repository" };
  }

  if (Array.isArray(project.links?.docs)) {
    const doc = project.links?.docs?.[0];
    if (doc && typeof doc === "object") {
      return { href: doc.href, label: doc.label ?? "Documentation" };
    }
  } else if (project.links?.docs && typeof project.links.docs === "string") {
    return { href: project.links.docs, label: "Documentation" };
  }

  return {
    href: `https://www.google.com/search?q=${encodeURIComponent(project.title ?? project.slug)}`,
    label: "Search project",
  };
};

const experienceLinkDirectory: Record<string, TimelineLink> = {
  ramboll: { href: "https://ramboll.com/", label: "Visit ramboll.com" },
  cummins: { href: "https://www.cummins.com/", label: "Visit cummins.com" },
};

const selectExperienceLink = (company: string): TimelineLink => {
  const key = slugify(company);
  return (
    experienceLinkDirectory[key] ?? {
      href: `https://www.google.com/search?q=${encodeURIComponent(company)}`,
      label: `Search ${company}`,
    }
  );
};

const palette = [
  { bg: "#0f172a", fg: "#e2e8f0" },
  { bg: "#1e293b", fg: "#f8fafc" },
  { bg: "#312e81", fg: "#ede9fe" },
  { bg: "#0f766e", fg: "#ecfeff" },
  { bg: "#3f6212", fg: "#f7fee7" },
  { bg: "#7c2d12", fg: "#ffedd5" },
];

const branchColors: Record<string, string> = {
  "project-tech": "#4f46e5",
  "project-research": "#0ea5e9",
  "project-uol": "#22c55e",
  "project": "#f97316",
  experience: "#16a34a",
  milestone: "#6366f1",
};

export const resolveBranchColor = (key: string) => {
  if (branchColors[key]) {
    return branchColors[key];
  }

  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = ["#f97316", "#14b8a6", "#ec4899", "#8b5cf6", "#60a5fa", "#facc15"];
  return colors[hash % colors.length];
};

const formatBranchLabel = (entry: TimelineEntry, branchKey: string) => {
  if (entry.type === "project") {
    if (entry.category === "tech") {
      return "Tech";
    }
    if (entry.category === "research") {
      return "Research";
    }
    if (entry.category === "uol") {
      return "University";
    }
    return "Projects";
  }

  if (entry.type === "experience") {
    return "Experience";
  }

  return "Milestones";
};

const buildMonogramImage = (label: string): TimelineImage => {
  const slug = slugify(label);
  const paletteIndex = slug
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % palette.length;
  const { bg, fg } = palette[paletteIndex];
  const initials = label
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 3);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='160' viewBox='0 0 240 160'>
    <rect width='240' height='160' rx='24' fill='${bg}' />
    <text x='50%' y='56%' fill='${fg}' font-family='Inter, Arial, sans-serif' font-weight='700' font-size='72' dominant-baseline='middle' text-anchor='middle'>${initials}</text>
  </svg>`;
  const encoded = Buffer.from(svg).toString("base64");
  return {
    src: `data:image/svg+xml;base64,${encoded}`,
    alt: `${label} monogram`,
    width: 240,
    height: 160,
  };
};

const buildProjectImage = (project: ProjectEntry): TimelineImage | undefined => {
  const image = project.images?.find((item) => Boolean(item?.src));
  if (!image) {
    return undefined;
  }

  return {
    src: image.src,
    alt: project.title ?? project.slug,
    width: image.w ?? 1200,
    height: image.h ?? 800,
  };
};

const buildExperienceEntries = (items: ExperienceEntry[]): TimelineEntry[] => {
  return items
    .filter((item) => Boolean(item.startDate))
    .map((item) => {
      const title = item.role ?? item.company;
      const subtitle = item.company !== item.role ? item.company : undefined;
      const description = item.bullets?.[0] ?? UNKNOWN_DESCRIPTION;
      const startIso = toIsoDate(item.startDate);
      const endIso = toIsoDate(item.endDate ?? undefined);
      const company = item.company ?? title;

      return {
        id: `experience-${slugify(`${item.company}-${item.role}`)}`,
        type: "experience" as const,
        title,
        subtitle,
        description,
        startDate: startIso ?? new Date().toISOString(),
        endDate: endIso,
        category: "experience",
        location: item.location,
        tags: ["Experience"],
        link: selectExperienceLink(company),
        image: undefined,
        era: computeEra(startIso),
      } satisfies TimelineEntry;
    });
};

const buildProjectEntries = (items: ProjectEntry[]): TimelineEntry[] => {
  return items
    .filter((item) => Boolean(item.timeline?.startDate))
    .map((item) => {
      const startIso = toIsoDate(item.timeline?.startDate) ?? new Date().toISOString();
      const endIso = toIsoDate(item.timeline?.endDate ?? undefined);
      const description = item.summary ?? item.details ?? UNKNOWN_DESCRIPTION;

      return {
        id: `project-${item.slug}`,
        type: "project" as const,
        title: item.title ?? item.slug,
        subtitle: item.category,
        description,
        startDate: startIso,
        endDate: endIso,
        category: item.category,
        tags: ["Project", ...(item.category ? [item.category] : [])],
        link: selectPrimaryLink(item),
        image: buildProjectImage(item),
        variant: startIso ? (new Date(startIso).getFullYear() <= 2014 ? "minimal" : "default") : "default",
        era: computeEra(startIso),
      } satisfies TimelineEntry;
    });
};

const buildNowEntry = (entries: TimelineEntry[]): TimelineEntry => {
  const nowIso = new Date().toISOString();
  const currentRole = entries.find(
    (entry) => entry.type === "experience" && entry.endDate === null
  );

  const recentProjects = entries
    .filter((entry) => entry.type === "project")
    .sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )
    .slice(0, 2)
    .map((entry) => entry.title);

  const descriptionSegments: string[] = [];

  if (currentRole) {
    descriptionSegments.push(
      `${currentRole.title}${currentRole.subtitle ? ` at ${currentRole.subtitle}` : ""}`
    );
  }

  if (recentProjects.length > 0) {
    descriptionSegments.push(`Building ${recentProjects.join(" | ")}`);
  }

  const description =
    descriptionSegments.length > 0
      ? descriptionSegments.join(" - ")
      : "Exploring new engineering and product challenges.";

  return {
    id: "milestone-now",
    type: "milestone",
    title: "Now",
    description,
    startDate: nowIso,
    endDate: null,
    category: "milestone",
    tags: ["Present"],
    link: {
      href: "mailto:rn.patton@outlook.com",
      label: "Say hello",
    },
    image: undefined,
    era: "current",
  } satisfies TimelineEntry;
};

const branchKeyForEntry = (entry: TimelineEntry) => {
  if (entry.type === "project") {
    return `project-${entry.category ?? "project"}`;
  }

  if (entry.type === "experience") {
    return "experience";
  }

  return "milestone";
};

const buildGraphRows = (entries: TimelineEntry[]): TimelineGraphRow[] => {
  const chronological = [...entries].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );

  const firstProjectIndex = chronological.findIndex((entry) => entry.type === "project");
  if (firstProjectIndex > 0) {
    const [rootProject] = chronological.splice(firstProjectIndex, 1);
    chronological.unshift(rootProject);
  }

  const branchLastIndex = new Map<string, number>();
  const branchKeys = chronological.map((entry, index) => {
    const key = branchKeyForEntry(entry);
    branchLastIndex.set(key, index);
    return key;
  });

  const activeBranches: string[] = [];
  const rows: TimelineGraphRow[] = [];

  chronological.forEach((entry, index) => {
    const branchKey = branchKeys[index];
    const branchLabel = formatBranchLabel(entry, branchKey);
    const branchColor = resolveBranchColor(branchKey);

    const columnsBefore = activeBranches.slice();

    let columnIndex = activeBranches.indexOf(branchKey);
    const isNewBranch = columnIndex === -1;
    let spawnFromIndex: number | null | undefined = null;

    if (isNewBranch) {
      if (columnsBefore.length > 0) {
        spawnFromIndex = 0;
      }
      activeBranches.push(branchKey);
      columnIndex = activeBranches.length - 1;
    }

    const columnsCurrent = activeBranches.slice();

    const mergeFromIndices: number[] = [];
    if (entry.type === "experience" && columnsBefore.length > 0) {
      mergeFromIndices.push(
        ...columnsBefore
          .map((key, idx) => (key !== branchKey ? idx : -1))
          .filter((idx) => idx >= 0)
      );
    }

    const endedBranches: string[] = [];
    const columnsAfter = [...columnsCurrent];

    const lastIndex = branchLastIndex.get(branchKey) ?? index;
    if (lastIndex === index) {
      endedBranches.push(branchKey);
      const removalIndex = columnsAfter.indexOf(branchKey);
      if (removalIndex >= 0) {
        columnsAfter.splice(removalIndex, 1);
      }
      const activeRemovalIndex = activeBranches.indexOf(branchKey);
      if (activeRemovalIndex >= 0) {
        activeBranches.splice(activeRemovalIndex, 1);
      }
    }

    const row: TimelineGraphRow = {
      entry,
      branchKey,
      branchLabel,
      branchColor,
      columnIndex,
      columnsBefore,
      columnsCurrent,
      columnsAfter,
      isNewBranch,
      endedBranches,
      spawnFromIndex,
      mergeFromIndices,
    };

    rows.push(row);
  });

  return rows;
};

export const buildTimeline = (): TimelineGraphRow[] => {
  const experienceEntries = buildExperienceEntries(cvData.experience ?? []);
  const projectEntries = buildProjectEntries(projectsData.projects ?? []);

  const combined = [...projectEntries, ...experienceEntries];
  const nowEntry = buildNowEntry(combined);
  combined.push(nowEntry);

  return buildGraphRows(combined);
};

export default buildTimeline;
