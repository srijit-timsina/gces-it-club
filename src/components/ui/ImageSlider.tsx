"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/types";
import { Icon } from "./Icons";

export default function ImageSlider({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, images.length));
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [images, nextSlide]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {images.map((img, idx) => (
        <div
          key={img.id}
          style={{
            position: "absolute",
            inset: 0,
            opacity: idx === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            zIndex: idx === currentIndex ? 1 : 0,
          }}
        >
          {img.image_url ? (
             <Image
              src={img.image_url}
              alt={img.title || `Slide ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
              priority={idx === 0}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", opacity: 0.2 }}>
              <Icon name="image" size={56} />
            </div>
          )}
          {/* Overlay for text readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--hero-overlay)",
            }}
          />
        </div>
      ))}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: "absolute",
              left: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)";
            }}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute",
              right: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "white",
              width: 48,
              height: 48,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              backdropFilter: "blur(4px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-50%) scale(1)";
            }}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>

          {/* Dots Indicator */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.5rem",
              zIndex: 10,
            }}
          >
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: idx === currentIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: idx === currentIndex ? "var(--accent-primary)" : "rgba(255,255,255,0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
