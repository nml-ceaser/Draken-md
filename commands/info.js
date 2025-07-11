const axios = require('axios');

module.exports = {
  name: 'info',
  run: async (sock, m) => {
    const imageUrl = 'https://i.imgur.com/vVf91Rj.jpg'; // 🔁 Replace with your bot's image if you want

    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`;

    await sock.sendMessage(m.key.remoteJid, {
      image: { url: imageUrl },
      caption:
`🤖 *Draken-Bot-MD is online!*

🕰️ Uptime: ${uptimeFormatted}
📚 Commands: 80+
🔥 Owner: @Draken
📆 Deployed: July 2025
🛠️ built with power

"Don't touch what you can't handle."`
    }, { quoted: m });
  }
};
