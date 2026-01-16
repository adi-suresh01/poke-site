"use client";

import { useState } from "react";

type CopyCodeProps = {
  text: string;
  className?: string;
};

export default function CopyCode({ text, className }: CopyCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-3 border border-emerald-300/25 bg-black/60 px-3 py-2 text-emerald-100 ${className ?? ""}`}
    >
      <code className="text-xs sm:text-sm">{text}</code>
      <button
        type="button"
        onClick={handleCopy}
        className="border border-emerald-200/40 px-2 py-1 text-[0.55rem] uppercase tracking-[0.3em] text-emerald-200/80 transition hover:border-emerald-200 hover:text-emerald-100"
        aria-label="Copy command"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
