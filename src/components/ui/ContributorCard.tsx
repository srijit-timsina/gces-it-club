"use client";

import Image from "next/image";
import type { Contributor } from "@/lib/types";
import { Icon } from "./Icons";

export default function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <div
      className="glass-card interactive-card"
      style={{
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border-accent)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 28px rgba(34, 85, 153, 0.16)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            position: "relative",
            overflow: "hidden",
            border: "2px solid rgba(34, 85, 153,0.4)",
            flexShrink: 0,
            background: "var(--image-placeholder-bg)"
          }}
        >
          {contributor.image_url ? (
            <Image src={contributor.image_url} alt={contributor.name} fill style={{ objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
              <Icon name="code" size={24} />
            </div>
          )}
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "8px" }}>
            {contributor.name || "Unknown Contributor"}
            {(contributor.role || "").toLowerCase().includes('lead') && (
              <span title="Project Lead" style={{ color: "var(--accent-primary)", display: "inline-flex" }}>
                <Icon name="star" size={15} />
              </span>
            )}
          </h3>
          <div style={{ color: "var(--accent-primary)", fontSize: "0.85rem", fontWeight: 500 }}>{contributor.role || "Member"}</div>
          {contributor.year && contributor.year !== "-" && (
             <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", marginTop: "2px" }}>{contributor.year} • {contributor.branch || "General"}</div>
          )}
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, flexGrow: 1, margin: "0.5rem 0" }}>
        {contributor.bio || ""}
      </p>

      <div style={{ display: "flex", gap: "0.75rem", borderTop: "1px solid var(--border)", paddingTop: "1rem", marginTop: "auto" }}>
        {contributor.github && (
          <a href={contributor.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"} title="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
        )}
        {contributor.linkedin && (
          <a href={contributor.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--accent-primary)"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"} title="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
        )}
        {contributor.website && (
          <a href={contributor.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#10b981"} onMouseLeave={e => e.currentTarget.style.color = "var(--text-secondary)"} title="Portfolio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          </a>
        )}
      </div>
    </div>
  );
}
