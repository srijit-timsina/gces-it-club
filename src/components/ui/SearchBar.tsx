"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "./Icons";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export default function SearchBar({ placeholder = "Search...", onSearch, debounceMs = 300 }: SearchBarProps) {
  const [value, setValue] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(value);
    }, debounceMs);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [value, debounceMs, onSearch]);

  return (
    <div style={{ position: "relative", display: "inline-flex", width: "100%" }}>
      <span
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          fontSize: "1rem",
          pointerEvents: "none",
        }}
      >
        <Icon name="search" size={17} />
      </span>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "11px 14px 11px 42px",
          background: "var(--control-bg)",
          border: "1px solid var(--control-border)",
          borderRadius: "12px",
          color: "var(--text-primary)",
          fontSize: "0.9rem",
          outline: "none",
          transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent-primary)";
          e.target.style.boxShadow = "0 0 0 3px var(--accent-soft)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--control-border)";
          e.target.style.boxShadow = "none";
        }}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          aria-label="Clear search"
          style={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "2px",
          }}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}
