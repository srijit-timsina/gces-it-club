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
    <div className="hero-slider">
      {images.map((img, idx) => (
        <div
          key={img.id}
          className={`hero-slide ${idx === currentIndex ? "is-active" : ""}`}
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
          <div className="hero-slide-overlay" />
        </div>
      ))}

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="slider-control slider-control--prev"
            aria-label="Previous slide"
          >
            <Icon name="arrow-left" size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="slider-control slider-control--next"
            aria-label="Next slide"
          >
            <Icon name="arrow-right" size={22} />
          </button>

          {/* Dots Indicator */}
          <div className="slider-dots">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`slider-dot ${idx === currentIndex ? "is-active" : ""}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
