const {Client} = require('discord.js');

const client = new Client({intents: ['GUILDS', 'GUILD_MEMBERS']});

client.once('ready', () => {});

client.login(process.env.TOKEN);
