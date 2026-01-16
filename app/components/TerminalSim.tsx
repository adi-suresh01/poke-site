"use client";

import { useEffect, useMemo, useState } from "react";

type Theme = "macos" | "linux" | "windows";

type TerminalSimProps = {
  theme: Theme;
  lines: string[];
};

const TYPE_SPEED_MS = 26;
const LINE_PAUSE_MS = 520;
const LOOP_PAUSE_MS = 1400;

function TerminalHeader({ theme }: { theme: Theme }) {
  if (theme === "macos") {
    return (
      <div className="flex items-center gap-2 bg-black/40 px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-emerald-200/60">
        <div className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
        </div>
        <span className="ml-2">Terminal</span>
      </div>
    );
  }

  if (theme === "windows") {
    return (
      <div className="flex items-center justify-between bg-black/50 px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-emerald-200/60">
        <span>Windows PowerShell</span>
        <span>_ [] X</span>
      </div>
    );
  }

  return (
    <div className="flex items-center bg-black/45 px-3 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-emerald-200/60">
      Terminal
    </div>
  );
}

export default function TerminalSim({ theme, lines }: TerminalSimProps) {
  const safeLines = useMemo(() => lines.filter(Boolean), [lines]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (lineIndex >= safeLines.length) {
      timer = setTimeout(() => {
        setLineIndex(0);
        setCharIndex(0);
      }, LOOP_PAUSE_MS);
    } else if (charIndex < safeLines[lineIndex].length) {
      timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, TYPE_SPEED_MS);
    } else {
      timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [charIndex, lineIndex, safeLines]);

  const rendered = safeLines
    .slice(0, lineIndex)
    .concat(
      lineIndex < safeLines.length
        ? safeLines[lineIndex].slice(0, charIndex)
        : ""
    )
    .join("\n");

  return (
    <div className="flex h-64 flex-col overflow-hidden border border-emerald-300/25 bg-black/70 sm:h-72 lg:h-80">
      <TerminalHeader theme={theme} />
      <pre className="flex-1 whitespace-pre-wrap px-4 py-4 text-xs leading-6 text-emerald-100 sm:text-sm">
        {rendered}
        <span className="inline-block h-4 w-2 animate-pulse bg-emerald-200/70 align-middle" />
      </pre>
    </div>
  );
}
