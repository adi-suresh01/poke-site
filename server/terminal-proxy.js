const net = require("net");
const { WebSocketServer } = require("ws");

const PORT = process.env.TERMINAL_PROXY_PORT || 3001;
const TELNET_HOST = process.env.TELNET_HOST || "why-ntsc.gl.at.ply.gg";
const TELNET_PORT = Number(process.env.TELNET_PORT || 62201);

const IAC = 255;
const DO = 253;
const DONT = 254;
const WILL = 251;
const WONT = 252;
const SB = 250;
const SE = 240;
const NAWS = 31;
const TTYPE = 24;
const ECHO = 1;
const SUPPRESS_GO_AHEAD = 3;
const TTYPE_SEND = 1;
const TTYPE_IS = 0;

const wss = new WebSocketServer({ port: PORT });

const encodeNaws = (cols, rows) => {
  const width = Math.max(1, Math.min(1000, cols));
  const height = Math.max(1, Math.min(500, rows));
  return Buffer.from([
    IAC,
    SB,
    NAWS,
    (width >> 8) & 0xff,
    width & 0xff,
    (height >> 8) & 0xff,
    height & 0xff,
    IAC,
    SE,
  ]);
};

wss.on("connection", (ws) => {
  const socket = net.connect(TELNET_PORT, TELNET_HOST);
  let pending = Buffer.alloc(0);
  let nawsEnabled = false;
  let size = { cols: 140, rows: 40 };

  const sendTelnet = (...bytes) => {
    socket.write(Buffer.from(bytes));
  };

  const sendNaws = () => {
    if (nawsEnabled) {
      socket.write(encodeNaws(size.cols, size.rows));
    }
  };

  const handleCommand = (cmd, opt) => {
    if (cmd === DO) {
      if (opt === NAWS || opt === TTYPE || opt === SUPPRESS_GO_AHEAD || opt === ECHO) {
        sendTelnet(IAC, WILL, opt);
        if (opt === NAWS) {
          nawsEnabled = true;
          sendNaws();
        }
      } else {
        sendTelnet(IAC, WONT, opt);
      }
      return;
    }

    if (cmd === WILL) {
      if (opt === ECHO || opt === SUPPRESS_GO_AHEAD) {
        sendTelnet(IAC, DO, opt);
      } else {
        sendTelnet(IAC, DONT, opt);
      }
    }
  };

  const handleSub = (buffer) => {
    if (buffer.length < 1) {
      return;
    }
    const opt = buffer[0];
    if (opt === TTYPE && buffer[1] === TTYPE_SEND) {
      const term = Buffer.from("xterm-256color");
      socket.write(
        Buffer.concat([
          Buffer.from([IAC, SB, TTYPE, TTYPE_IS]),
          term,
          Buffer.from([IAC, SE]),
        ])
      );
    }
  };

  const parseTelnet = (chunk) => {
    let buffer = pending.length ? Buffer.concat([pending, chunk]) : chunk;
    let output = [];
    let i = 0;

    while (i < buffer.length) {
      const byte = buffer[i];
      if (byte !== IAC) {
        output.push(byte);
        i += 1;
        continue;
      }

      if (i + 1 >= buffer.length) {
        break;
      }

      const cmd = buffer[i + 1];
      if (cmd === IAC) {
        output.push(IAC);
        i += 2;
        continue;
      }

      if (cmd === DO || cmd === DONT || cmd === WILL || cmd === WONT) {
        if (i + 2 >= buffer.length) {
          break;
        }
        const opt = buffer[i + 2];
        handleCommand(cmd, opt);
        i += 3;
        continue;
      }

      if (cmd === SB) {
        const end = buffer.indexOf(Buffer.from([IAC, SE]), i + 2);
        if (end === -1) {
          break;
        }
        const sub = buffer.slice(i + 2, end);
        handleSub(sub);
        i = end + 2;
        continue;
      }

      i += 2;
    }

    pending = i < buffer.length ? buffer.slice(i) : Buffer.alloc(0);
    return Buffer.from(output);
  };

  socket.on("data", (chunk) => {
    const clean = parseTelnet(chunk);
    if (clean.length && ws.readyState === ws.OPEN) {
      ws.send(clean);
    }
  });

  socket.on("close", () => {
    if (ws.readyState === ws.OPEN) {
      ws.close();
    }
  });

  socket.on("error", () => {
    if (ws.readyState === ws.OPEN) {
      ws.close();
    }
  });

  ws.on("message", (data) => {
    if (!socket.writable) {
      return;
    }

    if (typeof data === "string" || data instanceof Buffer) {
      const text = data.toString();
      if (text.startsWith("{")) {
        try {
          const payload = JSON.parse(text);
          if (payload.type === "resize") {
            size = { cols: payload.cols || size.cols, rows: payload.rows || size.rows };
            sendNaws();
            return;
          }
        } catch {
          // fall through to raw write
        }
      }
    }

    socket.write(data);
  });

  ws.on("close", () => {
    socket.destroy();
  });
});

console.log(
  `Terminal proxy listening on ws://localhost:${PORT} -> ${TELNET_HOST}:${TELNET_PORT}`
);
