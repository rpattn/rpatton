"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxExternalLink } from "react-icons/rx";
import { useInView } from "react-intersection-observer";

import projectsData from "./projects.json";

const typeLabels = {
  tech: "Technical Project",
  research: "Research Project",
  uol: "University Project",
  splash: "",
};

const observerThresholds = [0, 0.25, 0.5, 0.75, 1];
const observerRootMargin = "-35% 0px -35% 0px";

const detailsCardClass =
  "rounded-xl border border-slate-200 bg-white/80 p-6 text-slate-900 shadow-sm backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 sm:p-8 max-h-[70vh] overflow-y-auto hide-scrollbar lg:max-h-[70vh]";

const linkButtonClass =
  "inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition duration-200 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-indigo-400";

const linkButtonPrimaryClass =
  "inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400";

const DEFAULT_SUMMARY =
  "Scroll through the gallery to explore my academic and personal projects.";

const DEFAULT_DETAILS =
  "Each gallery entry includes architecture notes, supporting resources, and a curated set of visuals.";

const getTypeLabel = (type) => {
  if (!type) {
    return "Project";
  }
  return typeLabels[type] ?? type.charAt(0).toUpperCase() + type.slice(1);
};

const buildLinkTarget = (href) => {
  if (!href) {
    return {};
  }

  if (typeof href === "string" && href.startsWith("http")) {
    return {
      target: "_blank",
      rel: "noopener noreferrer",
    };
  }

  return {};
};

const hasLinks = (links) => {
  if (!links) {
    return false;
  }

  if (links.live) {
    return true;
  }

  if (Array.isArray(links.repos) && links.repos.length > 0) {
    return true;
  }

  if (Array.isArray(links.assets) && links.assets.length > 0) {
    return true;
  }

  if (links.docs) {
    return true;
  }

  return false;
};

const renderProjectLinks = (project) => {
  const links = project?.links;

  if (!hasLinks(links)) {
    return null;
  }

  const liveLink = links?.live ?? project?.url ?? project?.website;
  const repoLinks = Array.isArray(links?.repos) ? links.repos : [];
  const assetLinks = Array.isArray(links?.assets) ? links.assets : [];
  const docsLinks = Array.isArray(links?.docs)
    ? links.docs
    : links?.docs
    ? [{ label: "Documentation", href: links.docs }]
    : [];

  return (
    <div className="mt-8 space-y-4">
      {liveLink ? (
        <Link
          href={liveLink}
          {...buildLinkTarget(liveLink)}
          className={linkButtonPrimaryClass}
        >
          Live project
          <RxExternalLink className="h-4 w-4" />
        </Link>
      ) : null}

      {repoLinks.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Repositories
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {repoLinks.map(({ name, url }, index) => (
              <Link
                key={`${project.slug}-repo-${index}`}
                href={url}
                {...buildLinkTarget(url)}
                className={linkButtonClass}
              >
                {name ?? "Repository"}
                <RxExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {docsLinks.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Docs
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {docsLinks.map((item, index) => (
              <Link
                key={`${project.slug}-doc-${index}`}
                href={typeof item === "string" ? item : item.href}
                {...buildLinkTarget(typeof item === "string" ? item : item.href)}
                className={linkButtonClass}
              >
                {typeof item === "string" ? "Documentation" : item.label ?? "Documentation"}
                <RxExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {assetLinks.length > 0 ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Resources
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {assetLinks.map((asset, index) => (
              <Link
                key={`${project.slug}-asset-${index}`}
                href={asset.href}
                {...buildLinkTarget(asset.href)}
                className={linkButtonClass}
              >
                {asset.label ?? asset.type ?? "Download"}
                <RxExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProjectNavigator = ({ projects, activeProjectSlug }) => {
  const handleNavigate = useCallback((slug) => {
    if (typeof window === "undefined") {
      return;
    }

    const target = document.getElementById(`project-${slug}`);
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#project-${slug}`);
  }, []);

  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/70">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
        Jump to project
      </p>
      <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1 hide-scrollbar">
        {projects.map((project) => {
          const isActive = project.slug === activeProjectSlug;
          const label = project.title ?? project.name ?? project.slug;
          const pillClass = isActive
            ? "bg-indigo-600 text-white border-indigo-600"
            : "border-slate-300 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-300";

          return (
            <button
              key={project.slug}
              type="button"
              onClick={() => handleNavigate(project.slug)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${pillClass}`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const selectActiveProject = (
  projects,
  entryMap,
  viewportHeight,
  currentActiveId
) => {
  if (!projects.length) {
    return null;
  }

  const hasViewport = typeof viewportHeight === "number" && viewportHeight > 0;
  const viewportCenter = hasViewport ? viewportHeight / 2 : 0;

  let bestId = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  let bestCoverage = -1;
  let bestUpdatedAt = -1;

  for (const project of projects) {
    const metrics = entryMap[project.slug];

    if (!metrics) {
      continue;
    }

    const {
      top,
      height,
      visibleHeight = 0,
      intersectionRatio = 0,
      isIntersecting,
      updatedAt = 0,
    } = metrics;

    if (!Number.isFinite(top) || !Number.isFinite(height) || height <= 0) {
      continue;
    }

    const hasVisibility = isIntersecting || visibleHeight > 0;

    if (!hasVisibility) {
      continue;
    }

    const sectionCenter = top + height / 2;
    const distance = hasViewport
      ? Math.abs(sectionCenter - viewportCenter)
      : Math.abs(sectionCenter);

    const coverage = Math.max(
      Math.min(visibleHeight / height, 1),
      intersectionRatio
    );

    const isCloser = distance < bestDistance - 4;
    const isComparable = Math.abs(distance - bestDistance) <= 4;
    const hasBetterCoverage = coverage > bestCoverage + 0.05;
    const isNewer = updatedAt > bestUpdatedAt + 4;

    if (
      isCloser ||
      (isComparable && (hasBetterCoverage || (Math.abs(coverage - bestCoverage) <= 0.05 && isNewer)))
    ) {
      bestId = project.slug;
      bestDistance = distance;
      bestCoverage = coverage;
      bestUpdatedAt = updatedAt;
    }
  }

  if (bestId) {
    return bestId;
  }

  if (currentActiveId) {
    return currentActiveId;
  }

  return projects[0]?.slug ?? null;
};

const ProjectDetails = ({ project, className = "", showTypeLabel = true }) => {
  if (!project) {
    return null;
  }

  const bulletItems = Array.isArray(project.bullets) ? project.bullets : [];
  const typeLabel = getTypeLabel(project.category ?? project.type);

  return (
    <div className={`${detailsCardClass} ${className}`.trim()}>
      {showTypeLabel && typeLabel ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {typeLabel}
        </p>
      ) : null}

      <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 dark:text-slate-100">
        {project.title}
      </h2>

      {project.summary ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {project.summary}
        </p>
      ) : null}

      {project.details ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
          {project.details}
        </p>
      ) : null}

      {bulletItems.length > 0 ? (
        <ul className="mt-6 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {bulletItems.map((item, index) => (
            <li key={index} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-indigo-400" />
              <span className="flex-1 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {renderProjectLinks(project)}
    </div>
  );
};

const ProjectImageSection = ({ project, onVisible, isActive, isFirst, showTypeLabel = true }) => {
  const { ref, entry } = useInView({
    threshold: observerThresholds,
    rootMargin: observerRootMargin,
    triggerOnce: false,
  });

  useEffect(() => {
    if (!entry) {
      return;
    }

    const metrics = {
      top: entry.boundingClientRect?.top ?? 0,
      height: entry.boundingClientRect?.height ?? 0,
      visibleHeight: Math.max(entry.intersectionRect?.height ?? 0, 0),
      intersectionRatio: entry.intersectionRatio ?? 0,
      isIntersecting: entry.isIntersecting,
      updatedAt:
        typeof performance !== "undefined" ? performance.now() : Date.now(),
    };

    onVisible(project.slug, metrics);
  }, [entry, onVisible, project.slug]);

  const images = project.images ?? [];
  const [primaryImage, ...remainingImages] = images;
  const secondaryGridImages = remainingImages.slice(0, 2);
  const trailingHeroImages = remainingImages.slice(2);

  const baseFigureClass =
    "relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 transform transition-transform duration-300 ease-out";
  const figureStateClass = isActive
    ? "scale-[1.02] shadow-lg shadow-indigo-500/15"
    : "scale-[0.97] opacity-90";

  const getAspectStyle = (image, hasFixedAspect) => {
    if (hasFixedAspect) {
      return undefined;
    }

    if (image?.w && image?.h) {
      return { aspectRatio: `${image.w} / ${image.h}` };
    }

    return { aspectRatio: "16 / 10" };
  };

  const renderFigure = (image, displayIndex, { aspectClass = "", priority = false } = {}) => {
    if (!image) {
      return null;
    }

    const figureClassName = `${baseFigureClass} ${figureStateClass} ${aspectClass}`.trim();

    return (
      <figure
        key={`${project.slug}-${displayIndex}`}
        className={figureClassName}
        style={getAspectStyle(image, Boolean(aspectClass))}
      >
        <Image
          src={image.src}
          alt={`${project.title} preview ${displayIndex}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="h-full w-full object-cover"
          priority={priority}
        />
      </figure>
    );
  };

  return (
    <section ref={ref} id={`project-${project.slug}`} className="scroll-mt-24">
      <div className="mb-6 lg:hidden">
        <ProjectDetails project={project} showTypeLabel={showTypeLabel} />
      </div>

      <div className="space-y-6">
        {renderFigure(primaryImage, 1, { priority: isFirst, aspectClass: "aspect-[16/9]" })}
        {secondaryGridImages.length > 0 ? (
          <div
            className={`grid gap-4 ${
              secondaryGridImages.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {secondaryGridImages.map((image, index) =>
              renderFigure(image, index + 2, { aspectClass: "aspect-[4/3]" })
            )}
          </div>
        ) : null}
        {trailingHeroImages.map((image, index) =>
          renderFigure(
            image,
            secondaryGridImages.length + index + 2,
            { aspectClass: "aspect-[16/9]" }
          )
        )}
      </div>
    </section>
  );
};

const formatCategoryTitle = (slug) => {
  if (!slug) {
    return "";
  }

  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
};

const ProjectsGallery = ({
  categorySlug,
  pageTitle,
  pageSummary,
  pageDetails,
} = {}) => {
  const normalizedCategory = categorySlug ?? null;

  const introProject = useMemo(
    () => projectsData.projects.find((project) => project.slug === "splash"),
    []
  );

  const allProjects = useMemo(
    () =>
      projectsData.projects.filter(
        (project) => Array.isArray(project.images) && project.images.length > 0
      ),
    []
  );

  const projects = useMemo(
    () =>
      allProjects.filter((project) => {
        if (!normalizedCategory) {
          return true;
        }
        return (project.category ?? project.type) === normalizedCategory;
      }),
    [allProjects, normalizedCategory]
  );

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.slug ?? null);
  const activeProjectIdRef = useRef(activeProjectId);

  useEffect(() => {
    if (!projects.length) {
      activeProjectIdRef.current = null;
      setActiveProjectId(null);
      return;
    }

    if (!projects.find((project) => project.slug === activeProjectIdRef.current)) {
      const nextId = projects[0].slug;
      activeProjectIdRef.current = nextId;
      setActiveProjectId(nextId);
    }
  }, [projects]);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  const viewportHeightRef = useRef(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const updateViewportHeight = () => {
      viewportHeightRef.current = window.innerHeight;
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  const entryStateRef = useRef({});

  const handleProjectVisible = useCallback(
    (projectSlug, metrics) => {
      if (!metrics) {
        return;
      }

      entryStateRef.current = {
        ...entryStateRef.current,
        [projectSlug]: metrics,
      };

      const nextActiveId = selectActiveProject(
        projects,
        entryStateRef.current,
        viewportHeightRef.current,
        activeProjectIdRef.current
      );

      if (nextActiveId && nextActiveId !== activeProjectIdRef.current) {
        activeProjectIdRef.current = nextActiveId;
        setActiveProjectId(nextActiveId);
      }
    },
    [projects]
  );

  const activeProject = useMemo(
    () => projects.find((project) => project.slug === activeProjectId) ?? projects[0] ?? null,
    [projects, activeProjectId]
  );

  const heading = pageTitle
    ? pageTitle
    : normalizedCategory
    ? `${formatCategoryTitle(normalizedCategory)} Projects`
    : "All Projects";

  const summary = pageSummary
    ? pageSummary
    : normalizedCategory
    ? DEFAULT_SUMMARY
    : introProject?.summary ?? DEFAULT_SUMMARY;

  const details = pageDetails
    ? pageDetails
    : normalizedCategory
    ? DEFAULT_DETAILS
    : introProject?.details ?? null;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-12 sm:px-8 lg:px-12">
      <header className="mb-12 space-y-4 text-center lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400">
          Projects
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
          {heading}
        </h1>
        {summary ? (
          <p className="text-base text-slate-600 dark:text-slate-300">{summary}</p>
        ) : null}
        {details ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">{details}</p>
        ) : null}
      </header>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-300">
          No projects available in this category yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
          <div className="flex flex-col gap-16">
            {projects.map((project, index) => (
              <ProjectImageSection
                key={project.slug}
                project={project}
                onVisible={handleProjectVisible}
                isActive={project.slug === activeProject?.slug}
                isFirst={index === 0}
                showTypeLabel={!normalizedCategory}
              />
            ))}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <ProjectDetails project={activeProject} showTypeLabel={!normalizedCategory} />
              <ProjectNavigator projects={projects} activeProjectSlug={activeProject?.slug} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsGallery;

