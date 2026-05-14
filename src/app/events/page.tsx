"use client";

import { useState, useEffect } from "react";
import EventCard from "@/components/ui/EventCard";
import { GridSkeleton } from "@/components/ui/Skeleton";
import SearchBar from "@/components/ui/SearchBar";
import FilterButtons from "@/components/ui/FilterButtons";
import { Icon } from "@/components/ui/Icons";
import type { Event } from "@/lib/types";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        // Sort events: upcoming first, then past
        const sorted = data.sort((a: Event, b: Event) => {
          if (a.status === 'upcoming' && b.status !== 'upcoming') return -1;
          if (b.status === 'upcoming' && a.status !== 'upcoming') return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setEvents(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredEvents = events.filter((e) => {
    const s = searchQuery.toLowerCase();
    const titleMatch = (e.title || "").toLowerCase().includes(s);
    const descMatch = (e.description || "").toLowerCase().includes(s);
    const matchesSearch = titleMatch || descMatch;
    const matchesFilter = filter === "all" || e.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "var(--subtle-section)", padding: "4rem 0 2rem", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Events & <span className="accent-text">Workshops</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Join our upcoming hackathons, tech talks, and hands-on workshops.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}>
          <div style={{ maxWidth: "500px", width: "100%" }}>
            <SearchBar onSearch={setSearchQuery} placeholder="Search events..." />
          </div>
          <FilterButtons
            active={filter}
            onChange={setFilter}
            options={[
              { label: "All Events", value: "all" },
              { label: "Upcoming", value: "upcoming" },
              { label: "Ongoing", value: "ongoing" },
              { label: "Past", value: "past" },
            ]}
          />
        </div>

        {/* Grid */}
        {loading ? (
          <GridSkeleton count={6} />
        ) : filteredEvents.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            <div className="icon-tile" style={{ margin: "0 auto 1rem" }}>
              <Icon name="search" size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>No events found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
