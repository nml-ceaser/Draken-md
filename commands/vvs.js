module.exports = {
  name: 'vvs',
  run: async (sock, m) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isViewOnce = quoted?.viewOnceMessage?.message;

    if (!isViewOnce) {
      await sock.sendMessage(m.key.remoteJid, { text: "❌ Reply to a *view-once* image or video." }, { quoted: m });
      return;
    }

    const message = isViewOnce.imageMessage || isViewOnce.videoMessage;
    const mimetype = message.mimetype;

    const mediaBuffer = await sock.downloadMediaMessage({ key: m.key, message: quoted.viewOnceMessage });

    if (message.fileLength > 15 * 1024 * 1024) {
      return sock.sendMessage(m.key.remoteJid, { text: "⚠️ File too big!" }, { quoted: m });
    }

    await sock.sendMessage(m.key.remoteJid, {
      [message.imageMessage ? "image" : "video"]: mediaBuffer,
      caption: "*🔓 View Once Unlocked by Draken-Bot-MD*"
    }, { quoted: m });
  }
};
