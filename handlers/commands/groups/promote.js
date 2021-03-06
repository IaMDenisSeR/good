const { delay } = require("@adiwajshing/baileys");
const { parseMention } = require("../../../lib/function");

module.exports = {
    cmd: ['promote', 'pm'],
    help:  ['promote', 'pm'],
    args: ['@user', 'Reply msg'],
    tags: ['groups'],
    group: true,
    botAdmin: true,
    admin: true,
    exec: async (m, client, { prefix, cmd, args }) => {
        try {
            if (m.quoted) {
                const _user = m.quoted.sender;
                await client.groupParticipantsUpdate(m.chat, [_user], 'promote')
            } else if (args.length >= 1 || m.mentionedJid.length >= 1) {
                let _participants = parseMention(body)
                if (_participants.length < 1) return reply('```' + `Tag the user or reply to the message, Ex : ${prefix + cmd} @user` + '```')
                reply(`Promoted *${_participants.length}* group members to be Group Admin within delay 3 seconds to prevent banned`)
                for (let usr of _participants) {
                    await delay(3000)
                    await client.groupParticipantsUpdate(m.chat, [usr], 'promote')
                }
            } else {
                reply('```' + `Tag the user or reply to the message, contoh : ${prefix + cmd} @user` + '```')
            }
        } catch (error) {
            m.reply(util.format(error))
            console.log(error);
        }
    }
}