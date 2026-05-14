import type { Resource } from "@/lib/types";
import { Icon } from "./Icons";

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
      case 'tutorial': return 'video';
      case 'docs': return 'book';
      case 'code': return 'code';
      case 'github': return 'github';
      default: return 'link';
    }
  };

  const tags = resource.tags ? resource.tags.split(',').map(t => t.trim()) : [];

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="glass-card interactive-card"
      style={{
        padding: "1.5rem",
        textDecoration: "none",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "12px",
            background: "var(--accent-soft)",
            border: "1px solid var(--border-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: "var(--accent-primary)",
          }}
        >
          <Icon name={getIcon(resource.type)} size={24} />
        </div>
        <div>
          <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "0.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
            {resource.title}
            <Icon name="external-link" size={14} style={{ opacity: 0.5 }} />
          </h3>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)" }}>
            {resource.type}
          </span>
        </div>
      </div>

      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6, flexGrow: 1, marginBottom: "1.5rem" }}>
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
