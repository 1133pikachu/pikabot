const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('サーバーに関する情報を提供します。'),
	async execute(interaction) {
		await interaction.reply(`このサーバー( ${interaction.guild.name} )は現在 ${interaction.guild.memberCount} 人が参加しています。`);
	},
};