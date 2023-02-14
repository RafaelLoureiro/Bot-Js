const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Renponde com 'Oiee!"),

    async execute(interection) {
        await interection.reply("Oiee!")

    }
} 