module.exports = {
    cmd: ['inv', 'invite'],
    help: ['inv', 'invite'],
    args: ['Reply msg'],
    tags: ['groups'],
    group: true,
    botAdmin: true,
    admin: true,
    exec: async (m, client) => {
        try {
            if (m.quoted) {
                const _user = m.quoted.sender;
                try {
                    await client.groupParticipantsUpdate(m.chat, [_user], 'add')
                } catch (error) {
                    const inviteCode = await client.groupInviteCode(m.chat)
                    let thumb;
                    try { thumb = await client.profilePictureUrl(from, 'image') } catch (e) { thumb = './src/logo.jpg' }
                    await client.sendGroupV4Invite(m.chat, _user, inviteCode, moment().add('3', 'days').unix(), false, thumb)
                    m.reply('```Inviting...```')
                }
            } else {
                m.reply('```' + `Reply to the message of the user you want to invite` + '```')
            }
        } catch (error) {
            m.reply('```' + error + '```')
            console.log(error);
        }
    }
}