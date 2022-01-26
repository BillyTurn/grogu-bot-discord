const fs = require('fs');
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');

require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({
    version: '9'
}).setToken(process.env.token);

(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), {
            body: commands
        });
        console.log('Les commandes ont bien étés enregistrées !')
    } catch (error) {
        console.error(error);
    }
})();