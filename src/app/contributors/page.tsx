"use client";

import { useState, useEffect } from "react";
import ContributorCard from "@/components/ui/ContributorCard";
import { GridSkeleton } from "@/components/ui/Skeleton";
import type { Contributor } from "@/lib/types";

export default function ContributorsPage() {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contributors")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Contributor, b: Contributor) => (Number(a.order) || 999) - (Number(b.order) || 999));
        setContributors(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(to bottom, rgba(59,130,246,0.1), transparent)", padding: "4rem 0 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: "1rem" }}>
            Project <span className="gradient-text">Contributors</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            The amazing people who designed, built, and maintained this website.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        {loading ? (
          <GridSkeleton count={4} />
        ) : contributors.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {contributors.map((contributor) => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#64748b" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>💻</div>
            <h3 style={{ fontSize: "1.2rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>No contributors found</h3>
          </div>
        )}

        <div className="glass-card" style={{ marginTop: "5rem", padding: "3rem", textAlign: "center", borderRadius: "24px" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#f1f5f9", marginBottom: "1rem" }}>Want to contribute?</h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", marginBottom: "2rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            This website is open-source. Whether it's a bug fix, a new feature, or improving documentation, all contributions are welcome!
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://github.com/gces-it-club/website" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              View Repository
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
