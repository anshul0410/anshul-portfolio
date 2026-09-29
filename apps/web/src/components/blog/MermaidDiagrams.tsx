"use client";

import { useEffect } from "react";

// Brand colours from globals.css (the dark theme is the only theme).
const THEME_VARIABLES = {
  darkMode: true,
  background: "#0e1322",
  fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  fontSize: "15px",
  primaryColor: "#151b2e",
  primaryTextColor: "#eef1f8",
  primaryBorderColor: "#6366f1",
  secondaryColor: "#1b1f4b",
  tertiaryColor: "#0e1322",
  lineColor: "#8e97ad",
  textColor: "#eef1f8",
  noteBkgColor: "#1e1b4b",
  noteTextColor: "#eef1f8",
  noteBorderColor: "#818cf8",
  actorBkg: "#151b2e",
  actorBorder: "#6366f1",
  actorTextColor: "#eef1f8",
  signalColor: "#a5b4fc",
  signalTextColor: "#eef1f8",
  labelBoxBkgColor: "#151b2e",
  labelBoxBorderColor: "#232b45",
  clusterBkg: "#0e1322",
  clusterBorder: "#232b45",
  edgeLabelBackground: "#0e1322",
};

/**
 * Renders every `.mermaid-diagram` in the article. Mermaid is large, so it is
 * only downloaded when a diagram is about to scroll into view.
 */
export function MermaidDiagrams() {
  useEffect(() => {
    const figures = [...document.querySelectorAll<HTMLElement>(".mermaid-diagram:not([data-rendered])")];
    if (figures.length === 0) return;

    let cancelled = false;
    let mermaidPromise: Promise<typeof import("mermaid").default> | undefined;
    const loadMermaid = () =>
      (mermaidPromise ??= import("mermaid").then(({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: THEME_VARIABLES,
          securityLevel: "strict",
          // Draw at natural size; the figure scrolls sideways if it's wider than the screen,
          // instead of shrinking labels to an unreadable size.
          flowchart: { useMaxWidth: false },
          sequence: { useMaxWidth: false },
        });
        return mermaid;
      }));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const figure = entry.target as HTMLElement;
          const source = figure.querySelector("pre")?.textContent ?? "";
          loadMermaid()
            .then((mermaid) => mermaid.render(`mermaid-${Math.random().toString(36).slice(2)}`, source))
            .then(({ svg }) => {
              if (cancelled) return;
              figure.innerHTML = svg;
              figure.dataset.rendered = "";
            })
            .catch(() => {
              // Leave the source visible if the diagram can't be rendered.
            });
        }
      },
      { rootMargin: "400px 0px" },
    );
    figures.forEach((figure) => observer.observe(figure));
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, []);

  return null;
}
