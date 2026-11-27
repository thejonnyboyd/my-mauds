import { useState, useEffect, useMemo } from "react";

// The visit log is the single source of truth: every entry is one stamp.
// Shape: { [shopId]: [{ visitedAt: ISO string | null }, ...] }
const STORAGE_KEY = "mauds_visit_log";

// Before the loyalty-card change, "visited" was a separate on/off list and the
// log could hold leftover entries for shops that had since been un-marked.
const LEGACY_VISITED_KEY = "mauds_visited";

function readJSON(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function loadLog() {
  const log = readJSON(STORAGE_KEY, {});
  const legacyVisited = readJSON(LEGACY_VISITED_KEY, null);
  if (!Array.isArray(legacyVisited)) return log;

  // Migrate: one stamp per shop that was still marked visited, keeping its
  // latest date. Repeat visits weren't possible before, so extra entries were
  // only ever from toggling off and on again.
  const migrated = {};
  for (const shopId of legacyVisited) {
    const entries = log[shopId] ?? [];
    migrated[shopId] = entries.length > 0
      ? [entries[entries.length - 1]]
      : [{ visitedAt: null }];
  }
  return migrated;
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
    localStorage.removeItem(LEGACY_VISITED_KEY);
  }, [visitLog]);

  // Shops with at least one stamp. JSON keys are strings, shop ids are numbers.
  const visited = useMemo(
    () => new Set(
      Object.keys(visitLog)
        .filter((id) => visitLog[id].length > 0)
        .map(Number)
    ),
    [visitLog]
  );

  const totalStamps = useMemo(
    () => Object.values(visitLog).reduce((sum, entries) => sum + entries.length, 0),
    [visitLog]
  );

  const logVisit = (shopId) => {
    setVisitLog((prev) => ({
      ...prev,
      [shopId]: [...(prev[shopId] ?? []), { visitedAt: new Date().toISOString() }],
    }));
  };

  const undoLastVisit = (shopId) => {
    setVisitLog((prev) => {
      const entries = prev[shopId] ?? [];
      if (entries.length === 0) return prev;
      const next = { ...prev };
      if (entries.length === 1) delete next[shopId];
      else next[shopId] = entries.slice(0, -1);
      return next;
    });
  };

  const getVisitCount = (shopId) => visitLog[shopId]?.length ?? 0;

  const getLastVisit = (shopId) => {
    const entries = visitLog[shopId];
    if (!entries || entries.length === 0) return null;
    return entries[entries.length - 1].visitedAt;
  };

  return { visitLog, visited, totalStamps, logVisit, undoLastVisit, getVisitCount, getLastVisit };
}
