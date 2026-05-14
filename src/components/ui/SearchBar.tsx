"use client";

import { useState, useEffect, useRef } from "react";

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
          color: "#64748b",
          fontSize: "1rem",
          pointerEvents: "none",
        }}
      >
        🔍
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
          background: "#131928",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          color: "#f1f5f9",
          fontSize: "0.9rem",
          outline: "none",
          transition: "border-color 0.2s ease",
        }}
        onFocus={(e) => { e.target.style.borderColor = "rgba(59,130,246,0.5)"; }}
        onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
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
            color: "#64748b",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "2px",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}
