/* eslint-disable no-console */
const Discord = require('discord.js');
const fs = require('fs');
const locomotive = require('./locomotive');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`logged in as ${client.user.tag}`);
});

const VIEW_WIDTH = 50;

client.on('message', (msg) => {
  if (msg.content === 'sl') {
    let chain = msg.channel.send(
      `\`\`\`${locomotive.get(1, VIEW_WIDTH)}\`\`\``,
    );
    for (let i = 2; i < locomotive.length + VIEW_WIDTH - 1; i += 1) {
      // add a delay of 1 second (because rate limiting, then add the next promise after it)
      // I thought about using async/await, but my style guide got a bit grumpy, and it wouldn't
      // be a massive saving in terms of amount of code (probably would be clearer tbh)
      chain = chain.then((sentMsg) => new Promise((r) => setTimeout(r, 1000))
        .then(() => sentMsg.edit(
          `\`\`\`${locomotive.get(i, VIEW_WIDTH)}\`\`\``,
        )));
    }
  }
});

// load token
fs.readFile('./token', { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err;
  client.login(data.trim());
});
