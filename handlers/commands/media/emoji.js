const { cropStyle, Sticker } = require("../../../utils/sticker")
const package = require("../../../package.json")

module.exports = {
    tags: ['sticker', 'media'],
    flags: ['style'],
    args: ['emoji'],
    cmd: ['emoji'],
    help: ['emoji'],
    exec: async (m, client, { flags, args, body, prefix, cmd }) => {
        try {
            let vendor = ['apple', 'google', 'samsung', 'microsoft', 'whatsapp', 'twitter', 'facebook', 'skype', 'joypixels', 'openmoji', 'emojidex', 'messenger', 'lg', 'htc', 'mozilla']
            const emojiRegex = require('emoji-regex')()
            if ([...body.matchAll(emojiRegex)].length > 1) return m.reply('```Can only convert 1 emoji only```')
            const res = await Sticker.emoji(args[0], flags[0])
            if (res == undefined) return m.reply(`emoji tidak tersedia\n\ncontoh style : ${prefix + cmd} --style\nlist style:\n\n--${vendor.join('\n--')}`)
            const data = new Sticker(res.url.replace('/thumbs/120/', '/thumbs/320/'), { packname: package.name, author: package.author })
            await client.sendMessage(m.chat, await data.toMessage(), { quoted: m })
        } catch (error) {
            m.reply('emoji not supported, try another one.\n\nDo Note! that not all emojis are supported')
            console.log(error);
        }
    }
}