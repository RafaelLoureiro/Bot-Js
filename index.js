const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
//dotenv
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

//imports commands
const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()


for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Este comando em --> ${filePath} está com "data" ou "execute ausentes"`)
    }
}


//Login  do Bot
client.once(Events.ClientReady, c => {
    console.log(`Pronto! Login feito --> ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

//listenr interection in Bot

client.on(Events.InteractionCreate, async interection => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]
        if (selected == "javascript") {
            await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
        } else if (selected == "python") {
            await interaction.reply("Documentação do Python: https://www.python.org")
        } else if (selected == "csharp") {
            await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
        } else if (selected == "discordjs") {
            await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
        }
    }
    if (!interection.isChatInputCommand()) return
    const command = interection.client.commands.get(interection.commandName)
    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interection)
    }
    catch (error) {
        console.error(error)
        await interection.reply("Houve um erro ao executar este comando")
    }
});

