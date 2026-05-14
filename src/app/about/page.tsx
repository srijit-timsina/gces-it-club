import { SITE_CONFIG } from "@/lib/constants";
import { Icon } from "@/components/ui/Icons";

export default function AboutPage() {
  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div style={{ background: "var(--subtle-section)", padding: "4rem 0 2rem", borderBottom: "1px solid var(--border)", marginBottom: "3rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, color: "var(--text-primary)", marginBottom: "1rem" }}>
            About <span className="accent-text">Us</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Learn about our mission, vision, and what drives us at {SITE_CONFIG.name}.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <section className="glass-card" style={{ padding: "3rem", marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Our Mission</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2rem" }}>
            To foster a culture of continuous learning, innovation, and collaboration among students. We aim to bridge the gap between academic curriculum and industry requirements by providing hands-on experience with modern technologies.
          </p>
          
          <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Our Vision</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.8 }}>
            To be the premier technical community that empowers students to become industry-ready professionals, open-source contributors, and successful tech entrepreneurs.
          </p>
        </section>

        <section style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "2rem", textAlign: "center" }}>What We Do</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Technical Workshops", desc: "Hands-on sessions on web dev, AI/ML, cloud, and more.", icon: "code" },
              { title: "Hackathons", desc: "Intense coding competitions to solve real-world problems.", icon: "award" },
              { title: "Guest Lectures", desc: "Insights from industry experts and alumni.", icon: "mic" },
              { title: "Project Building", desc: "Collaborative development of open-source projects.", icon: "tool" },
            ].map((item, i) => (
              <div key={i} className="glass-card interactive-card" style={{ padding: "2rem", textAlign: "center" }}>
                <div className="icon-tile" style={{ margin: "0 auto 1rem" }}>
                  <Icon name={item.icon} size={26} />
                </div>
                <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{item.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Ready to join us?</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "2rem" }}>
            Whether you&apos;re a beginner writing your first &quot;Hello World&quot; or an experienced developer, there&apos;s a place for you here.
          </p>
          <a href="/join" className="btn-primary" style={{ padding: "12px 32px", fontSize: "1.1rem" }}>
            Become a Member Today
          </a>
        </section>
      </div>
    </div>
  );
}
