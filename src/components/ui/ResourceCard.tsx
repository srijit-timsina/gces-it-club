import type { Resource } from "@/lib/types";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const getTagBadge = (tag: string) => {
    const t = tag.trim().toLowerCase();
    if (t.includes('react') || t.includes('frontend')) return 'badge-cyan';
    if (t.includes('next') || t.includes('backend')) return 'badge-rose';
    if (t.includes('python') || t.includes('ml')) return 'badge-amber';
    if (t.includes('dsa') || t.includes('algo')) return 'badge-purple';
    if (t.includes('git')) return 'badge-blue';
    return 'badge-green';
  };

  const getIcon = (type: string) => {
    switch ((type || "").toLowerCase()) {
      case 'tutorial': return '📺';
      case 'docs': return '📚';
      case 'code': return '💻';
      case 'github': return '🐙';
      default: return '🔗';
    }
  };

  const tags = resource.tags ? resource.tags.split(',').map(t => t.trim()) : [];

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card"
      style={{
        padding: "1.5rem",
        textDecoration: "none",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.3)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            flexShrink: 0,
          }}
        >
          {getIcon(resource.type)}
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", color: "#f1f5f9", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
            {resource.title}
            <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>↗</span>
          </h3>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#94a3b8" }}>
            {resource.type}
          </span>
        </div>
      </div>

      <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.6, flexGrow: 1, marginBottom: "1.5rem" }}>
        {resource.description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map((tag, i) => (
          <span key={i} className={`badge ${getTagBadge(tag)}`}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}
