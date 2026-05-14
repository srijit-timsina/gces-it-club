export function CardSkeleton() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div className="skeleton" style={{ height: "180px", borderRadius: 0 }} />
      <div style={{ padding: "1.25rem" }}>
        <div className="skeleton" style={{ height: "20px", width: "70%", marginBottom: "0.75rem" }} />
        <div className="skeleton" style={{ height: "14px", width: "90%", marginBottom: "0.5rem" }} />
        <div className="skeleton" style={{ height: "14px", width: "75%", marginBottom: "1rem" }} />
        <div className="skeleton" style={{ height: "36px", width: "50%", borderRadius: "8px" }} />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "1.5rem",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "0.75rem",
      }}
    >
      <div className="skeleton" style={{ width: 80, height: 80, borderRadius: "50%" }} />
      <div className="skeleton" style={{ height: "18px", width: "60%", borderRadius: "6px" }} />
      <div className="skeleton" style={{ height: "14px", width: "40%", borderRadius: "6px" }} />
      <div className="skeleton" style={{ height: "12px", width: "70%", borderRadius: "6px" }} />
    </div>
  );
}
