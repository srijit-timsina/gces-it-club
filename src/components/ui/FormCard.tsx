"use client";

import { useState } from "react";
import type { FormEntry } from "@/lib/types";
import Modal from "./Modal";
import { Icon } from "./Icons";

export default function FormCard({ form }: { form: FormEntry }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Attempt to convert Google Form link to embed link
  const embedUrl = form.form_url?.includes('docs.google.com/forms') 
    ? (form.form_url.includes('/viewform') ? form.form_url : form.form_url + '/viewform') + '?embedded=true'
    : null;

  return (
    <>
      <div
        className="glass-card"
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              background: "var(--accent-soft)",
              border: "1px solid rgba(34, 85, 153,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <Icon name="file-text" size={24} />
          </div>
          <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", fontWeight: 700 }}>
            {form.form_name}
          </h3>
        </div>

        <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, flexGrow: 1, marginBottom: "1.5rem" }}>
          {form.description}
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          {embedUrl ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Open Form
            </button>
          ) : (
            <a
              href={form.form_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ flex: 1, justifyContent: "center" }}
            >
              Open Form <Icon name="external-link" size={16} />
            </a>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="800px">
        <div style={{ padding: "1rem", height: "80vh", display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1rem", padding: "0 1rem" }}>{form.form_name}</h2>
          <div style={{ flexGrow: 1, background: "#fff", borderRadius: "8px", overflow: "hidden" }}>
            {embedUrl && (
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title={form.form_name}
              >
                Loading…
              </iframe>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}
