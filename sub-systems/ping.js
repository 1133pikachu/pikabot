const { prefix } = require('../config.json');

module.exports = {
  handle: (message) => {
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (command === 'ping') {
      message.channel.send('Pong!:ping_pong:');
    }
  }
};
