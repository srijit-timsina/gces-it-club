"use client";

import { useState, useEffect } from "react";
import TeamCard from "@/components/ui/TeamCard";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/Icons";
import type { TeamMember } from "@/lib/types";

export default function TeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadTeam = () => {
    setError(false);
    setLoading(true);
    fetch("/api/team")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Invalid data format");
        const sorted = data.sort(
          (a: TeamMember, b: TeamMember) =>
            (Number(a.order) || 999) - (Number(b.order) || 999)
        );
        setTeam(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Team fetch error:", err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    queueMicrotask(loadTeam);
  }, []);

  // Safe role check — never crashes if role is undefined/null
  const roleIncludes = (role: string | undefined, keyword: string) =>
    (role || "").toLowerCase().includes(keyword);

  const faculty = team.filter(
    (m) => roleIncludes(m.role, "faculty") || roleIncludes(m.role, "advisor")
  );
  const students = team.filter(
    (m) => !roleIncludes(m.role, "faculty") && !roleIncludes(m.role, "advisor")
  );

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          background: "var(--subtle-section)",
          padding: "4rem 0 2rem",
          borderBottom: "1px solid var(--border)",
          marginBottom: "3rem",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Meet Our <span className="accent-text">Team</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            The dedicated individuals working behind the scenes to make the club awesome.
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* Loading */}
        {loading && <GridSkeleton count={8} />}

        {/* Error State */}
        {!loading && error && (
          <div
            style={{
              textAlign: "center",
              padding: "5rem 2rem",
              background: "rgba(20,95,120,0.06)",
              border: "1px solid rgba(20,95,120,0.2)",
              borderRadius: "16px",
            }}
          >
            <div className="icon-tile" style={{ margin: "0 auto 1.25rem" }}>
              <Icon name="alert" size={28} />
            </div>
            <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.75rem", fontWeight: 700 }}>
              Something went wrong
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "1rem", maxWidth: "400px", margin: "0 auto 2rem" }}>
              We couldn&apos;t load the team data right now. Please check your internet connection or try again later.
            </p>
            <button
              onClick={loadTeam}
              style={{
                padding: "10px 28px",
                borderRadius: "8px",
                background: "var(--accent-primary)",
                color: "#fff",
                border: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && team.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            <div className="icon-tile" style={{ margin: "0 auto 1rem" }}>
              <Icon name="users" size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>No team members found</h3>
            <p>Team data will appear here once it is added to the sheet.</p>
          </div>
        )}

        {/* Success: Team Grid */}
        {!loading && !error && team.length > 0 && (
          <>
            {faculty.length > 0 && (
              <div style={{ marginBottom: "5rem" }}>
                <h2
                  className="section-title"
                  style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2rem" }}
                >
                  Faculty Advisors
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                >
                  {faculty.map((member) => (
                    <TeamCard key={member.id || member.name} member={member} />
                  ))}
                </div>
              </div>
            )}

            {students.length > 0 && (
              <div>
                <h2
                  className="section-title"
                  style={{ textAlign: "center", marginBottom: "3rem", fontSize: "2rem" }}
                >
                  Core Team
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  {students.map((member) => (
                    <TeamCard key={member.id || member.name} member={member} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
