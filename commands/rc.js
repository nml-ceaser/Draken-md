module.exports = {
  name: 'rc',
  run: async (sock, m) => {
    const comments = [
      "He’s the type to charge his phone at 97%.",
      "Lowkey genius. Highkey chaos.",
      "Looks like he eats cereal with fork.",
      "Unspoken rizz. Silent menace.",
      "He once rebooted a toaster.",
      "NPC energy but lovable.",
      "She’s cooler than your WiFi.",
      "Would win a staring contest against mirrors.",
      "Says 'wow' when watching cooking videos.",
      "Looks like he runs on expired Red Bull."
    ];

    const comment = comments[Math.floor(Math.random() * comments.length)];

    await sock.sendMessage(m.key.remoteJid, { text: comment }, { quoted: m });
  }
};
