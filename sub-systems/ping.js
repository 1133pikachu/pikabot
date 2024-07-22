module.exports = {
  handle: (message) => {
    if (message.content === '!ping') {
      message.channel.send('Pong!:ping_pong:');
    }
  }
};
