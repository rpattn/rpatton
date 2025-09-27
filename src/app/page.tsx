import Image from "next/image";
import Link from "next/link";

import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import buildTimeline, { TimelineGraphRow, resolveBranchColor } from "../lib/timeline";
import TimelineSidebar, { TimelineSidebarItem } from "./components/timeline/TimelineSidebar";
import TerminalHero from "./components/terminal/TerminalHero";
import projectsData from "./projects/projects.json";

import styles from "./page.module.css";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

const formatDate = (isoDate?: string | null) => {
  if (!isoDate) {
    return null;
  }

  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return dateFormatter.format(date);
};

const formatDateRange = (entry: TimelineGraphRow["entry"]) => {
  if (entry.type === "milestone") {
    return "Now";
  }

  const start = formatDate(entry.startDate);
  const end = entry.endDate ? formatDate(entry.endDate) : "Present";

  if (!start) {
    return end ?? "";
  }

  if (!end || start === end) {
    return start;
  }

  return `${start} → ${end}`;
};

const formatTypeLabel = (entry: TimelineGraphRow["entry"], branchLabel: string) => {
  if (entry.type === "project") {
    return `${branchLabel} Project`;
  }

  if (entry.type === "experience") {
    return "Experience";
  }

  return "Milestone";
};

type RenderRow = {
  entry: TimelineGraphRow["entry"];
  branchKey: string;
  branchLabel: string;
  branchColor: string;
  columnIndex: number;
  topColumns: (string | null)[];
  bottomColumns: (string | null)[];
  mergeFromIndices: number[];
};

const buildRenderRows = (rows: TimelineGraphRow[]): RenderRow[] => {
  const descending = [...rows].reverse();
  const occurrences = new Map<string, number>();
  descending.forEach((row) => {
    occurrences.set(row.branchKey, (occurrences.get(row.branchKey) ?? 0) + 1);
  });

  const columns: (string | null)[] = [];
  const branchColumnIndex = new Map<string, number>();
  const renderRows: RenderRow[] = [];

  descending.forEach((row) => {
    const topColumns = columns.slice();

    let columnIndex = branchColumnIndex.get(row.branchKey);
    if (columnIndex === undefined) {
      const reuseIndex = columns.findIndex((key) => key === null);
      if (reuseIndex >= 0) {
        columnIndex = reuseIndex;
        columns[reuseIndex] = row.branchKey;
      } else {
        columns.push(row.branchKey);
        columnIndex = columns.length - 1;
      }
      branchColumnIndex.set(row.branchKey, columnIndex);
    }

    const remaining = (occurrences.get(row.branchKey) ?? 0) - 1;
    occurrences.set(row.branchKey, remaining);

    if (remaining <= 0) {
      branchColumnIndex.delete(row.branchKey);
      columns[columnIndex] = null;
    }

    const bottomColumns = columns.slice();

    // Map merge indices from timeline column indices to render column indices
    const mappedMergeFromIndices: number[] = [];
    row.mergeFromIndices.forEach((originalIndex) => {
      // Find the branch key at this original index in row.columnsBefore
      const branchKey = row.columnsBefore[originalIndex];
      if (branchKey) {
        // Find this branch's render column index
        const renderColumnIndex = topColumns.indexOf(branchKey);
        if (renderColumnIndex >= 0) {
          mappedMergeFromIndices.push(renderColumnIndex);
        }
      }
    });

    renderRows.push({
      entry: row.entry,
      branchKey: row.branchKey,
      branchLabel: row.branchLabel,
      branchColor: row.branchColor,
      columnIndex,
      topColumns,
      bottomColumns,
      mergeFromIndices: mappedMergeFromIndices,
    });
  });

  return renderRows;
};

const columnWidth = 36;
const viewBoxHeight = 100;

const columnX = (index: number) => index * columnWidth + columnWidth / 2;

const renderGraph = (row: RenderRow) => {
  const maxColumns = Math.max(
    row.topColumns.length,
    row.bottomColumns.length,
    row.columnIndex + 1
  );
  const width = Math.max(1, maxColumns) * columnWidth;
  const halfHeight = viewBoxHeight / 2;

  const segments: JSX.Element[] = [];

  const drawVertical = (
    columnIndex: number,
    y1: number,
    y2: number,
    color: string
  ) => {
    segments.push(
      <line
        key={`v-${columnIndex}-${y1}-${y2}`}
        x1={columnX(columnIndex)}
        y1={y1}
        x2={columnX(columnIndex)}
        y2={y2}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    );
  };

  const drawMergeLine = (
    fromColumnIndex: number,
    toColumnIndex: number,
    color: string
  ) => {
    const fromX = columnX(fromColumnIndex);
    const toX = columnX(toColumnIndex);
    const startY = halfHeight;
    const endY = halfHeight;
    
    // Create a git-style curved merge using cubic bezier
    // The curve should arc gracefully from source to target
    const distance = Math.abs(toX - fromX);
    const direction = toX > fromX ? 1 : -1;
    
    // Control points create a smooth S-curve or gentle arc
    const control1X = fromX + direction * distance * 0.4;
    const control1Y = startY - distance * 0.15; // Slight upward curve
    const control2X = toX - direction * distance * 0.4;
    const control2Y = endY - distance * 0.15;
    
    const pathData = `M ${fromX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${toX} ${endY}`;
    
    segments.push(
      <path
        key={`merge-${fromColumnIndex}-${toColumnIndex}`}
        d={pathData}
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
        opacity={0.8}
      />
    );
  };

  for (let index = 0; index < maxColumns; index += 1) {
    const topKey = row.topColumns[index] ?? null;
    const bottomKey = row.bottomColumns[index] ?? null;

    if (topKey && bottomKey) {
      const colorKey = topKey === bottomKey ? topKey : bottomKey;
      drawVertical(index, 0, viewBoxHeight, resolveBranchColor(colorKey));
    } else if (topKey) {
      drawVertical(index, 0, halfHeight, resolveBranchColor(topKey));
    } else if (bottomKey) {
      drawVertical(index, halfHeight, viewBoxHeight, resolveBranchColor(bottomKey));
    }
  }

  // Draw merge lines from merging branches to the current branch
  row.mergeFromIndices.forEach((fromColumnIndex) => {
    const fromBranchKey = row.topColumns[fromColumnIndex];
    if (fromBranchKey) {
      drawMergeLine(fromColumnIndex, row.columnIndex, resolveBranchColor(fromBranchKey));
    }
  });

  const nodeLeft = columnX(row.columnIndex) - 8;

  return (
    <div className={styles.graphCanvas} style={{ width: `${width}px` }}>
      <svg
        className={styles.graphSvg}
        style={{ width: `${width}px`, height: "100%" }}
        viewBox={`0 0 ${width} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        role="presentation"
        aria-hidden="true"
      >
        {segments}
      </svg>
      <span
        className={styles.graphNodeMarker}
        style={{ left: `${nodeLeft}px`, backgroundColor: row.branchColor }}
        aria-hidden="true"
      />
    </div>
  );
};

const FeaturedProjects = () => {
  // Get the first three projects that have images
  const featuredProjects = projectsData.projects
    .filter(project => project.images && project.images.length > 0)
    .slice(0, 3);

  const getTypeLabel = (category: string) => {
    const typeLabels: { [key: string]: string } = {
      tech: "Technical Project",
      research: "Research Project", 
      uol: "University Project",
      other: "Other Project"
    };
    return typeLabels[category] || "Project";
  };

  const buildLinkTarget = (href: string) => {
    if (href.startsWith("http")) {
      return {
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }
    return {};
  };

  return (
    <section className={`${styles.featuredSection} max-w-[var(--content-max-width)] mx-auto`} aria-labelledby="featured-projects-heading">
      <div className={styles.featuredHeader}>
        <p className={styles.timelineEyebrow}>Selected work</p>
        <h2 id="featured-projects-heading" className={styles.timelineTitle}>
          Featured Projects
        </h2>
        <p className={styles.timelineSubtitle}>
          A showcase of recent technical projects spanning full-stack development, machine learning, and engineering automation.
        </p>
      </div>

      <div className={styles.featuredGrid}>
        {featuredProjects.map((project) => (
          <article key={project.slug} className={styles.featuredCard}>
            <div className={styles.featuredCardImage}>
              <Image
                src={project.images[0].src}
                alt={`${project.title} preview`}
                width={(project.images[0] as any).w || 400}
                height={(project.images[0] as any).h || 300}
                className={styles.featuredCardImg}
                loading="lazy"
              />
            </div>
            <div className={styles.featuredCardContent}>
              <span className={styles.featuredCardEyebrow}>
                {getTypeLabel(project.category)}
              </span>
              <h3 className={styles.featuredCardTitle}>
                {project.title}
              </h3>
              <p className={styles.featuredCardDescription}>
                {project.summary}
              </p>
              <div className={styles.featuredCardFooter}>
                {project.links?.live && (
                  <Link 
                    href={project.links.live} 
                    className={styles.featuredCardLink}
                    {...buildLinkTarget(project.links.live)}
                  >
                    View Project
                  </Link>
                )}
                <Link 
                  href="/projects" 
                  className={styles.featuredCardLinkSecondary}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className={styles.featuredFooter}>
        <Link href="/projects" className={styles.featuredViewAll}>
          View All Projects
        </Link>
      </div>
    </section>
  );
};

const TimelineList = ({ renderRows }: { renderRows: RenderRow[] }) => {
  const sidebarItems: TimelineSidebarItem[] = renderRows.map((row) => ({
    id: row.entry.id,
    title: row.entry.title,
    meta: formatDateRange(row.entry),
    accentColor: row.branchColor,
    group: row.branchLabel,
  }));

  return (
    <section className={`${styles.timelineSection} max-w-[var(--content-max-width)] mx-auto`} aria-labelledby="timeline-heading">
      <div className={styles.timelineHeader}>
        <p className={styles.timelineEyebrow}>Git-style timeline</p>
        <h2 id="timeline-heading" className={styles.timelineTitle}>
          Engineering and product history
        </h2>
        <p className={styles.timelineSubtitle}>
          Follow the branches from the earliest build to the present. Each path captures a
          different stream of work, converging when roles pull them together.
        </p>
      </div>

      <div className={styles.timelineLayout}>
        <ol className={styles.timeline}>
          {renderRows.map((row) => {
            const { entry } = row;
            const dateRange = formatDateRange(entry);
            const typeLabel = formatTypeLabel(entry, row.branchLabel);

            const linkTarget = entry.link.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {};

            const minimalImage =
              entry.variant === "minimal" && entry.image ? (
                <div className={styles.minimalImageWrapper}>
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    width={entry.image.width}
                    height={entry.image.height}
                    className={styles.minimalImage}
                    loading="lazy"
                    unoptimized={entry.image.src.startsWith("data:")}
                  />
                </div>
              ) : null;

            const card = entry.variant === "minimal" ? (
              <div className={styles.minimalContent}>
                {minimalImage}
                <span className={styles.minimalEyebrow}>{dateRange}</span>
                <p className={styles.minimalTitle}>{entry.title}</p>
                {entry.description ? (
                  <p className={styles.minimalDescription}>{entry.description}</p>
                ) : null}
                <Link className={styles.minimalLink} href={entry.link.href} {...linkTarget}>
                  {entry.link.label}
                </Link>
              </div>
            ) : (
              <article
                className={styles.card}
                tabIndex={0}
                aria-label={`${typeLabel}: ${entry.title}`}
              >
                <div className={styles.cardBody}>
                  <header className={styles.cardHeader}>
                    <span className={styles.cardEyebrow}>{typeLabel}</span>
                    <div className={styles.cardHeadingGroup}>
                      <h3 className={styles.cardTitle}>{entry.title}</h3>
                      {entry.subtitle ? (
                        <p className={styles.cardSubtitle}>{entry.subtitle}</p>
                      ) : null}
                    </div>
                  </header>

                  <p className={styles.cardDescription}>{entry.description}</p>

                  <footer className={styles.cardFooter}>
                    <time className={styles.cardTime} dateTime={entry.startDate}>
                      {dateRange}
                    </time>
                    {entry.location ? (
                      <span className={styles.cardLocation}>{entry.location}</span>
                    ) : null}
                    <Link className={styles.cardLink} href={entry.link.href} {...linkTarget}>
                      {entry.link.label}
                    </Link>
                  </footer>
                </div>
                {entry.image ? (
                  <div className={styles.cardAside}>
                    <Image
                      src={entry.image.src}
                      alt={entry.image.alt}
                      width={entry.image.width}
                      height={entry.image.height}
                      className={styles.cardAsideImage}
                      loading="lazy"
                      unoptimized={entry.image.src.startsWith("data:")}
                    />
                  </div>
                ) : null}
              </article>
            );

            return (
              <li key={entry.id} id={entry.id} className={styles.timelineRow}>
                <div className={styles.graphCell}>{renderGraph(row)}</div>
                <div className={styles.cardWrapper}>{card}</div>
              </li>
            );
          })}
        </ol>
        <div className={styles.timelineSidebarWrapper}>
          <TimelineSidebar items={sidebarItems} />
        </div>
      </div>
    </section>
  );
};


const Page = () => {
  const rows = buildTimeline();
  const renderRows = buildRenderRows(rows);
  return (
    <>
      <Header />
      <main className={`${styles.page} pt-8`}>
        <section className={`${styles.hero} max-w-[var(--content-max-width)] mx-auto sm:px-0 lg:px-[var(--content-padding-x-lg)] xl:px-[var(--content-padding-x-xl)]`}
          aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitleSr}>
            Rob Patton - systems engineer building automation-first tooling
          </h1>
          <TerminalHero />
        </section>

        <FeaturedProjects />

        <TimelineList renderRows={renderRows} />
      </main>
      <TopHeader />
    </>
  );
};

export default Page;


