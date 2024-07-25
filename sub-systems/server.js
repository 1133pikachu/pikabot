const { prefix } = require('../config.json');

module.exports = {
  handle: (message) => {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'server') {
      message.channel.send(`このサーバー( ${message.guild.name} )は現在 ${message.guild.memberCount} 人が参加しています。`);
    }
  }
};
