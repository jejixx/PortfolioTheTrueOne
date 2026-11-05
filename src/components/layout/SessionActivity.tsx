"use client";

import { useEffect, useRef } from "react";
import { refreshSessionActivity } from "@/app/actions/auth";

const ACTIVITY_THROTTLE_MS = 60 * 1000;

export function SessionActivity() {
  const lastRefresh = useRef(0);

  useEffect(() => {
    const refresh = () => {
      const now = Date.now();

      if (now - lastRefresh.current < ACTIVITY_THROTTLE_MS) {
        return;
      }

      lastRefresh.current = now;
      void refreshSessionActivity();
    };

    refresh();
    const events = ["click", "keydown", "scroll", "touchstart"];
    events.forEach((event) => window.addEventListener(event, refresh));

    return () => {
      events.forEach((event) => window.removeEventListener(event, refresh));
    };
  }, []);

  return null;
}
