import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import * as Discord from 'discord.js';
import { Client, Intents } from 'discord.js';
import * as dotenv from 'dotenv';

const client = new Client({intents: [Intents.FLAGS.GUILDS]})
const testChannel = "877322255384862820"

if(process.env.NODE_ENV !== "production") {
    dotenv.config()
}

const commands = [{
    name: "abrir",
    description: "Libera o canal de dúvidas"
}, {
  name: "fechar",
  description: "Fecha o canal de dúvidas"
}, {
  name: "perguntar",
  description: "Coloca uma nova dúvida na lista de espera"
}]

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
        //@ts-ignore
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`)

  const guild = client.guilds.cache.get(process.env.GUILD_ID)
  const roles = await guild.roles.fetch()

  //@ts-ignore
  const channel: Discord.TextChannel = client.channels.cache.get(testChannel)

  channel.permissionOverwrites.edit(guild.roles.everyone, {SEND_MESSAGES: false})
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  switch(interaction.commandName) {
    case "abrir":
      interaction.reply("Calma lá")
      break;
    case "fechar":
      interaction.reply("Calma lá")
      break;
  }
});

client.on("message", async (message) => {
    message.reply("teste")
})

client.login(process.env.BOT_TOKEN);