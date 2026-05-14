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
                ? "1px solid rgba(59,130,246,0.5)"
                : "1px solid rgba(255,255,255,0.08)",
              background: isActive
                ? "rgba(59,130,246,0.15)"
                : "rgba(255,255,255,0.04)",
              color: isActive ? "#60a5fa" : "#94a3b8",
              fontSize: "0.85rem",
              fontWeight: isActive ? 600 : 400,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                (e.currentTarget as HTMLElement).style.color = "#f1f5f9";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                (e.currentTarget as HTMLElement).style.color = "#94a3b8";
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
