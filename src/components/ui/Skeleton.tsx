export function CardSkeleton() {
  return (
    <div
      className="skeleton-card"
      aria-hidden="true"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="skeleton" style={{ height: "180px", borderRadius: 0 }} />
      <div style={{ padding: "1.25rem" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
          <div className="skeleton" style={{ height: "22px", width: "82px", borderRadius: "999px" }} />
          <div className="skeleton" style={{ height: "22px", width: "58px", borderRadius: "999px" }} />
        </div>
        <div className="skeleton" style={{ height: "22px", width: "72%", marginBottom: "0.85rem" }} />
        <div className="skeleton" style={{ height: "14px", width: "90%", marginBottom: "0.5rem" }} />
        <div className="skeleton" style={{ height: "14px", width: "78%", marginBottom: "1.2rem" }} />
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="skeleton" style={{ height: "38px", width: "48%", borderRadius: "10px" }} />
          <div className="skeleton" style={{ height: "36px", width: "36px", borderRadius: "50%" }} />
        </div>
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
        <div key={i} style={{ animationDelay: `${i * 0.05}s` }}>
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function TeamCardSkeleton() {
  return (
    <div
      className="skeleton-card"
      aria-hidden="true"
      style={{
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
