"use client";

import { useState, useEffect } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import { GridSkeleton } from "@/components/ui/Skeleton";
import type { GalleryImage } from "@/lib/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: GalleryImage, b: GalleryImage) => (Number(a.order) || 999) - (Number(b.order) || 999));
        setImages(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(to bottom, rgba(244,63,94,0.1), transparent)", padding: "4rem 0 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: "1rem" }}>
            Event <span className="gradient-text">Gallery</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Memories and highlights from our past events, workshops, and hackathons.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        {loading ? (
          <GridSkeleton count={8} />
        ) : images.length > 0 ? (
          <ImageGallery images={images} />
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "#64748b" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📷</div>
            <h3 style={{ fontSize: "1.2rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>No images found</h3>
            <p>Check back soon for new event photos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
