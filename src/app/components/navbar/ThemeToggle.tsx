"use client";

import { useEffect, useRef, useState } from "react";
import { Sun, Moon } from "react-feather";
import styles from "./ThemeToggle.module.css";

type ThemeMode = "light" | "dark";

const resolveSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (mode: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  const body = document.body;

  root.classList.toggle("dark", mode === "dark");
  root.dataset.theme = mode;
  root.style.setProperty("color-scheme", mode);
  if (body) {
    body.classList.toggle("dark", mode === "dark");
    body.dataset.theme = mode;
  }
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);
  const [userOverride, setUserOverride] = useState(false);
  const overrideRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = window.localStorage.getItem("theme");
    const hasStored = stored === "dark" || stored === "light";
    const initialMode: ThemeMode = hasStored ? (stored as ThemeMode) : resolveSystemTheme();

    setTheme(initialMode);
    applyTheme(initialMode);
    setMounted(true);
    setUserOverride(hasStored);
    overrideRef.current = hasStored;

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      if (overrideRef.current) {
        return;
      }

      const nextMode: ThemeMode = event.matches ? "dark" : "light";
      setTheme(nextMode);
      applyTheme(nextMode);
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handlePreferenceChange);
    } else {
      mediaQuery.addListener(handlePreferenceChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        mediaQuery.removeListener(handlePreferenceChange);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") {
      return;
    }

    if (userOverride) {
      window.localStorage.setItem("theme", theme);
    } else {
      window.localStorage.removeItem("theme");
    }
  }, [theme, userOverride, mounted]);

  const isDark = theme === "dark";
  const label = `Activate ${isDark ? "light" : "dark"} mode`;

  const handleToggle = () => {
    const nextMode: ThemeMode = isDark ? "light" : "dark";
    overrideRef.current = true;
    setUserOverride(true);
    setTheme(nextMode);
    applyTheme(nextMode);
  };

  if (!mounted) {
    return (
      <div className={styles.themeToggle}>
        <Sun
          size={24}
          color="currentColor"
          style={{ cursor: "pointer", opacity: 0.5 }}
          aria-label="Loading theme toggle"
        />
      </div>
    );
  }

  return (
    <div className={styles.themeToggle} onClick={handleToggle} role="button" tabIndex={0} aria-label={label}>
      {isDark ? (
        <Moon
          size={24}
          color="currentColor"
          style={{ cursor: "pointer" }}
        />
      ) : (
        <Sun
          size={24}
          color="currentColor"
          style={{ cursor: "pointer" }}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
