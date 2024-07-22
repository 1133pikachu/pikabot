module.exports = {
  handle: (message) => {
    if (message.content === '!server') {
      message.channel.send(`このサーバー( ${message.guild.name} )は現在 ${message.guild.memberCount} 人が参加しています。`);
    }
  }
};
