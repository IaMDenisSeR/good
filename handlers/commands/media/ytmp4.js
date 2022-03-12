const YT = require('../../../lib/yt')
const { isUrl, secondsConvert } = require('../../../utils')

module.exports = {
    tags: ['downloader'],
    cmd: ['ytmp4', 'ytv'],
    args: ['url'],
    help: ['ytmp4', 'ytv'],
    exec: async (m, client, { prefix, args, cmd, flags }) => {
        if (args.length < 1 || !isUrl(url) || !YT.isYTUrl(url)) return m.reply('```Give A Youtube Link```')
        try {
            m.reply('```Downloading...```')
            const video = await YT.mp4(url)
            let caption = `Title : ${video.title}\n` +
                `Channel : ${video.channel}\n` +
                `Published : ${video.date}\n` +
                `Quality : ${video.quality}\n` +
                `Duration : ${secondsConvert(video.duration)}`
            m.reply(caption)
            await client.sendFileFromUrl(m.chat, video.videoUrl, '', m)
        } catch (error) {
            m.reply('``` + error + '```')
            console.log(error);
        }
    }
}