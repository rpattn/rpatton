import Image from "next/image";
import Link from "next/link";

import Header from "./components/navbar/Header";
import TopHeader from "./components/navbar/TopHeader";
import buildTimeline, { TimelineGraphRow, resolveBranchColor } from "../lib/timeline";
import TimelineSidebar, { TimelineSidebarItem } from "./components/timeline/TimelineSidebar";
import TerminalHero from "./components/terminal/TerminalHero";

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

    renderRows.push({
      entry: row.entry,
      branchKey: row.branchKey,
      branchLabel: row.branchLabel,
      branchColor: row.branchColor,
      columnIndex,
      topColumns,
      bottomColumns,
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

const TimelineList = ({ renderRows }: { renderRows: RenderRow[] }) => {
  const sidebarItems: TimelineSidebarItem[] = renderRows.map((row) => ({
    id: row.entry.id,
    title: row.entry.title,
    meta: formatDateRange(row.entry),
    accentColor: row.branchColor,
    group: row.branchLabel,
  }));

  return (
    <section className={styles.timelineSection} aria-labelledby="timeline-heading">
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
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <h1 id="hero-title" className={styles.heroTitleSr}>
            Rob Patton - systems engineer building automation-first tooling
          </h1>
          <TerminalHero />
        </section>

        <TimelineList renderRows={renderRows} />
      </main>
      <TopHeader />
    </>
  );
};

export default Page;


