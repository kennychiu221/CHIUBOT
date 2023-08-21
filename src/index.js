require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`${c.user.tag} is online.`);

  client.user.setActivity({
    name: "You Play Deez Nutz",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  });
});

//----------------------------------------------SLASH COMMAND---------------------------------------//

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("hey bossman!");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("what a mong head!");
  }
});

//-------------------------------------------------ROLE-----------------------------------------------//

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "I couldn't find that role",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`The role ${role} has been removed.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`The role ${role} has been added.`);
  } catch (error) {
    console.log(error);
  }
});

//-------------------------------------------------MESSAGES--------------------------------------------//
//ADRIAN MESSAGE//
client.on("messageCreate", (message) => {
  if (message.content === "adrian") {
    message.reply("Adrian is right behind you");
  }
});

//CIERAN MESSAGE//
client.on("messageCreate", (message) => {
  if (message.content === "cieran") {
    message.reply("Cieran wants a bit of Adrian");
  }
});

//DAMIAN MESSAGE//
client.on("messageCreate", (message) => {
  if (message.content === "damian") {
    message.reply("Damian wants to change his surname as Chudzinski");
  }
});

//SUII//
client.on("messageCreate", (message) => {
  if (message.content === "sui") {
    message.reply("SUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIEYYYYY");
  }
});

client.login(process.env.TOKEN);
