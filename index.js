const { Client, Collection, Events, GatewayIntentBits, PresenceUpdateStatus, ActivityType, ApplicationCommand } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}




const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

let loadedCount = 0;
let ignoredCount = 0;

for (const file of eventFiles) {


	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	switch (event.ignore) {
		case true :
			ignoredCount++;
		break;
		default:
			loadedCount++;
			if (event.once) {
				client.once(event.name, (...args) => event.execute(...args));
			} else {
				client.on(event.name, (...args) => event.execute(...args));
			}
	}


}
console.log(`Loaded ${loadedCount} event(s).`);
console.log(`Ignored ${ignoredCount} event(s).`);

client.login(process.env.token)
/**
const command_refrest = fs.readdirSync('./deploy-commands.js')

 client.once(Events.ClientReady, readyclient => {

	command_refrest.execute()

}
);
**/ 

client.once(Events.ClientReady, readyclient => {
    client.user.setPresence({ activities: [{ name: 'Discord.js V14.15.3', type: ActivityType.Listening}], /**status: PresenceUpdateStatus.DoNotDisturb **/ });
}
); 
