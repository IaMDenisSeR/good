module.exports = {
    tags: ['groups'],
    cmd: ['getlink', 'linkgc', 'grouplink'],
    help: ['getlink', 'linkgc', 'grouplink'],
    group: true,
    botAdmin: true,
    admin: false,
    exec: async (m, client) => {
        try {
            const inviteCode = await client.groupInviteCode(m.chat)
            const _text = '```' + `This Group Link https://chat.whatsapp.com/${inviteCode}` + '```'
            let thumb;
            try { thumb = await client.profilePictureUrl(from, 'image') } catch (e) { thumb = './src/logo.jpg' }
            const ms = await client.generateUrlInfo(from, _text, formattedTitle, 'Whatsapp Group Invitation', thumb, m)
            await client.relayMessage(m.chat, ms.message, { messageId: ms.key.id })
        } catch (error) {
            m.reply('```' + error + '```')
            console.log(error);
        }
    }
}