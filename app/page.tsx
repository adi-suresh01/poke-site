import PokeballScene from "./components/PokeballScene";

export default function Home() {
  return (
    <div className="scanlines min-h-screen">
      <PokeballScene className="pointer-events-none fixed inset-0 -z-10 opacity-30 blur-3xl" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 sm:py-12">
        <header className="flex flex-wrap items-center justify-between gap-4 border border-dashed border-emerald-400/35 px-6 py-4 text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          <div className="font-display text-base tracking-[0.45em] text-emerald-100 sm:text-lg">
            Poke-Stream
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Pokemon live in your terminal</span>
            <a
              className="border border-emerald-300/40 px-3 py-1 text-emerald-100 transition hover:border-emerald-300 hover:text-white"
              href="#connect"
            >
              Connect Now
            </a>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-16 py-10 sm:py-14">
          <section className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <p className="font-display text-3xl uppercase tracking-[0.08em] text-emerald-100 sm:text-4xl">
                  Catch Pokemon in pure ASCII, live over Telnet.
                </p>
                <p className="max-w-xl text-sm leading-6 text-emerald-200/80 sm:text-base">
                  Watch ASCII characters come to life as Pokemon. Create a unique trainer name, catch every
                  Gen 1 favorite over Telnet, and
                  check back each day to unlock a random Pokemon. Can you catch
                  &apos;em all?
                </p>
              </div>
              <div
                id="connect"
                className="cta-terminal flex flex-col gap-3 px-4 py-4 text-xs text-emerald-100 sm:text-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-emerald-200/70">Play now:</span>
                  <code className="text-emerald-100">
                    telnet why-ntsc.gl.at.ply.gg 62201
                  </code>
                </div>
                <div className="text-emerald-200/70">
                  Optional color mode:{" "}
                  <code className="text-emerald-100">
                    POKESTREAM_COLOR=truecolor
                  </code>
                </div>
                <div className="text-emerald-200/70">
                  Recommended terminal size:{" "}
                  <code className="text-emerald-100">140x40</code>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-[0.7rem] uppercase tracking-[0.25em] text-emerald-200/70">
                <span>Playable over Telnet</span>
                <span>3D Pokeball in ASCII</span>
                <span>Gen 1 Pokedex</span>
                <span>Rust + Tokio</span>
              </div>
            </div>
            <div className="glow-card aspect-[2084/1374] overflow-hidden border border-emerald-300/25 bg-black/70">
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/pokestream-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                How It Works
              </h2>
              <ol className="space-y-3 text-sm text-emerald-200/80">
                <li>1. Connect via Telnet and enter a trainer name.</li>
                <li>2. A Pokemon appears in ASCII on the right.</li>
                <li>3. Type <code>catch</code> to throw the Pokeball.</li>
                <li>4. Watch the capture animation play in real time.</li>
                <li>5. Open your Pokedex and keep collecting.</li>
              </ol>
            </div>
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                Capture Sequence
              </h2>
              <div className="grid gap-3 text-xs uppercase tracking-[0.3em] text-emerald-200/70 sm:grid-cols-2">
                <div>Throwing</div>
                <div>Opening</div>
                <div>Absorbing</div>
                <div>Closing</div>
                <div>Shaking</div>
                <div>Starburst</div>
              </div>
              <p className="text-sm text-emerald-200/80">
                Each capture renders a full ASCII animation with wobble, star
                bursts, and the classic three-shake countdown.
              </p>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                Pokedex Persistence
              </h2>
              <p className="text-sm text-emerald-200/80">
                Each trainer gets a personal Gen 1 Pokedex stored on the server.
                Captures persist across sessions with zero accounts or passwords.
              </p>
              <pre className="ascii-panel whitespace-pre-wrap px-4 py-4 text-[0.6rem] text-emerald-200/70 sm:text-xs">
{`001 002 003 004 005 006 007 008 009 010 011 012 013 014 015
016 017 018 019 020 021 022 023 024 025 026 027 028 029 030
031 032 033 034 035 036 037 038 039 040 041 042 043 044 045
046 047 048 049 050 051 052 053 054 055 056 057 058 059 060
061 062 063 064 065 066 067 068 069 070 071 072 073 074 075
076 077 078 079 080 081 082 083 084 085 086 087 088 089 090`}
              </pre>
            </div>
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                Under The Hood
              </h2>
              <div className="grid gap-3 text-sm text-emerald-200/80 sm:grid-cols-2">
                <div>Rust (edition 2024)</div>
                <div>Tokio async runtime</div>
                <div>SQLite persistence</div>
                <div>ASCII shading ramp</div>
                <div>Per-session render loop</div>
                <div>Truecolor / ANSI 256 / Mono</div>
              </div>
              <div className="mt-auto text-xs text-emerald-200/70">
                Each Telnet session gets its own game loop and render buffers.
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                Screens / Demo
              </h2>
              <div className="ascii-panel flex aspect-video items-center justify-center px-6 text-center text-xs text-emerald-200/70">
                Drop a capture video into <code>public/pokestream-demo.mp4</code>{" "}
                and it will show here.
              </div>
              <p className="text-xs text-emerald-200/70">
                Perfect for showcasing the capture animation and Pokedex flow.
              </p>
            </div>
            <div className="glow-card flex flex-col gap-4 px-6 py-6">
              <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                Terminal Session
              </h2>
              <p className="text-sm text-emerald-200/80">
                Want to try it in-browser? A web terminal can work with a
                WebSocket proxy to the Telnet server. For now, this space can
                host a short demo clip or a future live terminal.
              </p>
              <div className="cta-terminal px-4 py-4 text-xs text-emerald-200/70">
                Status: <span className="text-emerald-100">Awaiting link</span>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-emerald-400/20 py-6 text-xs uppercase tracking-[0.3em] text-emerald-200/60">
          Boot up. Connect. Capture.
        </footer>
      </div>
    </div>
  );
}
