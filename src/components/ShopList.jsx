import { getDistanceMiles } from "../utils/distance";
import { formatVisitDate } from "../hooks/useVisitLog";

export function ShopList({ shops, onLogVisit, onUndoVisit, getVisitCount, getLastVisit, userLocation, isOpen, onClose }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "absolute", inset: 0, zIndex: 1100,
            background: "rgba(0,0,0,0.3)",
          }}
        />
      )}

      {/* Drawer */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1200,
        background: "white", borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.15)",
        transform: isOpen ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
        maxHeight: "65vh", display: "flex", flexDirection: "column",
      }}>
        {/* Handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#d1d5db" }} />
        </div>

        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "8px 20px 12px",
        }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>All Shops ({shops.length})</span>
          <button onClick={onClose} style={{
            background: "#f3f4f6", border: "none", borderRadius: 999,
            width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        {/* List */}
        <div style={{ overflowY: "auto", padding: "0 16px 24px" }}>
          {shops.map((shop) => {
            const visitCount = getVisitCount(shop.id);
            const isVisited = visitCount > 0;
            const dist = userLocation
              ? getDistanceMiles(userLocation.lat, userLocation.lng, shop.lat, shop.lng)
              : null;
            const lastVisit = getLastVisit(shop.id);

            return (
              <div key={shop.id} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 0", borderBottom: "1px solid #f3f4f6",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>{isVisited ? "✅" : "🍦"}</span>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 14, color: isVisited ? "#22c55e" : "#111827" }}>
                      {shop.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>
                      {shop.town}{dist != null ? ` · ${dist.toFixed(1)} mi` : ""}
                    </p>
                    {isVisited && (
                      <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                        {visitCount} stamp{visitCount === 1 ? "" : "s"}
                        {lastVisit ? ` · last ${formatVisitDate(lastVisit)}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <button onClick={() => onLogVisit(shop.id)} style={{
                    padding: "5px 12px", borderRadius: 8, border: "none",
                    cursor: "pointer", fontSize: 12, fontWeight: 600,
                    background: "#dcfce7", color: "#16a34a",
                    whiteSpace: "nowrap",
                  }}>
                    + Stamp
                  </button>
                  {isVisited && (
                    <button onClick={() => onUndoVisit(shop.id)} style={{
                      padding: 0, border: "none", background: "transparent",
                      cursor: "pointer", fontSize: 11, fontWeight: 600,
                      color: "#9ca3af", whiteSpace: "nowrap",
                    }}>
                      Undo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={isOpen ? onClose : () => {}}
        style={{ display: "none" }}
      />
    </>
  );
}