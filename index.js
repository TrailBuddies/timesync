const {Client, Intents} = require('discord.js');
const {config} = require('dotenv');
config();

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES]
});

client.once('ready', () => {
	client.guilds.cache.forEach((g) => {
		g.members.cache.forEach((m) => {
			if (m.user.bot || m.guild.ownerId === m.user.id) return;

			const role = m.roles.cache.find((r) => r.name.startsWith('tz='));
			if (role) {
				const tz = role.name.split('=')[1];
				const hourOffset = parseInt(tz.split(':')[0].replace('UTC', ''));
				const minuteOffset = parseInt(tz.split(':')[1]);

				const hour = (new Date().getUTCHours() + parseFloat(hourOffset)) % 24;
				const min = (new Date().getUTCMinutes() + parseFloat(minuteOffset)) % 60;

				const currentTime = `${hour > 9 ? '' : '0'}${hour}:${min}`;
				m.setNickname(`${m.displayName.split('|')[0]} | ${currentTime}`);
			} else console.error(`Failed to find timezone role for ${m.user.tag} in ${g.name}`);
		});
	});
});

client.login(process.env.TOKEN);
