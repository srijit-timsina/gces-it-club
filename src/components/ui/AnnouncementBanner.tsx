"use client";

import { useState, useEffect } from "react";
import type { Announcement } from "@/lib/types";
import Modal from "./Modal";
import { Icon } from "./Icons";

export default function AnnouncementPopup() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen and dismissed an announcement in this session
    const hasSeen = sessionStorage.getItem("announcement_seen");

    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        // Find the first active announcement
        const active = data.find(
          (a: Announcement) =>
            (a.active || "").toString().toLowerCase() === "true" ||
            a.active === true,
        );

        if (active && !hasSeen) {
          setAnnouncement(active);
          // Show popup after a short delay for better UX
          const timer = setTimeout(() => setIsOpen(true), 1500);
          return () => clearTimeout(timer);
        }
      })
      .catch(console.error);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Remember that user dismissed it in this session
    sessionStorage.setItem("announcement_seen", "true");
  };

  if (!announcement) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} maxWidth="500px">
      <div style={{ padding: "2.5rem 2rem", textAlign: "center" }}>
        <div className="icon-tile" style={{ margin: "0 auto 1.5rem" }}>
          <Icon name="megaphone" size={28} />
        </div>
        <h2
          style={{
            fontSize: "1.8rem",
            color: "var(--text-primary)",
            marginBottom: "1rem",
            fontWeight: 800,
          }}
        >
          {announcement.title}
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          {announcement.content}
        </p>
        <button
          onClick={handleClose}
          className="btn-primary"
          style={{ width: "100%", padding: "12px", justifyContent: "center" }}
        >
          Got it!
        </button>
      </div>
    </Modal>
  );
}
