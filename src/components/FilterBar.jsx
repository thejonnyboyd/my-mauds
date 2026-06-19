export function FilterBar({ filter, onFilterChange, distanceFilter, onDistanceChange, shops, visited, userLocation }) {
  const visitedCount = [...visited].length;
  const total = shops.length;
  const percent = Math.round((visitedCount / total) * 100);

  const statusButtons = [
    { value: "all", label: "All" },
    { value: "unvisited", label: "To visit" },
    { value: "visited", label: "Visited" },
  ];

  const distanceOptions = [
    { value: null, label: "Any distance" },
    { value: 5, label: "5 mi" },
    { value: 10, label: "10 mi" },
    { value: 20, label: "20 mi" },
  ];

  return (
    <div style={{
      position: "absolute", top: 16, left: "50%", transform: "translateX(-50%)",
      zIndex: 1000, display: "flex", flexDirection: "column",
      alignItems: "center", gap: 8, width: "calc(100% - 32px)", maxWidth: 400,
      pointerEvents: "none",
    }}>

      {/* Progress bar */}
      <div style={{
        background: "white", borderRadius: 12, padding: "10px 16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)", width: "100%", pointerEvents: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>🍦 Maud's Tracker</span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>{visitedCount}/{total} visited</span>
        </div>
        <div style={{ background: "#e5e7eb", borderRadius: 999, height: 8 }}>
          <div style={{
            background: "linear-gradient(90deg, #3b82f6, #22c55e)",
            borderRadius: 999, height: 8,
            width: `${percent}%`, transition: "width 0.4s ease",
          }} />
        </div>
      </div>

      {/* Status filter */}
      <div style={{
        background: "white", borderRadius: 999, padding: 4,
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        display: "flex", gap: 4, pointerEvents: "auto",
      }}>
        {statusButtons.map((btn) => (
          <button key={btn.value} onClick={() => onFilterChange(btn.value)} style={{
            padding: "6px 16px", borderRadius: 999, border: "none",
            cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: filter === btn.value ? "#3b82f6" : "transparent",
            color: filter === btn.value ? "white" : "#6b7280",
            transition: "all 0.15s",
          }}>
            {btn.label}
          </button>
        ))}
      </div>

      {/* Distance filter — only shown if we have location */}
      {userLocation && (
        <div style={{
          background: "white", borderRadius: 999, padding: 4,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
          display: "flex", gap: 4, pointerEvents: "auto",
        }}>
          {distanceOptions.map((opt) => (
            <button key={opt.value} onClick={() => onDistanceChange(opt.value)} style={{
              padding: "6px 14px", borderRadius: 999, border: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: distanceFilter === opt.value ? "#8b5cf6" : "transparent",
              color: distanceFilter === opt.value ? "white" : "#6b7280",
              transition: "all 0.15s",
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}