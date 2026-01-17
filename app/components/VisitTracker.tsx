"use client";

import { useEffect } from "react";

const STORAGE_KEY = "ps_visit_counted";

export default function VisitTracker() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const existing = window.localStorage.getItem(STORAGE_KEY);
    if (existing === today) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, today);
    fetch("/visits", { method: "POST" }).catch(() => {});
  }, []);

  return null;
}
