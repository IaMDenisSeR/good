const YT = require('../../../lib/yt')
const { isUrl, getBuffer, humanFileSize, secondsConvert } = require('../../../utils')

module.exports = {
    tags: ['downloader'],
    args: ['url'],
    flags: ['vn'],
    cmd: ['ytmp3', 'yta'],
    help: ['ytmp3'],
    exec: async (m, client, { prefix, args, cmd, flags, type }) => {
        try {
            url = args[0]
            if (args.length < 1 || !isUrl(url) || !YT.isYTUrl(url)) return m.reply(`*Use:*\n${prefix}${cmd} url --args\n*args* is optional (can be filled or not)\n\n` +
                `*list args:*\n--metadata : download mp3 with tags metadata\n--vn can be played directly via WA\n\nEx : ${prefix}ytmp3 https://youtu.be/0Mal8D63Zew --metadata`)
            m.reply('```Downloading...```')
            if (type == 'listResponseMessage') {
                const videoID = YT.getVideoID(url)
                const search = await YT.searchTrack(videoID)
                const metadata = search.filter(x => x.id == videoID)[0]
                const dl = await YT.mp3(metadata.url, { Album: metadata.album, Artist: metadata.artist, Image: metadata.image, Title: metadata.title })
                let caption = `Title : ${metadata.title}\n` +
                    `Artist : ${metadata.artist}\n` +
                    `Duration : ${metadata.duration.label}\n` +
                    `Size : ${humanFileSize(dl.size, true)}\n\n...`
                await client.sendFileFromUrl(m.chat, metadata.image, '```' + caption + '```', m)
                await client.sendFile(m.chat, dl.path, m, { fileName: `${metadata.title} - ${metadata.artist}.mp3`, mimetype: 'audio/mp3', jpegThumbnail: (await getBuffer(metadata.image)).buffer, document: true })
            } else {
                let dl = new Set()
                if (flags.find(v => v.toLowerCase() === 'metadata')) {
                    await m.reply('Downloading mp3 [with tags metadata]')
                    const obj = await YT.mp3(url, '', true)
                    dl.add(obj)
                } else {
                    const obj = await YT.mp3(url)
                    dl.add(obj)
                }
                dl = [...dl][0]
                let caption = `Title : ${dl.meta.title}\n` +
                    `Channel : ${dl.meta.channel}\n` +
                    `Duration : ${secondsConvert(dl.meta.seconds)}\n` +
                    `Size : ${humanFileSize(dl.size, true)}`
                m.reply(caption)
                if (flags.find(v => v.toLowerCase() === 'vn')) {
                    await client.sendFile(m.chat, dl.path, m, { audio: true, jpegThumbnail: (await getBuffer(dl.meta.image)).buffer, unlink: true })
                } else {
                    await client.sendFile(m.chat, dl.path, m, { fileName: `${dl.meta.title}.mp3`, mimetype: 'audio/mp3', document: true, jpegThumbnail: (await getBuffer(dl.meta.image)).buffer, unlink: true })
                }
            }
        } catch (error) {
            m.reply('```' + error + '```')
            console.log(error);
        }
    }
}
