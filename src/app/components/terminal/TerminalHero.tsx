"use client";

import { useEffect, useState, useRef, KeyboardEvent } from "react";

import styles from "./TerminalHero.module.css";
import commands from "./commands.json";

const prompt = "rob@portfolio:~$ ";

interface HistoryEntry {
  command: string;
  output: string[];
  isTyping?: boolean;
  typedOutput?: string;
}

const TerminalHero = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [typingComplete, setTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [isCommandTyping, setIsCommandTyping] = useState(false);
  const [typingTrigger, setTypingTrigger] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const initialMessage = [
    "Welcome to Rob's Portfolio Terminal!",
    "",
    "Type 'help' to see available commands, or try:",
    "• about    - Learn about Rob",
    "• projects - View featured work", 
    "• skills   - See technical skills",
    "• contact  - Get in touch",
    "",
    "Start typing to explore! ✨"
  ];

  const fullInitialText = initialMessage.join("\n");

  // Typing animation effect
  useEffect(() => {
    if (typeof window === "undefined" || !showInitialMessage) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeoutId: number | null = null;

    const clearTimer = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const finishImmediately = () => {
      clearTimer();
      setTypedText(fullInitialText);
      setTypingComplete(true);
    };

    const runTyping = () => {
      clearTimer();
      setTypedText("");
      setTypingComplete(false);

      let index = 0;
      const typeNext = () => {
        if (index >= fullInitialText.length) {
          setTypingComplete(true);
          return;
        }

        index += 1;
        setTypedText(fullInitialText.slice(0, index));

        if (index < fullInitialText.length) {
          const nextChar = fullInitialText[index];
          const delay = nextChar === "\n" ? 40 : 15;
          timeoutId = window.setTimeout(typeNext, delay);
        } else {
          setTypingComplete(true);
        }
      };

      timeoutId = window.setTimeout(typeNext, 500);
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
  }, [fullInitialText, showInitialMessage]);

  // Cursor blinking effect
  useEffect(() => {
    if (!showInitialMessage || typingComplete) {
      return;
    }

    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [showInitialMessage, typingComplete]);

  // Command output typing animation
  useEffect(() => {
    if (typeof window === "undefined" || typingTrigger === 0 || history.length === 0) {
      return;
    }

    const lastEntry = history[history.length - 1];
    if (!lastEntry.isTyping) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timeoutId: number | null = null;

    const fullOutputText = lastEntry.output.join("\n");

    const clearTimer = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const finishImmediately = () => {
      clearTimer();
      setHistory(prev => prev.map((entry, index) => 
        index === prev.length - 1 
          ? { ...entry, isTyping: false, typedOutput: fullOutputText }
          : entry
      ));
      setIsCommandTyping(false);
    };

    const runTyping = () => {
      clearTimer();
      setIsCommandTyping(true);
      
      let index = 0;
      const typeNext = () => {
        if (index >= fullOutputText.length) {
          setHistory(prev => prev.map((entry, entryIndex) => 
            entryIndex === prev.length - 1 
              ? { ...entry, isTyping: false, typedOutput: fullOutputText }
              : entry
          ));
          setIsCommandTyping(false);
          return;
        }

        index += 1;
        const currentText = fullOutputText.slice(0, index);
        
        setHistory(prev => prev.map((entry, entryIndex) => 
          entryIndex === prev.length - 1 
            ? { ...entry, typedOutput: currentText }
            : entry
        ));

        if (index < fullOutputText.length) {
          const nextChar = fullOutputText[index];
          const delay = nextChar === "\n" ? 40 : 15;
          timeoutId = window.setTimeout(typeNext, delay);
        } else {
          // Ensure we complete the typing
          setHistory(prev => prev.map((entry, entryIndex) => 
            entryIndex === prev.length - 1 
              ? { ...entry, isTyping: false, typedOutput: fullOutputText }
              : entry
          ));
          setIsCommandTyping(false);
        }
      };

      timeoutId = window.setTimeout(typeNext, 200);
    };

    if (mediaQuery.matches) {
      finishImmediately();
    } else {
      runTyping();
    }

    return () => {
      clearTimer();
    };
  }, [typingTrigger]);

  // Focus input when terminal becomes visible or restored, and typing is complete
  useEffect(() => {
    if (!isMinimized && isVisible && typingComplete && !isCommandTyping && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized, isVisible, typingComplete, isCommandTyping]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history, typedText]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "") {
      return [];
    }

    if (trimmedCmd === "clear") {
      setHistory([]);
      setShowInitialMessage(false);
      return [];
    }

    const commandData = commands[trimmedCmd as keyof typeof commands];
    
    if (commandData) {
      return commandData.output;
    } else {
      return [
        `Command '${trimmedCmd}' not found.`,
        "Type 'help' to see available commands."
      ];
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isCommandTyping) {
      const command = currentInput;
      const output = executeCommand(command);
      
      if (command.trim().toLowerCase() !== "clear") {
        setHistory(prev => [...prev, { 
          command, 
          output, 
          isTyping: true, 
          typedOutput: "" 
        }]);
        setTypingTrigger(prev => prev + 1);
      }
      
      setCurrentInput("");
      setShowInitialMessage(false);
    }
  };

  // Terminal control handlers
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle click on terminal body to focus input (only when typing is complete)
  const handleTerminalClick = () => {
    if (inputRef.current && (typingComplete || !showInitialMessage) && !isCommandTyping) {
      inputRef.current.focus();
    }
  };

  // Don't render if closed
  if (!isVisible) {
    return null;
  }

  return (
    <div 
      className={`${styles.terminal} ${isMinimized ? styles.minimized : ''} ${isFullscreen ? styles.fullscreen : ''}`} 
      aria-label="Portfolio terminal"
      onClick={handleTerminalClick}
    >
      <div className={styles.terminalHeader}>
        <div className={styles.terminalLights}>
          <button 
            className={`${styles.terminalLight} ${styles.closeButton}`}
            onClick={handleClose}
            aria-label="Close terminal"
            title="Close"
          />
          <button 
            className={`${styles.terminalLight} ${styles.minimizeButton}`}
            onClick={handleMinimize}
            aria-label={isMinimized ? "Restore terminal" : "Minimize terminal"}
            title={isMinimized ? "Restore" : "Minimize"}
          />
          <button 
            className={`${styles.terminalLight} ${styles.fullscreenButton}`}
            onClick={handleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          />
        </div>
        <span className={styles.terminalTitle}>portfolio — bash</span>
      </div>
      {!isMinimized && (
        <div className={styles.terminalBody} ref={terminalBodyRef}>
          <div className={styles.terminalContent}>
            {/* Initial welcome message with typing animation */}
            {showInitialMessage && (
              <div className={styles.terminalSection}>
                <pre className={styles.terminalLine}>
                  {typedText}
                  {!typingComplete && showCursor && (
                    <span className={styles.cursor} aria-hidden="true" />
                  )}
                </pre>
              </div>
            )}

            {/* Command history */}
            {history.map((entry, index) => (
              <div key={index} className={styles.terminalSection}>
                {/* Command input line */}
                <div className={styles.terminalLine}>
                  <span className={styles.prompt}>{prompt}</span>
                  <span className={styles.command}>{entry.command}</span>
                </div>
                
                {/* Command output */}
                {entry.isTyping ? (
                  <pre className={styles.terminalLine}>
                    {entry.typedOutput}
                    {entry.isTyping && (
                      <span className={styles.cursor} aria-hidden="true" />
                    )}
                  </pre>
                ) : (
                  entry.output.map((line, lineIndex) => (
                    <div key={lineIndex} className={styles.terminalLine}>
                      {line}
                    </div>
                  ))
                )}
              </div>
            ))}

            {/* Current input line - only show after typing is complete or initial message is hidden */}
            {(typingComplete || !showInitialMessage) && !isCommandTyping && (
              <div className={styles.terminalInputLine}>
                <span className={styles.prompt}>{prompt}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className={styles.terminalInput}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                  disabled={isCommandTyping}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalHero;
