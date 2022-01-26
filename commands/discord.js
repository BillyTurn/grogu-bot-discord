const {
    SlashCommandBuilder
} = require('@discordjs/builders');

const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discord')
        .setDescription('Renvoie un lien vers la documentation de discord.js'),

    async execute(interaction) {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setLabel('Documentation')
                .setStyle('LINK')
                .setURL('https://discord.js.org/#/docs/main/stable/general/welcome'),
            );

        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setDescription(':blue_book:');

        return await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
}