"use client";

import { useState, useEffect } from "react";
import FormCard from "@/components/ui/FormCard";
import { GridSkeleton } from "@/components/ui/Skeleton";
import type { FormEntry } from "@/lib/types";

export default function JoinPage() {
  const [forms, setForms] = useState<FormEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/forms")
      .then((res) => res.json())
      .then((data) => {
        // Only show active forms
        const activeForms = data.filter((f: FormEntry) => (f.active || "").toLowerCase() === 'true');
        setForms(activeForms);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(to bottom, rgba(245,158,11,0.1), transparent)", padding: "4rem 0 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: "1rem" }}>
            Join <span className="gradient-text">Us</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Register for memberships, events, or share your feedback with us.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        {loading ? (
          <GridSkeleton count={4} />
        ) : forms.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "2rem" }}>
            {forms.map((form) => (
              <FormCard key={form.id} form={form} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#64748b" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📋</div>
            <h3 style={{ fontSize: "1.2rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>No active forms</h3>
            <p>There are currently no active registrations or forms.</p>
          </div>
        )}

        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "1.8rem", color: "#f1f5f9", marginBottom: "1.5rem" }}>Why Join the Club?</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
            {[
              "Access to exclusive workshops",
              "Networking with peers and alumni",
              "Mentorship opportunities",
              "Certificate of participation",
            ].map((benefit, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "1rem 2rem", borderRadius: "99px", color: "#e2e8f0", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ color: "#10b981" }}>✓</span> {benefit}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
