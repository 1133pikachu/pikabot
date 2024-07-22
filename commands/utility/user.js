const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('ユーザーに関する情報を提供します。'),
    async execute(interaction) {
        await interaction.reply(`あなたがこのサーバーに参加した時間は ${interaction.member.joinedAt} です。`);
    },
};
