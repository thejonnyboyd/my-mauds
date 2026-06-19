import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { theme } from "../theme";

function createIceCreamIcon(isVisited) {
  const bg = isVisited ? theme.visited : theme.unvisited;
  return L.divIcon({
    className: "",
    html: `
      <div style="
        display:flex;align-items:center;justify-content:center;
        width:36px;height:36px;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        background:${bg};
        border:3px solid white;
        box-shadow:0 3px 10px rgba(0,0,0,0.2);
      ">
        <span style="transform:rotate(45deg);font-size:17px;line-height:1;">🍦</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -42],
  });
}

export function ShopMarker({ shop, isVisited, onToggleVisited, distanceMiles }) {
  return (
    <Marker position={[shop.lat, shop.lng]} icon={createIceCreamIcon(isVisited)}>
      <Popup>
        <div style={{ minWidth: "175px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
          <p style={{ fontWeight: 700, fontSize: 14, color: "#1a1a1a", marginBottom: 2 }}>
            {shop.name}
          </p>
          <p style={{ color: "#bbb", fontSize: 12, marginBottom: 6 }}>
            {shop.address}
          </p>
          {distanceMiles != null && (
            <p style={{ fontSize: 12, color: theme.teal, marginBottom: 6, fontWeight: 600 }}>
              {distanceMiles.toFixed(1)} miles away
            </p>
          )}
          {isVisited && (
            <p style={{ fontSize: 12, color: theme.teal, marginBottom: 8, fontWeight: 600 }}>
              You've been here!
            </p>
          )}
          <button
            onClick={() => onToggleVisited(shop.id)}
            style={{
              width: "100%", padding: "8px 0", borderRadius: 10,
              border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13,
              background: isVisited ? "#fef2f2" : "#eafaf1",
              color: isVisited ? theme.coral : theme.teal,
              transition: "opacity 0.15s",
            }}
          >
            {isVisited ? "Remove visit" : "Mark as visited"}
          </button>
        </div>
      </Popup>
    </Marker>
  );
}