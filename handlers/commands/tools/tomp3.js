const { toAudio } = require("../../../lib/converter")
const { getRandom } = require("../../../lib/function")
const fs = require('fs')

module.exports = {
    tags: ['tools', 'converter'],
    cmd: ['tomp3', 'mp3'],
    args: ['Reply/send video'],
    help: ['tomp3', 'mp3'],
    exec: async (m, client, { prefix, args, cmd }) => {
        try {
            if (m.quoted.mtype === 'videoMessage') {
                const buffer = await client.downloadMediaMessage(m.quoted)
                const res = await toAudio(buffer)
                await client.sendFile(m.chat, res, m, { audio: true })
            } else if (m.mtype == 'templateButtonReplyMessage') {
                let id = tempDB.filter(x => x.id == args[0])[0]
                const res = await toAudio(id.url)
                await client.sendFile(from, res, m, { document: true, mimetype: 'audio/mp3', fileName: id.title + '.mp3' })
            } else {
                m.reply(`Reply a video with caption ${prefix}${cmd}`)
            }
        } catch (error) {
            console.log(error);
            m.reply('```' + error + '```')
        }
    }
}