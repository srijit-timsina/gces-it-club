"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import { Icon } from "./Icons";
import type { Event } from "@/lib/types";

export default function EventCard({ event }: { event: Event }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = () => {
    switch (event.status) {
      case "upcoming":
        return <span className="badge badge-green">Upcoming</span>;
      case "ongoing":
        return <span className="badge badge-blue">Ongoing</span>;
      case "past":
        return <span className="badge badge-secondary" style={{ background: "var(--chip-bg)", color: "var(--text-secondary)" }}>Past</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="glass-card interactive-card"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Placeholder or Actual Image */}
        <div style={{ height: 160, position: "relative", background: "var(--bg-secondary)", overflow: "hidden" }}>
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              className="card-media-image"
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name="calendar" size={48} style={{ opacity: 0.6, color: "var(--accent-primary)" }} />
            </div>
          )}
          <div style={{ position: "absolute", top: "12px", right: "12px" }}>
            {getStatusBadge()}
          </div>
        </div>

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{event.title}</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Icon name="calendar" size={15} /> <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Icon name="map-pin" size={15} /> <span>{event.location}</span>
            </div>
          </div>

          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {event.description}
          </p>

          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ color: "var(--accent-primary)", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              Register Now ! <Icon name="arrow-right" size={15} />
            </span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "var(--text-primary)", paddingRight: "2rem" }}>{event.title}</h2>
            {getStatusBadge()}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", background: "var(--chip-bg)", borderRadius: "8px", border: "1px solid var(--border)" }}>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "4px" }}>Date</div>
              <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "4px" }}>Time</div>
              <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{event.time}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: "4px" }}>Location</div>
              <div style={{ color: "var(--text-primary)", fontWeight: 500 }}>{event.location}</div>
            </div>
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "var(--text-primary)" }}>About this event</h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {event.description}
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
            <button onClick={() => setIsModalOpen(false)} className="btn-secondary">
              Close
            </button>
            {(event.status === "upcoming" || event.status === "ongoing") && event.register_link && (
              <a href={event.register_link} target="_blank" rel="noopener noreferrer" className="btn-primary">
                Register Now
              </a>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
