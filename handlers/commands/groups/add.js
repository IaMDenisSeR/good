const { formatPhone } = require("../../../utils")

module.exports = {
    cmd: ['add'],
    startsWith: ['add'],
    help: ['add'],
    args: ['91xxx, 687xxx, 500xxx'],
    tags: ['groups'],
    group: true,
    botAdmin: true,
    admin: true,
    exec: async (m, client, { prefix, cmd, args }) => {
        if (args.length < 1) return m.reply(`example: ${prefix + cmd} 6877xxx, +507-xxxx, 085236xxx`)
        try {
            let _participants = args.join(' ').split`,`.map(v => formatPhone(v.replace(/[^0-9]/g, '')))
            let users = (await Promise.all(
                _participants.filter(async x => {
                    (await client.onWhatsApp(x)).map(x => x.exists)
                }))
            )
            await client.groupParticipantsUpdate(m.chat, users, 'add').then(res => console.log(res)).catch(e => console.log(e))
        } catch (error) {
            m.reply('```' + error + '```')
            console.log(error);
        }
    }
}