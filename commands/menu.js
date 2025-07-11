module.exports = {
  name: 'menu',
  run: async (sock, m) => {
    const commands = [
      '.info — Bot status & uptime',
      '.rc — Random comment (good or savage)',
      '.s — Image to sticker (coming up)',
      '.ytmp3 [link] — YouTube audio download',
      '.ytmp4 [link] — YouTube video download',
      '.meme — Random meme',
      '.ai [prompt] — Ask AI anything',
      '.quote — Motivation machine',
      '.calc [math] — Calculator',
      '.tts [lang] [text] — Text-to-speech',
      '.say [text] — Voice generator',
      '.vvs — View-once to normal media',
      '.dog / .cat — Cute animal pics',
      '.joke — Make me laugh',
      '.8ball [q] — Magic ball of wisdom',
      '.love [name] — Love match %',
      '.ping — Speed test',
      '.nuke — Boom. Just boom.',
    ];

    const text = `*🤖 Draken-Bot-MD — Command List*\n\n${commands.join('\n')}\n\n⚙️ More coming soon...`;

    await sock.sendMessage(m.key.remoteJid, { text }, { quoted: m });
  }
};
