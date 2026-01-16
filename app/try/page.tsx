import Link from "next/link";
import TerminalClient from "./TerminalClient";

export default function TryPage() {
  return (
    <div className="scanlines min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 sm:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border border-dashed border-emerald-400/35 px-6 py-4 text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          <div className="font-display text-base tracking-[0.45em] text-emerald-100 sm:text-lg">
            Poke-Stream
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Try In Browser</span>
            <Link
              className="border border-emerald-300/40 px-3 py-1 text-emerald-100 transition hover:border-emerald-300 hover:text-white"
              href="/"
            >
              Back Home
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 py-10 sm:py-14">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-emerald-200/70">
            <span>Session Proxy Required</span>
            <span>Interactive Mode</span>
          </div>
          <div className="glow-card flex-1 p-4 sm:p-6">
            <TerminalClient />
          </div>
          <p className="text-xs text-emerald-200/60">
            Terminal connects through a WebSocket proxy to the Telnet server.
            If you see &quot;closed&quot;, make sure the proxy is running.
          </p>
        </main>
      </div>
    </div>
  );
}
