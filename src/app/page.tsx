"use client";

import { SITE_CONFIG } from "@/lib/constants";
import ImageSlider from "@/components/ui/ImageSlider";
import AnnouncementPopup from "@/components/ui/AnnouncementBanner";
import type { GalleryImage } from "@/lib/types";

export default function Home() {
  const heroImages: GalleryImage[] = [
    { id: "1", image_url: "/carousel/Career in IT.jpg", title: "Career in IT", order: 1 },
    { id: "2", image_url: "/carousel/Software Testing.jpg", title: "Software Testing", order: 2 },
    { id: "3", image_url: "/carousel/WordpressXReact.jpg", title: "Wordpress x React", order: 3 },
  ];

  return (
    <div>
      <AnnouncementPopup />
      {/* Hero Section */}
      <section style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Image Slider Background */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {heroImages.length > 0 ? (
            <ImageSlider images={heroImages} />
          ) : (
            <>
              <div style={{ position: "absolute", top: "20%", left: "10%", width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, rgba(0,0,0,0) 70%)", borderRadius: "50%", filter: "blur(40px)" }}></div>
              <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(220,38,38,0.1) 0%, rgba(0,0,0,0) 70%)", borderRadius: "50%", filter: "blur(60px)" }}></div>
            </>
          )}
        </div>
        
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="badge badge-blue animate-fadeInUp" style={{ marginBottom: "1.5rem" }}>
            {SITE_CONFIG.name}
          </div>
          <h1 className="animate-fadeInUp delay-100" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
            <span style={{ display: "block", color: "#f1f5f9" }}>Welcome to the</span>
            <span className="gradient-text">Future of Tech</span>
          </h1>
          <p className="animate-fadeInUp delay-200" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "#94a3b8", maxWidth: "600px", margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            {SITE_CONFIG.tagline} We are a community of passionate developers, designers, and innovators at {SITE_CONFIG.fullName}.
          </p>
          <div className="animate-fadeInUp delay-300" style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/join" className="btn-primary" style={{ padding: "12px 32px", fontSize: "1rem" }}>
              Join the Club
            </a>
            <a href="/events" className="btn-secondary" style={{ padding: "12px 32px", fontSize: "1rem" }}>
              Explore Events
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "4rem 0", background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", textAlign: "center" }}>
            {[
              { label: "Active Members", value: `${SITE_CONFIG.stats.members}+` },
              { label: "Events Conducted", value: `${SITE_CONFIG.stats.events}+` },
              { label: "Workshops", value: `${SITE_CONFIG.stats.workshops}+` },
              { label: "Projects Built", value: `${SITE_CONFIG.stats.projects}+` },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: "3rem", fontWeight: 800, color: "#f1f5f9", marginBottom: "0.5rem" }}>{stat.value}</div>
                <div style={{ color: "#60a5fa", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.9rem" }}>{stat.label}</div>
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
              { title: "Hackathons & Competitions", desc: "Test your skills in high-energy coding competitions.", icon: "🏆", link: "/events" },
              { title: "Skill Workshops", desc: "Learn cutting-edge technologies from experts and peers.", icon: "💻", link: "/events" },
              { title: "Resource Library", desc: "Access our curated collection of learning materials.", icon: "📚", link: "/resources" },
            ].map((item, i) => (
              <a key={i} href={item.link} className="glass-card" style={{ padding: "2.5rem", textDecoration: "none", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", transition: "all 0.3s ease" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-10px)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.5)"; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)"; }}>
                <div style={{ fontSize: "3.5rem", marginBottom: "1.5rem" }}>{item.icon}</div>
                <h3 style={{ fontSize: "1.5rem", color: "#f1f5f9", marginBottom: "1rem" }}>{item.title}</h3>
                <p style={{ color: "#94a3b8", lineHeight: 1.6 }}>{item.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
