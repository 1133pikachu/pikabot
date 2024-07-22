// d.js v14
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token, prefix, owner_id } = require('./config.json');
let subSystems = require('./sub-systems');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

function loadCommands() {
    client.commands.clear();
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            delete require.cache[require.resolve(filePath)];
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}

function loadEvents() {
    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        delete require.cache[require.resolve(filePath)];
        const event = require(filePath);
        if (event.once) {
            client.removeAllListeners(event.name);
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.removeAllListeners(event.name);
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
}

function reloadSubSystems() {
    delete require.cache[require.resolve('./sub-systems')];
    subSystems = require('./sub-systems');
}

loadCommands();
loadEvents();

function handleMessage(message) {
	if (message.content.startsWith(prefix) && message.content.slice(prefix.length).trim() === 'reload') {
        if (message.author.id === owner_id) {
            loadCommands();
            loadEvents();
            reloadSubSystems();
            message.channel.send('Bot has been reloaded!');
        } else {
            message.reply('You do not have permission to use this command.');
        }
        return;
    }

	Object.values(subSystems).forEach(system => {
        if (typeof system === 'object' && typeof system.handle === 'function') {
            system.handle(message);
        } else if (typeof system === 'object') {
            Object.values(system).forEach(func => {
                if (typeof func === 'function') {
                    func(message);
                }
            });
        }
    });

	if (message.content.includes("みのり")) {
		message.channel.send('ﾐﾉﾘﾁｬﾝｶﾜｲｲﾔｯﾀｰ!');
	}
}

client.on('ready', () => {
  });

client.on('messageCreate', handleMessage);

const interval = setInterval(() => {
	// ステータスメッセージを1分ごとにランダムに変更する
	const statusMessages = ["ﾐﾉﾘﾁｬﾝｶﾜｲｲﾈ", "ﾐﾉﾘﾁｬﾝｶﾜｲｲﾔｯﾀｰ!", "ぴかー", "ぶおおお", "プロセカ", "原神", "厳選impact"];
	const statusMessage = statusMessages[Math.floor(Math.random() * statusMessages.length)];
	client.user.setActivity(statusMessage, { Type: ActivityType.Playing });
}, 60000);

client.login(token);
