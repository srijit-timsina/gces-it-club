"use client";

interface FilterButtonsProps {
  options: { label: string; value: string }[];
  active: string;
  onChange: (value: string) => void;
}

export default function FilterButtons({ options, active, onChange }: FilterButtonsProps) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            id={`filter-${opt.value}`}
            onClick={() => onChange(opt.value)}
            style={{
              padding: "7px 18px",
              borderRadius: "999px",
              border: isActive
                ? "1px solid var(--border-accent)"
                : "1px solid var(--control-border)",
              background: isActive
                ? "var(--accent-soft)"
                : "var(--control-bg)",
              color: isActive ? "var(--accent-primary)" : "var(--text-secondary)",
              fontSize: "0.85rem",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "var(--control-bg-hover)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "var(--control-bg)";
                (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
              }
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
