import { MapContainer, TileLayer, Circle } from "react-leaflet";
import { ShopMarker } from "./ShopMarker";
import { getDistanceMiles } from "../utils/distance";
import "leaflet/dist/leaflet.css";

const NI_CENTRE = [54.7877, -6.4923];
const DEFAULT_ZOOM = 9;
const NI_BOUNDS = [
  [53.9, -8.4],
  [55.4, -5.3],
];

export function Map({ shops, visited, onToggleVisited, userLocation }) {
  return (
    <MapContainer
      center={NI_CENTRE}
      zoom={DEFAULT_ZOOM}
      minZoom={8}
      maxBounds={NI_BOUNDS}
      maxBoundsViscosity={1.0}
      style={{ width: "100%", height: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location dot */}
      {userLocation && (
        <Circle
          center={[userLocation.lat, userLocation.lng]}
          radius={300}
          pathOptions={{ color: "#8b5cf6", fillColor: "#8b5cf6", fillOpacity: 0.4 }}
        />
      )}

      {shops.map((shop) => {
        const dist = userLocation
          ? getDistanceMiles(userLocation.lat, userLocation.lng, shop.lat, shop.lng)
          : null;
        return (
          <ShopMarker
            key={shop.id}
            shop={shop}
            isVisited={visited.has(shop.id)}
            onToggleVisited={onToggleVisited}
            distanceMiles={dist}
          />
        );
      })}
    </MapContainer>
  );
}