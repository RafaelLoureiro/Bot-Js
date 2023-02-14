const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Escutando aquela playlist Top!"),

    async execute(interection) {
        await interection.reply("https://music.amazon.com.br/playlists/B07WV5JBRS")

    }
} 