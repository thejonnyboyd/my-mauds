import { useState, useEffect } from "react";

const STORAGE_KEY = "mauds_visit_log";

function loadLog() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function formatVisitDate(isoString) {
  return new Date(isoString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function useVisitLog() {
  const [visitLog, setVisitLog] = useState(loadLog);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitLog));
  }, [visitLog]);

  const logVisit = (shopId) => {
    setVisitLog((prev) => {
      const entries = prev[shopId] ?? [];
      return {
        ...prev,
        [shopId]: [...entries, { visitedAt: new Date().toISOString() }],
      };
    });
  };

  const getLastVisit = (shopId) => {
    const entries = visitLog[shopId];
    if (!entries || entries.length === 0) return null;
    return entries[entries.length - 1].visitedAt;
  };

  return { visitLog, logVisit, getLastVisit };
}
