"use client";

import { useEffect } from "react";
import { Icon } from "./Icons";

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
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
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
            background: "var(--control-bg)",
            border: "1px solid var(--control-border)",
            cursor: "pointer",
            color: "var(--text-secondary)",
            fontSize: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--danger-bg)";
            (e.currentTarget as HTMLElement).style.color = "#fb7185";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--danger-border)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "var(--control-bg)";
            (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
            (e.currentTarget as HTMLElement).style.borderColor = "var(--control-border)";
          }}
        >
          <Icon name="x" size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
