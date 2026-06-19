import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

function createIceCreamIcon(isVisited) {
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;align-items:center;justify-content:center;
        width:38px;height:38px;
        border-radius:50% 50% 50% 0;transform:rotate(-45deg);
        background:${isVisited ? "#22c55e" : "#3b82f6"};
        border:3px solid white;
        box-shadow:0 2px 8px rgba(0,0,0,0.25);
      ">
        <span style="transform:rotate(45deg);font-size:18px;line-height:1;">🍦</span>
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40],
  });
}

export function ShopMarker({ shop, isVisited, onToggleVisited, distanceMiles }) {
  return (
    <Marker position={[shop.lat, shop.lng]} icon={createIceCreamIcon(isVisited)}>
      <Popup>
        <div style={{ minWidth: "180px", fontFamily: "inherit" }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{shop.name}</p>
          <p style={{ color: "#6b7280", fontSize: 12, marginBottom: 4 }}>{shop.address}</p>
          {distanceMiles != null && (
            <p style={{ color: "#3b82f6", fontSize: 12, marginBottom: 8 }}>
              📍 {distanceMiles.toFixed(1)} miles away
            </p>
          )}
          {isVisited && (
            <p style={{ color: "#22c55e", fontSize: 12, marginBottom: 8 }}>✓ Visited</p>
          )}
          <button
            onClick={() => onToggleVisited(shop.id)}
            style={{
              width: "100%", padding: "7px 0", borderRadius: 8,
              border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              background: isVisited ? "#fee2e2" : "#dcfce7",
              color: isVisited ? "#dc2626" : "#16a34a",
            }}
          >
            {isVisited ? "✗ Remove visit" : "✓ Mark as visited"}
          </button>
        </div>
      </Popup>
    </Marker>
  );
}