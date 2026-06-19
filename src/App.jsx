import { useState } from "react";
import { Map } from "./components/Map";
import { FilterBar } from "./components/FilterBar";
import { ShopList } from "./components/ShopList";
import { useVisited } from "./hooks/useVisited";
import { useUserLocation } from "./hooks/useUserLocation";
import { getDistanceMiles } from "./utils/distance";
import shops from "./data/shops.json";

export default function App() {
  const { visited, toggleVisited } = useVisited();
  const { location: userLocation } = useUserLocation();
  const [filter, setFilter] = useState("all");
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [listOpen, setListOpen] = useState(false);

  const filteredShops = shops.filter((shop) => {
    if (filter === "visited" && !visited.has(shop.id)) return false;
    if (filter === "unvisited" && visited.has(shop.id)) return false;
    if (distanceFilter != null && userLocation) {
      const d = getDistanceMiles(userLocation.lat, userLocation.lng, shop.lat, shop.lng);
      if (d > distanceFilter) return false;
    }
    return true;
  });

  return (
    <div style={{ position: "relative", width: "100vw", height: "100dvh" }}>

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        distanceFilter={distanceFilter}
        onDistanceChange={setDistanceFilter}
        shops={shops}
        visited={visited}
        userLocation={userLocation}
      />

      <Map
        shops={filteredShops}
        visited={visited}
        onToggleVisited={toggleVisited}
        userLocation={userLocation}
      />

      {/* List drawer toggle button */}
      <button
        onClick={() => setListOpen(true)}
        style={{
          position: "absolute", bottom: 24, right: 16, zIndex: 1000,
          background: "#3b82f6", color: "white", border: "none",
          borderRadius: 16, padding: "12px 20px",
          fontWeight: 700, fontSize: 14, cursor: "pointer",
          boxShadow: "0 4px 12px rgba(59,130,246,0.4)",
        }}
      >
        ☰ All Shops
      </button>

      <ShopList
        shops={filteredShops}
        visited={visited}
        onToggleVisited={toggleVisited}
        userLocation={userLocation}
        isOpen={listOpen}
        onClose={() => setListOpen(false)}
      />
    </div>
  );
}