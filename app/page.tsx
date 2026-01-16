import Image from "next/image";
import PokeballScene from "./components/PokeballScene";
import SetupTabs from "./components/SetupTabs";
import CopyCode from "./components/CopyCode";

export default function Home() {
  return (
    <div className="scanlines min-h-screen">
      <PokeballScene className="pointer-events-none fixed inset-0 -z-10 opacity-45 blur-lg" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-10 sm:py-12">
        <header className="ascii-panel flex flex-col gap-4 px-6 py-4 text-xs uppercase tracking-[0.3em] text-emerald-200/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="font-display text-base tracking-[0.45em] text-emerald-100 sm:text-lg">
            Poke-Stream
          </div>
          <div className="flex flex-col gap-3 text-[0.7rem] sm:items-end">
            <div className="flex flex-wrap items-center gap-3">
              <span>Live multiplayer Pokemon, rendered entirely in ASCII.</span>
              <span className="border border-emerald-300/30 px-2 py-0.5 text-emerald-200/70">
                Coming Soon
              </span>
              <span className="rounded border border-emerald-300/30 px-2 py-0.5 text-[0.55rem] text-emerald-200/70">
                Browser Beta
              </span>
            </div>
          </div>
        </header>
        <nav className="flex flex-wrap items-center justify-end gap-3 pt-3 text-xs uppercase tracking-[0.3em] text-emerald-200/70">
          <a
            className="border border-emerald-300/40 px-3 py-1 text-emerald-100 transition hover:border-emerald-300 hover:text-white"
            href="#setup"
          >
            Game Setup
          </a>
          <a
            className="border border-emerald-300/40 px-3 py-1 text-emerald-100 transition hover:border-emerald-300 hover:text-white"
            href="#rules"
          >
            Rules
          </a>
          <a
            className="border border-emerald-300/40 px-3 py-1 text-emerald-100 transition hover:border-emerald-300 hover:text-white"
            href="#pokedex"
          >
            Pokedex
          </a>
        </nav>

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
                className="cta-terminal flex flex-col gap-3 px-5 py-5 text-xs text-emerald-100 sm:text-sm"
              >
                <div className="text-[0.65rem] uppercase tracking-[0.35em] text-emerald-200/70">
                  Play Now
                </div>
                <CopyCode
                  text="telnet why-ntsc.gl.at.ply.gg 62201"
                  className="text-base sm:text-lg"
                />
                <div className="text-emerald-200/70">
                  Recommended terminal size:{" "}
                  <code className="text-emerald-100">140x40</code>
                </div>
              </div>
            </div>
            <div className="glow-card aspect-[2084/1374] overflow-hidden bg-black/70">
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

          <section id="setup" className="grid gap-6">
            <SetupTabs />
          </section>

          <section id="rules" className="grid gap-6">
            <div className="glow-card px-6 py-6">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="pixel-frame aspect-[2086/1308] overflow-hidden bg-black/60">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="/catch.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                    Trainer Progress Rules
                  </h2>
                  <div className="space-y-4 text-sm text-emerald-200/85">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Your Name = Your Save
                      </div>
                      <p>
                        Choose a unique trainer name the first time you
                        connect. Next time, type the same name to continue your
                        progress.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Catch & Register
                      </div>
                      <p>
                        Type{" "}
                        <span className="rounded border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-emerald-100">
                          catch
                        </span>{" "}
                        to throw the Pokeball. Each capture registers a new
                        Pokemon to your Pokedex.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Daily Spawn
                      </div>
                      <p>
                        A new Pokemon appears every day. Check back daily or
                        you might miss a rare one.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="pokedex" className="grid gap-6">
            <div className="glow-card px-6 py-6">
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="flex flex-col gap-5">
                  <h2 className="font-display text-lg uppercase tracking-[0.25em] text-emerald-100">
                    Pokedex View
                  </h2>
                  <div className="space-y-4 text-sm text-emerald-200/85">
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Open the Pokedex
                      </div>
                      <p>
                        Type{" "}
                        <span className="rounded border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-emerald-100">
                          pokedex
                        </span>{" "}
                        or{" "}
                        <span className="rounded border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 font-mono text-emerald-100">
                          dex
                        </span>{" "}
                        to view your Pokedex grid.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Red = Caught
                      </div>
                      <p>
                        Numbers highlighted in red are the Pokemon you have
                        already caught.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        View a Capture
                      </div>
                      <p>
                        Type any red number to view that Pokemon in ASCII.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs uppercase tracking-[0.3em] text-emerald-200/60">
                        Saved to Your Name
                      </div>
                      <p>
                        Your Pokedex is tied to your unique trainer name, so
                        your progress carries over every time.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pixel-frame aspect-video overflow-hidden bg-black/60">
                  <video
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                  >
                    <source src="/pokedex.mp4" type="video/mp4" />
                  </video>
                </div>
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
