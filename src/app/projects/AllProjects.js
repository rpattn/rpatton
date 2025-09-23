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
  "rounded-xl border border-slate-200 bg-white/80 p-6 text-slate-900 shadow-sm backdrop-blur transition-colors dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 sm:p-8";

const getTypeLabel = (type) => {
  if (!type) {
    return "Project";
  }
  return typeLabels[type] ?? type.charAt(0).toUpperCase() + type.slice(1);
};

const getBulletItems = (bullets) => {
  if (!bullets) {
    return [];
  }
  return [bullets.text1, bullets.text2, bullets.text3].filter(Boolean);
};

const getExternalLink = (bullets) => {
  const ext = bullets?.extLink?.trim();
  return ext && ext.length > 0 ? ext : null;
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
    const metrics = entryMap[project.id];

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
      bestId = project.id;
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

  return projects[0]?.id ?? null;
};

const ProjectDetails = ({ project, className = "" }) => {
  if (!project) {
    return null;
  }

  const bulletItems = getBulletItems(project.bullets);
  const externalLink = getExternalLink(project.bullets);
  const typeLabel = getTypeLabel(project.type);

  return (
    <div className={`${detailsCardClass} ${className}`.trim()}>
      {typeLabel ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {typeLabel}
        </p>
      ) : null}

      <h2 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 dark:text-slate-100">
        {project.name}
      </h2>

      {project.desc ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {project.desc}
        </p>
      ) : null}

      {project.desc2 ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-300">
          {project.desc2}
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

      {externalLink ? (
        <Link
          href={externalLink}
          target={externalLink.startsWith("http") ? "_blank" : undefined}
          rel={externalLink.startsWith("http") ? "noopener noreferrer" : undefined}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          View project
          <RxExternalLink className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
};

const ProjectImageSection = ({ project, onVisible, isActive, isFirst }) => {
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

    onVisible(project.id, metrics);
  }, [entry, onVisible, project.id]);

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
        key={`${project.id}-${displayIndex}`}
        className={figureClassName}
        style={getAspectStyle(image, Boolean(aspectClass))}
      >
        <Image
          src={image.src}
          alt={`${project.name} preview ${displayIndex}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="h-full w-full object-cover"
          priority={priority}
        />
      </figure>
    );
  };

  return (
    <section ref={ref} id={`project-${project.id}`} className="scroll-mt-24">
      <div className="mb-6 lg:hidden">
        <ProjectDetails project={project} />
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

const ProjectsGallery = () => {
  const introProject = useMemo(
    () => projectsData.projects.find((project) => project.type === "splash"),
    []
  );

  const projects = useMemo(
    () =>
      projectsData.projects.filter(
        (project) => project.images && project.images.length > 0
      ),
    []
  );

  const [activeProjectId, setActiveProjectId] = useState(projects[0]?.id ?? null);
  const activeProjectIdRef = useRef(activeProjectId);

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
    (projectId, metrics) => {
      if (!metrics) {
        return;
      }

      entryStateRef.current = {
        ...entryStateRef.current,
        [projectId]: metrics,
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
    () => projects.find((project) => project.id === activeProjectId) ?? projects[0] ?? null,
    [projects, activeProjectId]
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pb-24 pt-12 sm:px-8 lg:px-12">
      <header className="mb-12 space-y-4 text-center lg:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-indigo-600 dark:text-indigo-400">
          Projects
        </p>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl">
          Work & Experiments
        </h1>
        {introProject?.desc ? (
          <p className="text-base text-slate-600 dark:text-slate-300">
            {introProject.desc}
          </p>
        ) : (
          <p className="text-base text-slate-600 dark:text-slate-300">
            Scroll through the gallery to explore research, professional, and passion projects.
          </p>
        )}
        {introProject?.desc2 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {introProject.desc2}
          </p>
        ) : null}
      </header>

      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-16">
        <div className="flex flex-col gap-16">
          {projects.map((project, index) => (
            <ProjectImageSection
              key={project.id}
              project={project}
              onVisible={handleProjectVisible}
              isActive={project.id === activeProject?.id}
              isFirst={index === 0}
            />
          ))}
        </div>

        <div className="hidden lg:block">
          <ProjectDetails project={activeProject} className="sticky top-24" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsGallery;
