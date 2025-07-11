const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');

const commands = {};
const commandDir = path.join(__dirname, 'commands');

// Load all commands from /commands folder
fs.readdirSync(commandDir).forEach(file => {
  const command = require(path.join(commandDir, file));
  commands[command.name] = command;
});

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
    logger: pino({ level: 'silent' }),
    browser: ["Draken-Bot-MD", "Safari", "1.0"]
  });

  // Auto-like status with 🤍
  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m || !m.key || !m.message) return;

    const fromStatus = m.key.remoteJid === 'status@broadcast';

    if (fromStatus) {
      await sock.sendMessage(m.key.remoteJid, {
        react: {
          text: '🤍',
          key: m.key
        }
      });
    }

    const fromMe = m.key.fromMe;
    const msgType = Object.keys(m.message)[0];
    const body = m.message[msgType]?.text || m.message[msgType]?.caption || "";

    if (!fromMe && body.startsWith('.')) {
      const [cmdName, ...args] = body.slice(1).split(' ');
      const cmd = commands[cmdName.toLowerCase()];
      if (cmd) {
        try {
          await cmd.run(sock, m, args.join(" "));
        } catch (e) {
          await sock.sendMessage(m.key.remoteJid, { text: "❌ Error running command." });
          console.error(e);
        }
      }
    }
  });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) startBot();
    } else if (connection === 'open') {
      console.log("✅ Bot connected!");
    }
  });
}

startBot();
