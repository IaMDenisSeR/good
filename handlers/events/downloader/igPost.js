require('dotenv').config()
const { igApi, shortcodeFormatter, IGPostRegex } = require("insta-fetcher");
const { shrt } = require('../../../utils');
let ig = new igApi(process.env.session_id)

module.exports = {
    regex: IGPostRegex,
    link: 'Insta Post',
    exec: async (m, client, { body }) => {
        try {
            m.reply('```Downloading...```')
            let { url } = shortcodeFormatter(body);
            let result = await ig.fetchPost(url);
            let arr = result.links;
            let capt = '*Downloaded Instagram Post*\n';
            capt += '• Name : ' + result.name + '\n';
            capt += '• Username : ' + result.username + '\n';
            capt += '• Likes : ' + result.likes + '\n';
            capt += '• Post Type : ' + result.postType + '\n';
            capt += '• Media Count : ' + result.media_count;
            m.reply(capt)
            if (result.music !== null) {
                const { original_sound_info, music_info } = result.music
                music_meta = original_sound_info !== null ? original_sound_info : music_info
                let idSound = shrt(
                    original_sound_info !== null ? music_meta.progressive_download_url : music_meta.music_asset_info.progressive_download_url,
                    { title: original_sound_info !== null ? `${music_meta.original_audio_title.join('')} - ${music_meta.ig_artist.full_name}` : `${music_meta.music_asset_info.title} - ${music_meta.music_asset_info.display_artist}` }
                )
                let idVideo = shrt(
                    result.links[0].url,
                    { title: `Audio asli - ${result.name}` }
                )
                const btnMusicMeta = [
                    { quickReplyButton: { displayText: `Original Sound`, id: `${prefix}sendthis ${idSound.id}` } },
                    { quickReplyButton: { displayText: `Extract Audio`, id: `${prefix}tomp3 ${idVideo.id}` } },
                ]
                client.sendMessage(
                    m.chat,
                    {
                        footer,
                        templateButtons: btnMusicMeta,
                        video: { url: result.links[0].url },
                        headerType: 4
                    },
                    { quoted: m }
                )
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].type == "image") {
                        await client.sendFileFromUrl(m.chat, arr[i].url, '', m, '', 'jpeg',
                            { height: arr[i].dimensions.height, width: arr[i].dimensions.width }
                        )
                    } else {
                        await client.sendFileFromUrl(m.chat, arr[i].url, '', m, '', 'mp4',
                            { height: arr[i].dimensions.height, width: arr[i].dimensions.width }
                        )
                    }
                }
            }
        } catch (error) {
            console.log(error);
            await m.reply('```' + error + '```')
        }
    }
}
