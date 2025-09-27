"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import styles from "./TimelineSidebar.module.css";

export interface TimelineSidebarItem {
  id: string;
  title: string;
  meta: string;
  accentColor: string;
  group: string;
}

interface TimelineSidebarProps {
  items: TimelineSidebarItem[];
}

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "-45% 0px -45% 0px",
  threshold: 0.1,
};

const TimelineSidebar = ({ items }: TimelineSidebarProps) => {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length === 0) {
        return;
      }

      const topMost = visibleEntries.reduce((prev, current) =>
        prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
      );

      if (topMost.target.id) {
        setActiveId(topMost.target.id);
      }
    }, observerOptions);

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const accentMap = useMemo(() => {
    const record = new Map<string, string>();
    items.forEach((item) => {
      if (!record.has(item.id)) {
        record.set(item.id, item.accentColor);
      }
    });
    return record;
  }, [items]);

  const legend = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((item) => {
      if (!map.has(item.group)) {
        map.set(item.group, item.accentColor);
      }
    });
    return Array.from(map.entries());
  }, [items]);

  return (
    <aside className={styles.sidebar} aria-label="Timeline contents">
      <p className={styles.sidebarHeading}>Contents</p>
      <ul className={styles.sidebarList}>
        {items.map((item) => {
          const color = accentMap.get(item.id) ?? "#0ea5e9";
          const isActive = item.id === activeId;

          return (
            <li
              key={item.id}
              className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ""}`.trim()}
              style={{ color: isActive ? color : undefined }}
            >
              <Link
                href={`#${item.id}`}
                className={styles.sidebarLink}
                onClick={() => setActiveId(item.id)}
              >
                <span className={styles.sidebarItemTitle}>{item.title}</span>
                <span className={styles.sidebarItemMeta}>{item.meta}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className={styles.sidebarLegend}>
        {legend.map(([group, color]) => (
          <span key={group}>
            <span className={styles.sidebarLegendSwatch} style={{ backgroundColor: color }} />
            {group}
          </span>
        ))}
      </div>
    </aside>
  );
};

export default TimelineSidebar;
