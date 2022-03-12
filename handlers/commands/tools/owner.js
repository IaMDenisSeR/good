const { S_WHATSAPP_NET, delay } = require("@adiwajshing/baileys")
const package = require('../../../package.json')
const config = require('../../../src/config.json')

module.exports = {
    tags: ['main'],
    cmd: ['owner', 'creator'],
    help: ['owner'],
    exec: (m, client) => {
        config.owner.map(async (v) => await client.sendContact(m.chat, v.split(S_WHATSAPP_NET)[0], package.author, m))
        await delay(1000)
        const btn = [
            { urlButton: { displayText: `𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙`, url: `https://masgimenz.my.id` } },
            { urlButton: { displayText: `𝚈𝚘𝚞𝚝𝚞𝚋𝚎`, url: `https://www.instagram.com/gimenz.id` } },
            { urlButton: { displayText: `𝙶𝚒𝚝𝙷𝚞𝚋`, url: `https://github.com/WhatsDen` } },
            { urlButton: { displayText: `𝙶𝚒𝚝𝙷𝚞𝚋`, url: `https://github.com/WhatsDen` } },
        ]
        client.sendMessage(m.chat, { text: `Social Media`, footer, templateButtons: btn })
    }
}