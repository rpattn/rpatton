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
  const [shouldSkipTyping, setShouldSkipTyping] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState("");
  const [predictions, setPredictions] = useState<string[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState(-1);
  const [showPredictions, setShowPredictions] = useState(false);
  const [dropdownAbove, setDropdownAbove] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const predictionsRef = useRef<HTMLDivElement>(null);

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
      setShouldSkipTyping(false);
    };

    const runTyping = () => {
      clearTimer();
      setTypedText("");
      setTypingComplete(false);

      let index = 0;
      const typeNext = () => {
        // Check if we should skip typing
        if (shouldSkipTyping) {
          finishImmediately();
          return;
        }

        if (index >= fullInitialText.length) {
          setTypingComplete(true);
          setShouldSkipTyping(false);
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
          setShouldSkipTyping(false);
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
  }, [fullInitialText, showInitialMessage, shouldSkipTyping]);

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
      setShouldSkipTyping(false);
    };

    const runTyping = () => {
      clearTimer();
      setIsCommandTyping(true);
      
      let index = 0;
      const typeNext = () => {
        // Check if we should skip typing
        if (shouldSkipTyping) {
          finishImmediately();
          return;
        }

        if (index >= fullOutputText.length) {
          setHistory(prev => prev.map((entry, entryIndex) => 
            entryIndex === prev.length - 1 
              ? { ...entry, isTyping: false, typedOutput: fullOutputText }
              : entry
          ));
          setIsCommandTyping(false);
          setShouldSkipTyping(false);
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
          setShouldSkipTyping(false);
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
  }, [typingTrigger, shouldSkipTyping]);

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

  // Global keydown listener for skipping typing animations
  useEffect(() => {
    const handleGlobalKeyDown = (e: Event) => {
      const keyboardEvent = e as unknown as KeyboardEvent;
      if (keyboardEvent.key === "Enter" && ((!typingComplete && showInitialMessage) || isCommandTyping)) {
        keyboardEvent.preventDefault();
        setShouldSkipTyping(true);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [typingComplete, showInitialMessage, isCommandTyping]);

  // Check dropdown positioning when predictions are shown
  useEffect(() => {
    if (showPredictions && inputRef.current && terminalBodyRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const terminalRect = terminalBodyRef.current.getBoundingClientRect();
      
      // Calculate available space below input
      const spaceBelow = terminalRect.bottom - inputRect.bottom;
      const dropdownHeight = 200; // max-height of dropdown
      
      // If there's not enough space below, show above
      setDropdownAbove(spaceBelow < dropdownHeight + 20);
    }
  }, [showPredictions, predictions.length]);

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

  const getCommandPredictions = (input: string) => {
    if (!input.trim()) {
      return [];
    }

    const availableCommands = Object.keys(commands);
    const inputLower = input.toLowerCase().trim();
    
    // Filter commands that start with the input
    const matches = availableCommands.filter(cmd => 
      cmd.toLowerCase().startsWith(inputLower)
    );

    // Sort by length (shorter matches first) and alphabetically
    return matches.sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }
      return a.localeCompare(b);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isCommandTyping) {
      e.preventDefault();
      return;
    }

    switch (e.key) {
      case "Enter":
        // If a prediction is selected, use it
        if (showPredictions && selectedPrediction >= 0 && predictions[selectedPrediction]) {
          setCurrentInput(predictions[selectedPrediction]);
          setShowPredictions(false);
          setSelectedPrediction(-1);
          setDropdownAbove(false);
          return;
        }

        const command = currentInput.trim();
        if (command) {
          // Add to command history (avoid duplicates of the most recent command)
          setCommandHistory(prev => {
            const filtered = prev.filter(cmd => cmd !== command);
            return [...filtered, command];
          });
        }
        
        const output = executeCommand(command);
        
        if (command && command.toLowerCase() !== "clear") {
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
        setHistoryIndex(-1);
        setTempInput("");
        setShowPredictions(false);
        setSelectedPrediction(-1);
        setDropdownAbove(false);
        break;

      case "ArrowUp":
        e.preventDefault();
        if (showPredictions && predictions.length > 0) {
          // Navigate predictions
          setSelectedPrediction(prev => 
            prev <= 0 ? predictions.length - 1 : prev - 1
          );
        } else if (commandHistory.length > 0) {
          // Navigate command history
          const newIndex = historyIndex === -1 
            ? commandHistory.length - 1 
            : Math.max(0, historyIndex - 1);
          
          if (historyIndex === -1) {
            setTempInput(currentInput);
          }
          
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
          setShowPredictions(false);
          setDropdownAbove(false);
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (showPredictions && predictions.length > 0) {
          // Navigate predictions
          setSelectedPrediction(prev => 
            prev >= predictions.length - 1 ? 0 : prev + 1
          );
        } else if (historyIndex !== -1) {
          // Navigate command history
          const newIndex = historyIndex + 1;
          
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setCurrentInput(tempInput);
          } else {
            setHistoryIndex(newIndex);
            setCurrentInput(commandHistory[newIndex]);
          }
        }
        break;

      case "Tab":
        e.preventDefault();
        if (showPredictions && predictions.length > 0) {
          const prediction = predictions[selectedPrediction >= 0 ? selectedPrediction : 0];
          setCurrentInput(prediction);
          setShowPredictions(false);
          setSelectedPrediction(-1);
          setDropdownAbove(false);
        }
        break;

      case "Escape":
        e.preventDefault();
        if (showPredictions) {
          setShowPredictions(false);
          setSelectedPrediction(-1);
          setDropdownAbove(false);
        } else {
          setHistoryIndex(-1);
          setCurrentInput(tempInput);
          setTempInput("");
        }
        break;
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
              <div className={styles.terminalInputContainer}>
                <div className={styles.terminalInputLine}>
                  <span className={styles.prompt}>{prompt}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={(e) => {
                      const value = e.target.value;
                      setCurrentInput(value);
                      
                      // Reset history navigation when user types
                      if (historyIndex !== -1) {
                        setHistoryIndex(-1);
                        setTempInput("");
                      }

                      // Update predictions
                      const newPredictions = getCommandPredictions(value);
                      setPredictions(newPredictions);
                      setShowPredictions(newPredictions.length > 0 && value.trim().length > 0);
                      setSelectedPrediction(-1);
                    }}
                    onKeyDown={handleKeyDown}
                    className={styles.terminalInput}
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Terminal command input"
                    disabled={isCommandTyping}
                  />
                </div>
                
                {/* Predictions dropdown */}
                {showPredictions && predictions.length > 0 && (
                  <div 
                    ref={predictionsRef}
                    className={`${styles.predictionsDropdown} ${
                      dropdownAbove ? styles.dropdownAbove : ''
                    }`}
                  >
                    {predictions.map((prediction, index) => (
                      <div
                        key={prediction}
                        className={`${styles.predictionItem} ${
                          index === selectedPrediction ? styles.predictionSelected : ''
                        }`}
                        onClick={() => {
                          setCurrentInput(prediction);
                          setShowPredictions(false);
                          setSelectedPrediction(-1);
                          setDropdownAbove(false);
                          if (inputRef.current) {
                            inputRef.current.focus();
                          }
                        }}
                      >
                        <span className={styles.predictionCommand}>{prediction}</span>
                        <span className={styles.predictionDescription}>
                          {commands[prediction as keyof typeof commands]?.description || ''}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalHero;
