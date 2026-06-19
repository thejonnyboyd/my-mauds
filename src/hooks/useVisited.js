import { useState, useEffect } from "react";

const STORAGE_KEY = "mauds_visited";

export function useVisited() {
  const [visited, setVisited] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
  }, [visited]);

  const toggleVisited = (shopId) => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.has(shopId) ? next.delete(shopId) : next.add(shopId);
      return next;
    });
  };

  const isVisited = (shopId) => visited.has(shopId);

  return { visited, toggleVisited, isVisited };
}