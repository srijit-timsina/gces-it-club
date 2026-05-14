"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
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
        return <span className="badge badge-secondary" style={{ background: "rgba(255,255,255,0.1)", color: "#94a3b8" }}>Past</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className="glass-card"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Image Placeholder or Actual Image */}
        <div style={{ height: 160, position: "relative", background: "var(--bg-secondary)", overflow: "hidden" }}>
          {event.image_url ? (
            <Image
              src={event.image_url}
              alt={event.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1e293b 0%, #0f1629 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "3rem", opacity: 0.2 }}>📅</span>
            </div>
          )}
          <div style={{ position: "absolute", top: "12px", right: "12px" }}>
            {getStatusBadge()}
          </div>
        </div>

        <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#f1f5f9" }}>{event.title}</h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1rem", fontSize: "0.85rem", color: "#94a3b8" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>🗓️</span> <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at {event.time}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span>📍</span> <span>{event.location}</span>
            </div>
          </div>

          <p style={{ fontSize: "0.9rem", color: "#cbd5e1", flexGrow: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
            {event.description}
          </p>

          <div style={{ marginTop: "1.5rem" }}>
            <span style={{ color: "#3b82f6", fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
              View Details <span style={{ transition: "transform 0.2s ease" }}>→</span>
            </span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div style={{ padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.8rem", color: "#f1f5f9", paddingRight: "2rem" }}>{event.title}</h2>
            {getStatusBadge()}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem", padding: "1.5rem", background: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", marginBottom: "4px" }}>Date</div>
              <div style={{ color: "#f1f5f9", fontWeight: 500 }}>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", marginBottom: "4px" }}>Time</div>
              <div style={{ color: "#f1f5f9", fontWeight: 500 }}>{event.time}</div>
            </div>
            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", marginBottom: "4px" }}>Location</div>
              <div style={{ color: "#f1f5f9", fontWeight: 500 }}>{event.location}</div>
            </div>
          </div>

          <div style={{ marginBottom: "2.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem", color: "#f1f5f9" }}>About this event</h3>
            <p style={{ color: "#cbd5e1", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
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
