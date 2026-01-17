"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Terminal } from "xterm";
import "xterm/css/xterm.css";

type ConnectionStatus = "connecting" | "connected" | "closed" | "error";

export default function TerminalClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const localEchoRef = useRef(true);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [scale, setScale] = useState(1);

  const socketUrl = useMemo(() => {
    return (
      process.env.NEXT_PUBLIC_TERMINAL_WS || "ws://localhost:3001"
    );
  }, []);

  const cols = 140;
  const rows = 46;
  const linePx = 17;

  useEffect(() => {
    let onDataDispose: { dispose: () => void } | null = null;
    let terminal: any = null;
    let socket: WebSocket | null = null;
    let mounted = true;

    const setup = async () => {
      const [{ Terminal }] = await Promise.all([import("xterm")]);

      if (!mounted) {
        return;
      }

      terminal = new Terminal({
        fontFamily:
          "var(--font-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        fontSize: 15,
        lineHeight: 1.25,
        convertEol: true,
        cursorBlink: true,
        cols,
        rows,
        theme: {
          background: "#050806",
          foreground: "#d7ffef",
          cursor: "#38f3c8",
        },
      });

      terminalRef.current = terminal;
      terminal.open(containerRef.current ?? undefined);
      terminal.resize(cols, rows);

      terminal.focus();
      terminal.writeln("Connecting to Poke-Stream...");

      socket = new WebSocket(socketUrl);
      socket.binaryType = "arraybuffer";
      socketRef.current = socket;

      const sendResize = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(
            JSON.stringify({
              type: "resize",
              cols,
              rows,
            })
          );
        }
      };

      socket.addEventListener("open", () => {
        setStatus("connected");
        terminal.writeln("Connected. Press Enter to begin.");
        terminal.resize(cols, rows);
        requestAnimationFrame(sendResize);
      });

      socket.addEventListener("message", (event) => {
        const data = event.data;
        if (typeof data === "string") {
          if (data.startsWith("{")) {
            try {
              const payload = JSON.parse(data);
              if (payload?.type === "echo") {
                localEchoRef.current = Boolean(payload.value);
                return;
              }
            } catch {
              // fall through to terminal output
            }
          }
          terminal.write(data);
        } else {
          terminal.write(new Uint8Array(data));
        }
      });

      socket.addEventListener("close", () => {
        setStatus("closed");
        terminal.writeln("\r\nConnection closed.");
      });

      socket.addEventListener("error", () => {
        setStatus("error");
        terminal.writeln("\r\nConnection error.");
      });

      onDataDispose = terminal.onData((input: string) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
          const payload = input === "\r" ? "\r" : input;
          socket.send(payload);
        }
        if (!localEchoRef.current) {
          return;
        }
        if (input === "\r") {
          terminal.write("\r\n");
          return;
        }
        if (input === "\u007F") {
          terminal.write("\b \b");
          return;
        }
        terminal.write(input);
      });

      sendResize();
    };

    setup();

    return () => {
      mounted = false;
      if (onDataDispose) {
        onDataDispose.dispose();
      }
      if (terminal) {
        terminal.dispose();
      }
      if (socket) {
        socket.close();
      }
    };
  }, [socketUrl]);

  useEffect(() => {
    if (!outerRef.current || !innerRef.current) {
      return;
    }

    const measure = () => {
      const outerWidth = outerRef.current?.clientWidth ?? 0;
      const outerHeight = outerRef.current?.clientHeight ?? 0;
      const innerWidth = innerRef.current?.clientWidth ?? 0;
      const innerHeight = rows * linePx;
      if (!outerWidth || !innerWidth) {
        return;
      }
      const widthScale = outerWidth / innerWidth;
      const widthOnly = Math.min(1, widthScale);
      setScale(widthOnly * 0.88);
    };

    const observer = new ResizeObserver(measure);
    observer.observe(outerRef.current);
    observer.observe(innerRef.current);
    measure();

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex h-full min-h-[42vh] flex-col border border-emerald-300/25 bg-black/70">
      <div className="flex items-center justify-between border-b border-emerald-300/20 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-emerald-200/70">
        <span>Live Terminal</span>
        <span>{status}</span>
      </div>
      <div ref={outerRef} className="flex-1 overflow-hidden px-3 py-2">
        <div
          ref={innerRef}
          style={{
            width: "140ch",
            height: rows * linePx,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            ref={containerRef}
            className="h-full w-full"
            onClick={() => terminalRef.current?.focus()}
            onPointerDown={() => terminalRef.current?.focus()}
            onTouchStart={() => terminalRef.current?.focus()}
            onKeyDown={() => terminalRef.current?.focus()}
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  );
}
