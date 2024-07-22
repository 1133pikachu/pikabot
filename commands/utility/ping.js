const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('現在のpingを計測することができます。'),
	async execute(interaction) {
		const sent = await interaction.reply({ content: '計測中...', fetchReply: true });
		interaction.editReply(`現在のping:ping_pong: ${sent.createdTimestamp - interaction.createdTimestamp}ms`);
	},
};