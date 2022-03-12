const { EightD } = require("../../../lib/converter")

module.exports = {
    tags: ['converter'],
    cmd: ['8d', 'eightd'],
    args: ['Reply audio'],
    help: ['8d', 'eightd'],
    exec: async (m, client, { prefix, cmd }) => {
        try {
            let mediaType = m.quoted ? m.quoted.mtype : m.mtype
            let msg = m.quoted ? m.quoted : m
            if (/audio|video|document/i.test(mediaType)) {
                const buffer = await client.downloadMediaMessage(msg)
                const res = await EightD(buffer)
                await client.sendFile(m.chat, res, m, { audio: true })
            } else {
                m.reply(`Reply a video with caption ${prefix}${cmd}`)
            }
        } catch (error) {
            console.log(error);
            m.reply('```' + error + '```')
        }
    }
}