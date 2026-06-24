"use client";

import { useState, useEffect } from "react";
import ImageGallery from "@/components/ui/ImageGallery";
import { GridSkeleton } from "@/components/ui/Skeleton";
import { Icon } from "@/components/ui/Icons";
import type { GalleryImage } from "@/lib/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: GalleryImage, b: GalleryImage) => {
          const orderA = a.order == null || String(a.order) === "" ? 999 : Number(a.order);
          const orderB = b.order == null || String(b.order) === "" ? 999 : Number(b.order);
          return (isNaN(orderA) ? 999 : orderA) - (isNaN(orderB) ? 999 : orderB);
        });
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
      <div style={{ background: "var(--subtle-section)", padding: "4rem 0 2rem", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
            Event <span className="accent-text">Gallery</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
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
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            <div className="icon-tile" style={{ margin: "0 auto 1rem" }}>
              <Icon name="image" size={28} />
            </div>
            <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>No images found</h3>
            <p>Check back soon for new event photos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
