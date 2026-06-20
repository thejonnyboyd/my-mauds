import { useState, useRef, useEffect } from "react";
import { Map } from "./components/Map";
import { FilterBar } from "./components/FilterBar";
import { ShopList } from "./components/ShopList";
import { useVisited } from "./hooks/useVisited";
import { useUserLocation } from "./hooks/useUserLocation";
import { getDistanceMiles } from "./utils/distance";
import { theme } from "./theme";
import logo from "./assets/mymauds-logo.png";
import shops from "./data/shops.json";

export default function App() {
  const { visited, toggleVisited } = useVisited();
  const { location: userLocation } = useUserLocation();
  const [filter, setFilter] = useState("all");
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [listOpen, setListOpen] = useState(false);

  const awningRef = useRef(null);
  const [awningHeight, setAwningHeight] = useState(100);

  useEffect(() => {
    if (awningRef.current) {
      setAwningHeight(awningRef.current.offsetHeight);
    }
  }, []);

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
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100vw", height: "100vh",
      overflow: "hidden",
    }}>

      {/* Map — full screen, sits behind everything */}
      <div style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
      }}>
        <Map
          shops={filteredShops}
          visited={visited}
          onToggleVisited={toggleVisited}
          userLocation={userLocation}
          topPadding={awningHeight + 120}
        />
      </div>

      {/* Awning — centred, drops from top */}
      <div
      ref={awningRef}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1100,
        borderRadius: "0 0 20px 20px",
        overflow: "hidden",
        lineHeight: 0,
      }}
    >
      <img
        src={logo}
        alt="My Mauds"
        style={{ height: 150, width: "auto", display: "block", marginTop: -40 }}
      />
    </div>

      {/* Filter bar — floats below the awning with a gap */}
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        distanceFilter={distanceFilter}
        onDistanceChange={setDistanceFilter}
        shops={shops}
        visited={visited}
        userLocation={userLocation}
        topOffset={awningHeight + 12}
      />

      {/* All Shops button */}
      <button
        onClick={() => setListOpen(true)}
        style={{
          position: "absolute", bottom: 24, right: 16, zIndex: 1000,
          background: theme.teal, color: "white", border: "none",
          borderRadius: 14, padding: "12px 20px",
          fontWeight: 700, fontSize: 14, cursor: "pointer",
          boxShadow: "0 4px 16px rgba(42,157,143,0.35)",
          letterSpacing: "-0.2px",
        }}
      >
        All Shops
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