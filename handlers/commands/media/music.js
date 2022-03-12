const YT = require('../../../lib/yt');

module.exports = {
    tags: ['downloader'],
    cmd: ['music'],
    args: ['title - artis'],
    help: ['music'],
    exec: async (m, client, { prefix, args, cmd }) => {
        try {
            if (args.length < 1) return m.reply(`The search feature for songs is full of metadata tags, it is highly recommended to enter the right song title\n${prefix}${cmd} judul - artis\n\nEx : ${prefix}${cmd} ocean of promise - bima tarore`)
            m.reply('```Downloading...```')
            const search = await YT.searchTrack(args.join(' '))
            let caption = `Source : ${search[0].isYtMusic ? 'YouTube Music' : 'YouTube'}\n` +
                `Title : ${search[0].title}\n` +
                `Artist : ${search[0].artist}\n` +
                `Duration : ${search[0].duration.label}`
            await client.sendFileFromUrl(m.chat, search[0].image, '```' + caption + '```', m)
            const lagu = await YT.downloadMusic(search)
            await client.sendFile(m.chat, lagu.path, m, { fileName: lagu.meta.title + '.mp3', mimetype: 'audio/mp3', document: true, unlink: true })
        } catch (error) {
            m.reply(util.format(error))
            console.log(error);
        }
    }
}