"use client";

import { useState } from "react";
import { Icon } from "./Icons";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    const current = document.documentElement.dataset.theme;
    return current === "light" || current === "dark" ? current : "dark";
  });

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="theme-toggle"
    >
      <span className="theme-toggle__thumb">
        <Icon name={theme === "dark" ? "moon" : "sun"} size={15} />
      </span>
    </button>
  );
}
