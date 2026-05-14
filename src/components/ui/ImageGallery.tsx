"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      const currentIndex = images.findIndex(img => img.id === selectedImage.id);
      
      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        if (currentIndex < images.length - 1) setSelectedImage(images[currentIndex + 1]);
      } else if (e.key === "ArrowLeft") {
        if (currentIndex > 0) setSelectedImage(images[currentIndex - 1]);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage, images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {images.map((img) => (
          <div
            key={img.id}
            className="glass-card"
            style={{
              position: "relative",
              aspectRatio: "4/3",
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: "16px",
            }}
            onClick={() => setSelectedImage(img)}
            onMouseEnter={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const image = e.currentTarget.querySelector('img');
              if (overlay) overlay.style.opacity = "1";
              if (image) image.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              const overlay = e.currentTarget.querySelector('.overlay') as HTMLElement;
              const image = e.currentTarget.querySelector('img');
              if (overlay) overlay.style.opacity = "0";
              if (image) image.style.transform = "scale(1)";
            }}
          >
            {img.image_url ? (
              <Image
                src={img.image_url}
                alt={img.title || "Gallery Image"}
                fill
                style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div style={{ width: "100%", height: "100%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "3rem", opacity: 0.2 }}>📷</span>
              </div>
            )}
            
            <div
              className="overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                opacity: 0,
                transition: "opacity 0.3s ease",
                display: "flex",
                alignItems: "flex-end",
                padding: "1.5rem",
              }}
            >
              <p style={{ color: "#fff", fontWeight: 500, margin: 0 }}>{img.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.9)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "1.5rem", zIndex: 1 }}>
            <div style={{ color: "#fff", fontSize: "1.1rem" }}>
              {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              style={{ background: "none", border: "none", color: "#fff", fontSize: "1.5rem", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>

          {/* Main Image */}
          <div style={{ flexGrow: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4rem" }}>
            {selectedImage.image_url ? (
              <img
                src={selectedImage.image_url}
                alt={selectedImage.title}
                style={{ maxHeight: "80vh", maxWidth: "100%", objectFit: "contain" }}
              />
            ) : (
              <div style={{ fontSize: "5rem" }}>📷</div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = images.findIndex(img => img.id === selectedImage.id);
                if (idx > 0) setSelectedImage(images[idx - 1]);
              }}
              style={{
                position: "absolute",
                left: "1rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: images.findIndex(img => img.id === selectedImage.id) === 0 ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              ←
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const idx = images.findIndex(img => img.id === selectedImage.id);
                if (idx < images.length - 1) setSelectedImage(images[idx + 1]);
              }}
              style={{
                position: "absolute",
                right: "1rem",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                width: 48,
                height: 48,
                borderRadius: "50%",
                cursor: "pointer",
                display: images.findIndex(img => img.id === selectedImage.id) === images.length - 1 ? "none" : "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
              }}
            >
              →
            </button>
          </div>

          {/* Caption */}
          <div style={{ padding: "1.5rem", textAlign: "center", color: "#fff", zIndex: 1 }}>
            {selectedImage.title}
          </div>
        </div>
      )}
    </>
  );
}
