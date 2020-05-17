/* eslint-disable no-console */
const Discord = require('discord.js');
const fs = require('fs');
const locomotive = require('./locomotive');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on('message', (msg) => {
  if (msg.content === 'sl') {
    msg.channel.send(
      `\`\`\`${locomotive.D51.STR.join('\n')}\`\`\``,
    );
  }
});

// load token
fs.readFile('./token', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  client.login(data.trim());
});
