const { delay } = require("@adiwajshing/baileys");
const { parseMention } = require("../../../lib/function");

module.exports = {
    cmd: ['demote', 'unadmin'],
    help: ['demote'],
    args: ['@user, @user', 'Reply msg'],
    tags: ['groups'],
    group: true,
    botAdmin: true,
    admin: true,
    exec: async (m, client, { prefix, cmd, args }) => {
        try {
            if (m.quoted) {
                const _user = m.quoted.sender;
                await client.groupParticipantsUpdate(m.chat, [_user], 'demote')
            } else if (args.length >= 1 || m.mentionedJid.length >= 1) {
                let _participants = parseMention(body)
                if (_participants.length < 1) return m.reply('```' + `Tag the user or reply to the message, Ex : ${prefix + cmd} @user` + '```')
                m.reply(`Demoted *${_participants.length}* admins to be Group Mmbers within delay 3 seconds to prevent banned`)
                for (let usr of _participants) {
                    await delay(3000)
                    await client.groupParticipantsUpdate(m.chat, [usr], 'demote')
                }
            } else {
                m.reply('```' + `Tag the user or reply to the message, Ex : ${prefix + cmd} @user` + '```')
            }
        } catch (error) {
            m.reply('```' + error + '```')
            console.log(error);
        }
    }
}