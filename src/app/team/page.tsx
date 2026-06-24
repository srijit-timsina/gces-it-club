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
  const [selectedTenure, setSelectedTenure] = useState<string>("");

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
        const sorted = data.sort((a: TeamMember, b: TeamMember) => {
          const orderA = a.order == null || String(a.order) === "" ? 999 : Number(a.order);
          const orderB = b.order == null || String(b.order) === "" ? 999 : Number(b.order);
          return (isNaN(orderA) ? 999 : orderA) - (isNaN(orderB) ? 999 : orderB);
        });
        setTeam(sorted);

        // Auto-select the latest student tenure
        if (sorted.length > 0) {
          const studentMembersOnly = sorted.filter(
            (m: TeamMember) => !roleIncludes(m.role, "faculty") && !roleIncludes(m.role, "advisor")
          );
          const uniqueTenures = Array.from(new Set(studentMembersOnly.map((m: TeamMember) => m.year).filter(Boolean))).sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
            if (numA !== numB) return numB - numA;
            return b.localeCompare(a);
          });
          if (uniqueTenures.length > 0) {
            setSelectedTenure(uniqueTenures[0]);
          } else if (sorted.some((m: TeamMember) => roleIncludes(m.role, "faculty") || roleIncludes(m.role, "advisor"))) {
            setSelectedTenure("faculty");
          }
        }

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

  const studentMembers = team.filter((m) => !roleIncludes(m.role, "faculty") && !roleIncludes(m.role, "advisor"));

  const tenures = Array.from(new Set(studentMembers.map((m) => m.year).filter(Boolean))).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
    if (numA !== numB) return numB - numA;
    return b.localeCompare(a);
  });

  const faculty = selectedTenure === "faculty"
    ? team.filter((m) => roleIncludes(m.role, "faculty") || roleIncludes(m.role, "advisor"))
    : [];

  const students = selectedTenure !== "faculty" && selectedTenure
    ? studentMembers.filter((m) => m.year === selectedTenure)
    : [];

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
            <p>Team data will appear here once it is added.</p>
          </div>
        )}

        {/* Success: Team Grid */}
        {!loading && !error && team.length > 0 && (
          <>
            {/* Tenure Selector */}
            {(tenures.length > 0 || team.some(m => roleIncludes(m.role, "faculty") || roleIncludes(m.role, "advisor"))) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginBottom: "3.5rem",
                  flexWrap: "wrap",
                }}
              >
                {tenures.map((tenure) => {
                  const isActive = selectedTenure === tenure;
                  return (
                    <button
                      key={tenure}
                      onClick={() => setSelectedTenure(tenure)}
                      style={{
                        padding: "8px 20px",
                        borderRadius: "9999px",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: isActive ? "var(--accent-primary)" : "var(--control-bg)",
                        color: isActive ? "#ffffff" : "var(--text-secondary)",
                        border: isActive ? "1px solid var(--accent-primary)" : "1px solid var(--border)",
                        boxShadow: isActive ? "0 4px 12px rgba(34, 85, 153, 0.3)" : "none",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "var(--accent-primary)";
                          e.currentTarget.style.color = "var(--text-primary)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "var(--border)";
                          e.currentTarget.style.color = "var(--text-secondary)";
                        }
                      }}
                    >
                      {/^\d{4}/.test(tenure) ? `Committee ${tenure}` : tenure}
                    </button>
                  );
                })}

                {team.some(m => roleIncludes(m.role, "faculty") || roleIncludes(m.role, "advisor")) && (
                  <button
                    onClick={() => setSelectedTenure("faculty")}
                    style={{
                      padding: "8px 20px",
                      borderRadius: "9999px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      background: selectedTenure === "faculty" ? "var(--accent-primary)" : "var(--control-bg)",
                      color: selectedTenure === "faculty" ? "#ffffff" : "var(--text-secondary)",
                      border: selectedTenure === "faculty" ? "1px solid var(--accent-primary)" : "1px solid var(--border)",
                      boxShadow: selectedTenure === "faculty" ? "0 4px 12px rgba(34, 85, 153, 0.3)" : "none",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedTenure !== "faculty") {
                        e.currentTarget.style.borderColor = "var(--accent-primary)";
                        e.currentTarget.style.color = "var(--text-primary)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedTenure !== "faculty") {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.color = "var(--text-secondary)";
                      }
                    }}
                  >
                    Faculty Advisors
                  </button>
                )}
              </div>
            )}

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
