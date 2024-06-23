const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// Buscar a guild pelo ID
		const specificGuild = await interaction.client.guilds.fetch('1075808627673284648');
		const specificGuildIcon = specificGuild.iconURL();

		const guildOwner = await interaction.guild.fetchOwner();
		const guildIcon = interaction.guild.iconURL();

		const serverEmbed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle('Server Info')
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
			.setDescription(`This server is ${interaction.guild.name}`)
			.setThumbnail(guildIcon)
			.addFields(
				{ name: 'Server', value: interaction.guild.name, inline: true },
				{ name: 'Member Count', value: interaction.guild.memberCount.toString(), inline: true },
				{ name: 'Server Id', value: interaction.guild.id, inline: true },
				{ name: 'Role Count', value: interaction.guild.roles.cache.size.toString(), inline: true },
				{ name: 'Server Owner', value: `${guildOwner.user.tag} (ID: ${guildOwner.id})`, inline: true }
			)
			.setTimestamp()
			.setFooter({ text: 'Pudim Software.', iconURL: specificGuildIcon });

		await interaction.reply({ embeds: [serverEmbed] });
	},
};
