"use client";

import { useEffect } from "react";
import styles from "./novyx-scroll-reveal.module.css";

export function NovyxScrollReveal() {
  useEffect(() => {
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const root = document.querySelector("[data-novyx-scroll-root]");
    if (!root) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-novyx-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove(styles.pending);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );

    for (const section of sections) {
      if (section.getBoundingClientRect().top > window.innerHeight * 0.9) {
        section.classList.add(styles.reveal, styles.pending);
        observer.observe(section);
      }
    }

    return () => {
      observer.disconnect();
      for (const section of sections) {
        section.classList.remove(styles.reveal, styles.pending);
      }
    };
  }, []);

  return null;
}
