const { prefix } = require('../config.json');

const OmikujiWord = ['ちょうだいきち', '大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶', 'ちょうだいきょう'];

function RandomOmikujiWord () {
  const randomIndex = Math.floor(Math.random () * OmikujiWord.length);
  return OmikujiWord[randomIndex];
}

module.exports = {
  handle: (message) => {
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'omikuji') {
      const OmikujiResult = RandomOmikujiWord();
      message.channel.send(`今日は${OmikujiResult}です！`);
    }
  }
};
