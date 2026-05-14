"use client";

import { useState, useEffect } from "react";
import ResourceCard from "@/components/ui/ResourceCard";
import { GridSkeleton } from "@/components/ui/Skeleton";
import SearchBar from "@/components/ui/SearchBar";
import FilterButtons from "@/components/ui/FilterButtons";
import type { Resource } from "@/lib/types";

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const types = ["all", ...Array.from(new Set(resources.map((r) => r.type || "Other")))];

  const filteredResources = resources.filter((r) => {
    const s = searchQuery.toLowerCase();
    const titleMatch = (r.title || "").toLowerCase().includes(s);
    const descMatch = (r.description || "").toLowerCase().includes(s);
    const tagsMatch = (r.tags || "").toLowerCase().includes(s);
    const matchesSearch = titleMatch || descMatch || tagsMatch;
    const matchesFilter = filter === "all" || (r.type || "Other") === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(to bottom, rgba(16,185,129,0.1), transparent)", padding: "4rem 0 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: "1rem" }}>
            Learning <span className="gradient-text">Resources</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Curated materials, tutorials, and docs to accelerate your learning journey.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ maxWidth: "500px", width: "100%" }}>
            <SearchBar onSearch={setSearchQuery} placeholder="Search tutorials, docs, tags..." />
          </div>
          {types.length > 1 && (
            <FilterButtons
              active={filter}
              onChange={setFilter}
              options={types.map(t => ({ label: t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1), value: t }))}
            />
          )}
        </div>

        {loading ? (
          <GridSkeleton count={6} />
        ) : filteredResources.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#64748b" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🔍</div>
            <h3 style={{ fontSize: "1.2rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>No resources found</h3>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
}
