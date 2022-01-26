const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Renvoie pong'),

    async execute(interaction) {
        const messageEmbed = new MessageEmbed()
            .setColor('GREEN')
            .setDescription('Pong ! :ping_pong:');

        return await interaction.reply({
            embeds: [messageEmbed]
        });
    }
}