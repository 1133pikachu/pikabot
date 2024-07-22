const OmikujiWord = ['ちょうだいきち', '大吉', '吉', '中吉', '小吉', '末吉', '凶', '大凶', 'ちょうだいきょう'];

function RandomOmikujiWord () {
  const randomIndex = Math.floor(Math.random () * OmikujiWord.length);
  return OmikujiWord[randomIndex];
}

module.exports = {
  handle: (message) => {
    if (message.content === '!omikuji') {
      const OmikujiResult = RandomOmikujiWord();
      message.channel.send(`今日は ${OmikujiResult} です！`);
    }
  }
};