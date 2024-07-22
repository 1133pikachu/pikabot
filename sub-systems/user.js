module.exports = {
  handle: (message) => {
    if (message.content === '!user') {
      message.channel.send(`あなたがこのサーバーに参加した時間は ${message.member.joinedAt} です。`);
    }
  }
};
