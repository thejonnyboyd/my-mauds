import { theme } from "../theme";

export function FilterBar({ filter, onFilterChange, distanceFilter, onDistanceChange, shops, visited, userLocation, topOffset = 16 }) {
  const visitedCount = [...visited].length;
  const total = shops.length;
  const percent = Math.round((visitedCount / total) * 100);

  const statusButtons = [
    { value: "all",       label: "All" },
    { value: "unvisited", label: "To visit" },
    { value: "visited",   label: "Visited" },
  ];

  const distanceOptions = [
    { value: null, label: "Any" },
    { value: 5,    label: "5 mi" },
    { value: 10,   label: "10 mi" },
    { value: 20,   label: "20 mi" },
  ];

  return (
    <div style={{
      position: "absolute",
      top: topOffset,
      left: "50%", transform: "translateX(-50%)",
      zIndex: 1000, display: "flex", flexDirection: "column",
      alignItems: "center", gap: 8,
      width: "calc(100% - 32px)", maxWidth: 400,
      pointerEvents: "none",
    }}>

      {/* Progress + filter card */}
      <div style={{
        background: theme.white, borderRadius: 18, padding: "12px 16px",
        boxShadow: "0 2px 16px rgba(0,0,0,0.10)", width: "100%",
        pointerEvents: "auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>
            {visitedCount} of {total} visited
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: theme.coral }}>
            {percent}%
          </span>
        </div>
        <div style={{ background: theme.cream, borderRadius: 999, height: 8, marginBottom: 10 }}>
          <div style={{
            background: theme.coral,
            borderRadius: 999, height: 8,
            width: `${percent}%`,
            transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            minWidth: percent > 0 ? 8 : 0,
          }} />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {statusButtons.map((btn) => (
            <button key={btn.value} onClick={() => onFilterChange(btn.value)} style={{
              flex: 1, padding: "7px 0", borderRadius: 999, border: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 700,
              background: filter === btn.value ? theme.coral : theme.cream,
              color: filter === btn.value ? theme.white : "#999",
              transition: "all 0.15s ease",
            }}>
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Distance filters */}
      {userLocation && (
        <div style={{
          background: theme.white, borderRadius: 999, padding: "4px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          display: "flex", gap: 2, pointerEvents: "auto",
        }}>
          {distanceOptions.map((opt) => (
            <button key={String(opt.value)} onClick={() => onDistanceChange(opt.value)} style={{
              padding: "6px 14px", borderRadius: 999, border: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 700,
              background: distanceFilter === opt.value ? theme.teal : "transparent",
              color: distanceFilter === opt.value ? theme.white : "#999",
              transition: "all 0.15s ease",
            }}>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}