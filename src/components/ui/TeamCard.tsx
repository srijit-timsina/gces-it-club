"use client";

import { useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import type { TeamMember } from "@/lib/types";

export default function TeamCard({ member }: { member: TeamMember }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="glass-card"
        style={{
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.3)";
          (e.currentTarget as HTMLElement).style.background = "rgba(19,25,40,0.95)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
          (e.currentTarget as HTMLElement).style.background = "rgba(19,25,40,0.8)";
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            marginBottom: "1.25rem",
            position: "relative",
            overflow: "hidden",
            border: "2px solid rgba(139,92,246,0.4)",
            padding: "4px",
            background: "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.1))",
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", position: "relative", background: "#1e293b" }}>
            {member.image_url ? (
              <Image src={member.image_url} alt={member.name} fill style={{ objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
                👤
              </div>
            )}
          </div>
        </div>

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#f1f5f9", marginBottom: "0.25rem" }}>
          {member.name}
        </h3>
        <div style={{ color: "#a78bfa", fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.75rem" }}>
          {member.role}
        </div>
        
        {member.year && member.year !== "-" && (
          <div style={{ fontSize: "0.8rem", color: "#64748b", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "99px" }}>
            {member.year} • {member.branch}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="500px">
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              margin: "0 auto 1.5rem",
              position: "relative",
              overflow: "hidden",
              border: "3px solid rgba(139,92,246,0.5)",
            }}
          >
            {member.image_url ? (
              <Image src={member.image_url} alt={member?.name || ""} fill style={{ objectFit: "cover" }} />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem" }}>
                👤
              </div>
            )}
          </div>

          <h2 style={{ fontSize: "1.8rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>{member?.name || ""}</h2>
          <div style={{ color: "#a78bfa", fontSize: "1.1rem", fontWeight: 500, marginBottom: "1rem" }}>{member?.role || ""}</div>
          
          {member?.year && member?.year !== "-" && (
            <div style={{ display: "inline-block", fontSize: "0.85rem", color: "#94a3b8", background: "rgba(255,255,255,0.05)", padding: "4px 12px", borderRadius: "99px", marginBottom: "1.5rem" }}>
              {member?.year || ""} • {member?.branch || ""}
            </div>
          )}

          <p style={{ color: "#cbd5e1", lineHeight: 1.6, marginBottom: "2rem", textAlign: "left" }}>
            {member?.bio || ""}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#60a5fa"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            )}
            {member.email && (
              <a href={`mailto:${member.email}`} style={{ color: "#94a3b8", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#f43f5e"} onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
              </a>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
