"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import TerminalSim from "./TerminalSim";
import CopyCode from "./CopyCode";

type SetupKey = "macos" | "linux" | "windows";

const setups: Record<SetupKey, { label: string; steps: Array<ReactNode> }> = {
  macos: {
    label: "macOS",
    steps: [
      "Search for Terminal and open it.",
      <>
        Install telnet:
        <CopyCode text="brew install telnet" className="mt-2" />
      </>,
      <>
        Paste:
        <CopyCode text="telnet why-ntsc.gl.at.ply.gg 62201" className="mt-2" />
      </>,
      "Press Enter to connect.",
      "Watch the good boi sprint across your welcome screen.",
    ],
  },
  linux: {
    label: "Linux",
    steps: [
      "Search for Terminal and open it.",
      <>
        Install telnet:
        <CopyCode text="sudo apt install telnet" className="mt-2" />
      </>,
      <>
        Paste:
        <CopyCode text="telnet why-ntsc.gl.at.ply.gg 62201" className="mt-2" />
      </>,
      "Press Enter to connect.",
      "Watch the good boi sprint across your welcome screen.",
    ],
  },
  windows: {
    label: "Windows",
    steps: [
      "Search for Command Prompt or PowerShell and open it.",
      <>
        Enable Telnet Client:
        <CopyCode
          text="dism /online /Enable-Feature /FeatureName:TelnetClient"
          className="mt-2"
        />
      </>,
      <>
        Paste:
        <CopyCode text="telnet why-ntsc.gl.at.ply.gg 62201" className="mt-2" />
      </>,
      "Press Enter to connect.",
      "Watch the good boi sprint across your welcome screen.",
    ],
  },
};

const terminalScripts: Record<SetupKey, string[]> = {
  macos: [
    "MacBook-Pro ~ % brew install telnet",
    "==> Downloading telnet...",
    "==> Installing telnet...",
    "MacBook-Pro ~ % telnet why-ntsc.gl.at.ply.gg 62201",
    "Trying 54.91.22.11...",
    "Connected to why-ntsc.gl.at.ply.gg.",
    "POKE-STREAM booting...",
    "[Arcanine sprints across the welcome screen]",
  ],
  linux: [
    "user@linux:~$ sudo apt install telnet",
    "Reading package lists... Done",
    "Building dependency tree... Done",
    "Setting up telnet (0.17-41.2) ...",
    "user@linux:~$ telnet why-ntsc.gl.at.ply.gg 62201",
    "Trying 54.91.22.11...",
    "Connected to why-ntsc.gl.at.ply.gg.",
    "POKE-STREAM booting...",
    "[Arcanine sprints across the welcome screen]",
  ],
  windows: [
    "PS C:\\Users\\Trainer> dism /online /Enable-Feature /FeatureName:TelnetClient",
    "Enabling feature(s)",
    "[==========================100%==========================]",
    "The operation completed successfully.",
    "PS C:\\Users\\Trainer> telnet why-ntsc.gl.at.ply.gg 62201",
    "Connecting To why-ntsc.gl.at.ply.gg...",
    "POKE-STREAM booting...",
    "[Arcanine sprints across the welcome screen]",
  ],
};

export default function SetupTabs() {
  const [active, setActive] = useState<SetupKey>("macos");
  const lines = useMemo(() => terminalScripts[active], [active]);

  return (
    <div className="glow-card px-7 py-7">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <div className="flex h-full flex-col gap-6 overflow-hidden">
          <h2 className="font-display text-xl uppercase tracking-[0.28em] text-emerald-100">
            Game Setup
          </h2>
          <div className="flex flex-wrap gap-3 text-sm uppercase tracking-[0.28em] text-emerald-200/75">
            {(Object.keys(setups) as SetupKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setActive(key)}
                className={`border px-3 py-1 transition ${
                  active === key
                    ? "border-emerald-200 text-emerald-100"
                    : "border-emerald-300/30 text-emerald-200/70 hover:border-emerald-200 hover:text-emerald-100"
                }`}
              >
                {setups[key].label}
              </button>
            ))}
          </div>
          <ol className="flex-1 space-y-4 overflow-auto text-base text-emerald-200/85">
            {setups[active].steps.map((step, index) => (
              <li key={index}>
                {index + 1}. {step}
              </li>
            ))}
          </ol>
        </div>
        <TerminalSim key={active} theme={active} lines={lines} />
      </div>
    </div>
  );
}
