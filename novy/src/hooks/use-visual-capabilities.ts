"use client";

import { useEffect, useState, useSyncExternalStore, type RefObject } from "react";

const RICH_VISUALS_QUERY = "(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const noServerVisuals = () => false;
const subscribeToHydration = () => () => {};
const clientMounted = () => true;

// A stable SSR snapshot avoids hydration mismatches and a startup frame on touch devices.
export function useHasMounted() {
  return useSyncExternalStore(subscribeToHydration, clientMounted, noServerVisuals);
}

function getRichVisuals() {
  if (typeof window === "undefined") return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return window.matchMedia(RICH_VISUALS_QUERY).matches && !navigator.maxTouchPoints && !connection?.saveData;
}

function subscribeToCapabilities(callback: () => void) {
  const media = window.matchMedia(RICH_VISUALS_QUERY);
  const connection = (navigator as Navigator & { connection?: EventTarget }).connection;
  media.addEventListener("change", callback);
  connection?.addEventListener("change", callback);
  return () => {
    media.removeEventListener("change", callback);
    connection?.removeEventListener("change", callback);
  };
}

export function useRichVisuals() {
  return useSyncExternalStore(subscribeToCapabilities, getRichVisuals, noServerVisuals);
}

function subscribeToVisibility(callback: () => void) {
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

const getVisible = () => !document.hidden;

export function useVisualActivity<T extends Element>(ref: RefObject<T | null>) {
  const richVisuals = useRichVisuals();
  const documentVisible = useSyncExternalStore(subscribeToVisibility, getVisible, noServerVisuals);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return richVisuals && documentVisible && inView;
}
