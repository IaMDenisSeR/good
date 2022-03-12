const YT = require('../../../lib/yt')

module.exports = {
    tags: ['downloader'],
    cmd: ['play'],
    args: ['title - artist'],
    help: ['play'],
    exec: async (m, client, { prefix, args, cmd }) => {
        try {
            if (args.length < 1) return m.reply(`*The search feature for songs is full of metadata tags, it is highly recommended to enter the right song title*\n${prefix}${cmd} title - artis\n\nEx : ${prefix}${cmd} Take me - to church`)
            const arr = await YT.searchTrack(args.join(' '))
            let list = new Array();
            let desc = `\n*Matched Songs*\n\n`
            for (let i = 11; i < arr.length; i++) {
                list.push({
                    title: `${arr[i].title}`,
                    description: ``,
                    rowId: `${prefix}ytmp3 ${arr[i].url}`
                });
            }
            await client.sendListM(
                m.chat,
                { buttonText: 'Download', description: desc, title: 'Choose Your Song..' },
                list,
                m
            )
        } catch (error) {
            m.reply(error)
            console.log(error);
        }
    }
}