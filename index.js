// on importe les variables d'environnement 
require('dotenv').config();

// on importe les objets client, intents et collection
const {
    Client,
    Intents,
    Collection,
} = require('discord.js');

// on importe l'objet fs pour lire des fichiers js 
const fs = require('fs');

// on instancie l'objet client qui attent intents, ce sont les intentions du bot (ce qu'il peut faire) 
const allIntents = new Intents(32767);
const client = new Client({
    intents: [allIntents]
});

// on instancie l'objet Collection puis on crée une nouvelle propriété commands dans notre objet client 
client.commands = new Collection();

// on utilise la méthode fs.readdirSync() qui va retourner un array de tous les fichiers dans le dossier commands puis on va filtrer les fichiers js
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// on fait une boucle pour mettre les fichiers js dans la collection client.commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // on set la commande dans la collection avec le nom de la commande et la valeur du module exporté
    client.commands.set(command.data.name, command);
}

// on utilise la méthode "once" qui écoute une seule fois l'événement ready
client.once('ready', () => {
    console.log('La force est réveillée !');
});

// on utilise la méthode "on" qui écoute l'événement guildMemberAdd
client.on('guildMemberAdd', guildMember => {
        // on recherche le role jawa
        const welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Jawa');

        // on attribue ce rôle à l'utilisateur qui vient de rejoindre le serveur
        guildMember.roles.add(welcomeRole);
});

// on utilise la méthode "on" qui écoute l'événement interactionCreate
client.on('interactionCreate', async interaction => {
    // on vérifie si c'est une commande
    if (!interaction.isCommand()) return;

    // on vérifie si la commande existe
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    // on exécute la commande sinon on envoie une erreur
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({
            content: 'La commande répompa :x:',
            ephemeral: true
        });
    }
});

// on connecte le bot avec le token
client.login(process.env.token);