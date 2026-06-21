import { useEffect } from "react";
import { MapContainer, TileLayer, Circle, useMap } from "react-leaflet";
import { ShopMarker } from "./ShopMarker";
import { getDistanceMiles } from "../utils/distance";
import "leaflet/dist/leaflet.css";

const NI_CENTRE = [54.7877, -6.4923];
const DEFAULT_ZOOM = 9;
const NI_BOUNDS = [
  [53.7, -8.6],
  [55.9, -4.8],
];

function ViewPadder({ topPadding }) {
  const map = useMap();
  useEffect(() => {
    if (topPadding > 0) {
      map.panBy([0, topPadding / 2], { animate: false });
    }
  }, []);
  return null;
}

export function Map({ shops, visited, onToggleVisited, getLastVisit, userLocation, topPadding = 0 }) {
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
      <ViewPadder topPadding={topPadding} />

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
            lastVisit={getLastVisit ? getLastVisit(shop.id) : null}
          />
        );
      })}
    </MapContainer>
  );
}