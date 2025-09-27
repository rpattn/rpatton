"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./TerminalHero.module.css";

const prompt = "rob@portfolio:~$ ";
const command = "cat README.md";
const readmeLines = [
  "",
  "# Rob Patton",
  "Senior Systems Engineer & Product Builder",
  "",
  "Highlights:",
  "- Automation-first workflow design",
  "- Immersive analytics for robotics",
  "- Collaborative product leadership",
  "",
  "Latest commit: shipping resilient tools for fast-moving teams.",
  "Location: Remote (US / UK friendly)",
  "Contact: rob@robpatton.dev",
];

const buildFullText = () => {
  return `${prompt}${command}\n${readmeLines.join("\n")}\n${prompt}`;
};

const TerminalHero = () => {
  const fullText = useMemo(buildFullText, []);
  const [displayText, setDisplayText] = useState(() => prompt);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeoutId: number | null = null;

    const promptLength = prompt.length;
    const commandEndIndex = promptLength + command.length;

    const clearTimer = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const finishImmediately = () => {
      clearTimer();
      setDisplayText(fullText);
      setTypingComplete(true);
    };

    const runTyping = () => {
      clearTimer();
      setDisplayText(fullText.slice(0, promptLength));
      setTypingComplete(false);

      let index = promptLength;
      const typeNext = () => {
        if (index >= fullText.length) {
          setTypingComplete(true);
          return;
        }

        index += 1;
        setDisplayText(fullText.slice(0, index));

        if (index < fullText.length) {
          const nextChar = fullText[index];
          const isCommandChar = index < commandEndIndex;
          const delay = nextChar === "\n" ? 220 : isCommandChar ? 110 : 20;
          timeoutId = window.setTimeout(typeNext, delay);
        } else {
          setTypingComplete(true);
        }
      };

      timeoutId = window.setTimeout(typeNext, 360);
    };

    if (mediaQuery.matches) {
      finishImmediately();
    } else {
      runTyping();
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        finishImmediately();
      } else {
        runTyping();
      }
    };

    const supportsEventListener = typeof mediaQuery.addEventListener === "function";

    if (supportsEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (supportsEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
      clearTimer();
    };
  }, [fullText]);

  const cursorClassName = typingComplete
    ? `${styles.cursor} ${styles.cursorIdle}`
    : styles.cursor;

  return (
    <div className={styles.terminal} aria-label="Portfolio terminal output">
      <div className={styles.terminalHeader}>
        <div className={styles.terminalLights} aria-hidden="true">
          <span className={styles.terminalLight} />
          <span className={styles.terminalLight} />
          <span className={styles.terminalLight} />
        </div>
        <span className={styles.terminalTitle}>portfolio — bash</span>
      </div>
      <div className={styles.terminalBody}>
        <pre className={styles.terminalOutput} aria-live="polite">
          {displayText}
          <span className={cursorClassName} aria-hidden="true" />
        </pre>
      </div>
    </div>
  );
};

export default TerminalHero;
