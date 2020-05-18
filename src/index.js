/* eslint-disable no-console */
const Discord = require('discord.js');
const fs = require('fs');
const locomotive = require('./locomotive');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

const VIEW_WIDTH = 50;

client.on('message', async (msg) => {
  if (msg.content === 'sl') {
    let lastMsg = await msg.channel.send(
      `\`\`\`${locomotive.get(1, VIEW_WIDTH)}\`\`\``,
    );
    for (let i = 2; i < locomotive.length + VIEW_WIDTH - 1; i += 1) {
      // the delay is the whole point (due to rate limiting), so this warning is invalid
      /* eslint-disable no-await-in-loop */
      // add a delay of 1 second (because rate limiting)
      await new Promise((r) => setTimeout(r, 1000));
      lastMsg = await lastMsg.edit(`\`\`\`${locomotive.get(i, VIEW_WIDTH)}\`\`\``);
      /* eslint-enable no-await-in-loop */
    }
  }
});

// load token
fs.readFile('./token', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  client.login(data.trim());
});
