const { writeFileSync, unlinkSync } = require("fs");
const { tmpdir } = require("os");
const path = require("path");
const { toSticker } = require("wa-sticker-formatter");

module.exports = {
  name: "s",
  run: async (sock, m) => {
    const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const isImage = quoted?.imageMessage;
    const isVideo = quoted?.videoMessage;

    if (!isImage && !isVideo) {
      await sock.sendMessage(m.key.remoteJid, { text: "Reply to an image or short video with `.s`" }, { quoted: m });
      return;
    }

    const type = isImage ? "image" : "video";
    const mediaMessage = quoted[type + "Message"];
    const mediaKey = {
      remoteJid: m.key.remoteJid,
      id: m.message.extendedTextMessage.contextInfo.stanzaId,
      fromMe: false,
      participant: m.message.extendedTextMessage.contextInfo.participant
    };

    const mediaBuffer = await sock.downloadMediaMessage({ key: mediaKey, message: quoted });

    const sticker = await toSticker(mediaBuffer, {
      pack: "DrakenBot",
      author: "🤍",
      type: "full",
      categories: ["🔥", "😈"],
    });

    await sock.sendMessage(m.key.remoteJid, {
      sticker,
    }, { quoted: m });
  }
};
