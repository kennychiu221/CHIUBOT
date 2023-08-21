require("dotenv").config();
const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },

  {
    name: "ping",
    description: "what a mong head",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log(`Slash commands were registered sucessfully!`);
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();
