import { SITE_CONFIG } from "@/lib/constants";

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(to bottom, rgba(6,182,212,0.1), transparent)", padding: "4rem 0 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "#f1f5f9", marginBottom: "1rem" }}>
            About <span className="gradient-text">Us</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Learn about our mission, vision, and what drives us at {SITE_CONFIG.name}.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <section className="glass-card" style={{ padding: "3rem", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", color: "#f1f5f9", marginBottom: "1.5rem" }}>Our Mission</h2>
          <p style={{ color: "#cbd5e1", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            To foster a culture of continuous learning, innovation, and collaboration among students. We aim to bridge the gap between academic curriculum and industry requirements by providing hands-on experience with modern technologies.
          </p>
          
          <h2 style={{ fontSize: "2rem", color: "#f1f5f9", marginBottom: "1.5rem" }}>Our Vision</h2>
          <p style={{ color: "#cbd5e1", fontSize: "1.1rem", lineHeight: 1.8 }}>
            To be the premier technical community that empowers students to become industry-ready professionals, open-source contributors, and successful tech entrepreneurs.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", color: "#f1f5f9", marginBottom: "2rem", textAlign: "center" }}>What We Do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Technical Workshops", desc: "Hands-on sessions on web dev, AI/ML, cloud, and more.", icon: "💻" },
              { title: "Hackathons", desc: "Intense coding competitions to solve real-world problems.", icon: "🚀" },
              { title: "Guest Lectures", desc: "Insights from industry experts and alumni.", icon: "🎙️" },
              { title: "Project Building", desc: "Collaborative development of open-source projects.", icon: "🛠️" },
            ].map((item, i) => (
              <div key={i} className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{item.icon}</div>
                <h3 style={{ fontSize: "1.25rem", color: "#f1f5f9", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "#f1f5f9", marginBottom: "1.5rem" }}>Ready to join us?</h2>
          <p style={{ color: "#cbd5e1", fontSize: "1.1rem", marginBottom: "2rem" }}>
            Whether you're a beginner writing your first "Hello World" or an experienced developer, there's a place for you here.
          </p>
          <a href="/join" className="btn-primary" style={{ padding: "12px 32px", fontSize: "1.1rem" }}>
            Become a Member Today
          </a>
        </section>
      </div>
    </div>
  );
}
