"use client";

import { SITE_CONFIG } from "@/lib/constants";
import ImageSlider from "@/components/ui/ImageSlider";
import AnnouncementPopup from "@/components/ui/AnnouncementBanner";
import { Icon } from "@/components/ui/Icons";
import CountUp from "@/components/ui/CountUp";
import FloatingCodeIcons from "@/components/ui/FloatingCodeIcons";
import type { GalleryImage } from "@/lib/types";

export default function Home() {
  const heroImages: GalleryImage[] = [
    { id: "1", image_url: "/Carousel/Career in IT.jpg", title: "Career in IT", order: 1 },
    { id: "2", image_url: "/Carousel/Software Testing.jpg", title: "Software Testing", order: 2 },
    { id: "3", image_url: "/Carousel/WordpressXReact.jpg", title: "Wordpress x React", order: 3 },
  ];

  return (
    <div>
      <AnnouncementPopup />
      {/* Hero Section */}
      <section style={{ height: "100svh", minHeight: "680px", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#07101f" }}>
        {/* Image Slider Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {heroImages.length > 0 ? (
            <ImageSlider images={heroImages} />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "rgba(10,14,26,0.92)" }} />
          )}
        </div>

        <FloatingCodeIcons />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 3, textAlign: "center" }}>
          <div className="badge badge-blue animate-fadeInUp" style={{ marginBottom: "1.5rem", color: "#dbeafe", borderColor: "rgba(255,255,255,0.24)", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)" }}>
            {SITE_CONFIG.name}
          </div>
          <h1 className="animate-fadeInUp delay-100" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, marginBottom: "1.5rem", letterSpacing: 0 }}>
            <span style={{ display: "block", color: "#f8fafc" }}>Welcome to the</span>
            <span style={{ color: "#7dd3fc" }}>Future of Tech</span>
          </h1>
          <p className="animate-fadeInUp delay-200" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#dbeafe", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            {SITE_CONFIG.tagline} We are a community of passionate developers, designers, and innovators at {SITE_CONFIG.fullName}.
          </p>
          <div className="animate-fadeInUp delay-300" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/join" className="btn-primary" style={{ padding: "12px 32px", fontSize: "1rem" }}>
              Join the Club <Icon name="arrow-right" size={18} />
            </a>
            <a href="/events" className="btn-secondary" style={{ padding: "12px 32px", fontSize: "1rem", color: "#ffffff", borderColor: "rgba(255,255,255,0.32)", background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)" }}>
              <Icon name="calendar" size={18} /> Explore Events
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "4rem 0", background: "var(--subtle-section)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {[
              { label: "Active Members", value: SITE_CONFIG.stats.members, icon: "users" },
              { label: "Events Conducted", value: SITE_CONFIG.stats.events, icon: "calendar" },
              { label: "Workshops", value: SITE_CONFIG.stats.workshops, icon: "code" },
              { label: "Projects Built", value: SITE_CONFIG.stats.projects, icon: "github" },
            ].map((stat, i) => (
              <div key={i} className="animate-count" style={{ animationDelay: `${i * 0.12}s` }}>
                <div className="icon-tile" style={{ marginBottom: "1rem" }}>
                  <Icon name={stat.icon} size={24} />
                </div>
                <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  <CountUp value={stat.value} suffix="+" />
                </div>
                <div style={{ color: "var(--accent-primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.9rem" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access / Teaser */}
      <section style={{ padding: "8rem 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">What We Do</h2>
            <p className="section-subtitle">Discover how we help students grow and succeed in tech.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            {[
              { title: "Hackathons & Competitions", desc: "Test your skills in high-energy coding competitions.", icon: "award", link: "/events" },
              { title: "Skill Workshops", desc: "Learn cutting-edge technologies from experts and peers.", icon: "code", link: "/events" },
              { title: "Resource Library", desc: "Access our curated collection of learning materials.", icon: "book", link: "/resources" },
            ].map((item, i) => (
              <a key={i} href={item.link} className="glass-card interactive-card" style={{ padding: "2.5rem", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div className="icon-tile" style={{ marginBottom: "1.5rem" }}>
                  <Icon name={item.icon} size={28} />
                </div>
                <h3 style={{ fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1rem" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
