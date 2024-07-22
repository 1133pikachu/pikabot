const path = require('path');
const fs = require('fs');

const PREFIX = "!genshin";
const DATA_DIR = path.join(__dirname, '..', 'data', 'genshin');

// データ読み込み
function loadData(filename) {
  const filePath =path.join(DATA_DIR, filename);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const genshinData = {
  characters: loadData('characters.json'),
  weaponSwords: loadData('weapon-swords.json'),
  weaponClaymores: loadData('weapon-claymores.json')
};

// すべてのエントリーを1つの配列にフラット化
const allEntries = Object.entries(genshinData).flatMap(([category, items]) =>
  Object.entries(items).map(([name, data]) => ({
    name,
    aliases: data.aliases,
    url: data.url,
    category
  }))
);

function findEntry(query) {
  query = query.toLowerCase();
  return allEntries.find(entry =>
    entry.name.toLowerCase() === query ||
    entry.aliases.some(alias => alias.toLowerCase() === query)
  );
}

module.exports = {
  handle: (message) => {
    if (message.content.startsWith(PREFIX)) {
      const args = message.content.slice(PREFIX.length).trim().split(/ +/);
      const query = args.join(" ");

      const entry = findEntry(query);

      if (entry) {
        // '#'対策としてURLのエンコードを2段階で行う
        const encodeUrl = encodeURIComponent(entry.url).replace(/%23/g, '#');
        const url = `https://wikiwiki.jp/genshinwiki/${encodeUrl}`;
        message.channel.send(`[${entry.name}](${url}) (${entry.category})`);
      } else {
        message.channel.send(`「${query}」に関するページは存在しませんでした。タイプミスなどをしていないか確認してもう一度お試しください。`);

        // もしかして
        const similarEntries = allEntries.filter(entry =>
          entry.name.toLowerCase().includes(query.toLowerCase()) ||
          entry.aliases.some(alias => alias.toLowerCase().includes(query.toLowerCase()))
        ).slice(0, 3); // 最大3つのもしかしてを表示する

        if (similarEntries.length > 0) {
          const suggestions = similarEntries.map(e => e.name).join(', ');
          message.channel.send(`もしかして: ${suggestions}`);
        }
      }
    }
  }
};