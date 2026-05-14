"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function Modal({ isOpen, onClose, children, maxWidth = "600px" }: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div
        style={{
          background: "#131928",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          width: "100%",
          maxWidth,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          animation: "fadeInUp 0.3s ease",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            width: 32,
            height: 32,
            borderRadius: "8px",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            cursor: "pointer",
            color: "#94a3b8",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.2)";
            (e.currentTarget as HTMLElement).style.color = "#fb7185";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
            (e.currentTarget as HTMLElement).style.color = "#94a3b8";
          }}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
