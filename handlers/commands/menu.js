const { getDevice } = require("@adiwajshing/baileys")
const { pasaran } = require("../../lib/tgl")
const package = require('../../package.json')
const _ = require('lodash')
const { getBuffer } = require("../../utils")

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const defaultMenu = {
    before: `
Hi Vro *%pushname* 

Your Device is : *%device* 

⌚️ : ${moment().format('HH:mm:ss')}
📆 : ${pasaran().jawa}

*</Join Our Group\>*

https://chat.whatsapp.com/HHKcKNsY3wI26UkF7VYS25

*</Supported links\>*
%links
%readmore`.trimStart(),
    header: '*</%category\>*',
    body: '► %cmd %opts%args %flags',
    footer: '',
    after: '',
}

module.exports = {
    cmd: ['menu', 'help'],
    tags: ['main'],
    help: ['menu', 'help'],
    exec: async (m, client, { plugins }) => {
        let help = Object.values(plugins).filter(plugin => !plugin.disabled && plugin.help || plugin.regex || plugin.startsWith).map(x => {
            return {
                help: Array.isArray(x.tags) ? x.help : [x.help],
                tags: Array.isArray(x.tags) ? x.tags : [x.tags],
                links: x.link != 'undefined' ? x.link : '',
                customPrefix: x.startsWith ? x.startsWith : '',
                opts: x.opts,
                args: x.args,
                flags: x.flags
            }
        })

        let before = defaultMenu.before
        let after = defaultMenu.after
        let header = defaultMenu.header
        let footer = defaultMenu.footer
        let body = defaultMenu.body
        let links = help.filter(x => x.links != undefined).map(x => x.links)

        let category = {};
        for (let plugin of help)
            if (plugin && 'tags' in plugin)
                for (let tag of plugin.tags)
                    category[tag] = _.capitalize(tag);

        let _text = [
            before.replace(/%device/g, getDevice(m.key.id))
                .replace(/%pushname/g, client.pushname)
                .replace(/%readmore/g, readMore)
                .replace(/%links/g, `-${links.join('\n-')}`),
            ...Object.keys(category).map(tag => {
                return header.replace(/%category/g, category[tag]) + '\n' + [
                    ...help.filter(a => a.tags && a.tags.includes(tag) && a.help || a.startsWith).map(menu => {
                        return menu.help.map(help => {
                            return body.replace(/%cmd/g, menu.customPrefix ? menu.customPrefix : prefix + help)
                                .replace(/%opts/g, menu.opts ? `${menu.opts.join(' | ')}` : '')
                                .replace(/%args/g, menu.args ? `<${menu.args.join(' ')}>` : '')
                                .replace(/%flags/g, menu.flags ? `( --${menu.flags.join(' --')} )` : '')
                                .trim()
                        }).join('\n')
                    }),
                    footer
                ].join('\n')
            }),
            after
        ].join('\n')

        const buttonsDefault = [
            { urlButton: { displayText: `𝙱𝚘𝚝 𝚂𝚌𝚛𝚒𝚙𝚝`, url: package.repository.url } },
            { quickReplyButton: { displayText: `𝙾𝚠𝚗𝚎𝚛`, id: `${prefix}owner` } },
        ]
        client.sendMessage(m.chat, {
            caption: _text,
            footer: `❏ Coded by ${package.author} ❏`,
            templateButtons: buttonsDefault,
            location: { jpegThumbnail: (await getBuffer('./src/logo.jpg')).buffer, name: `${package.name}` },
            headerType: 4
        }, { quoted: m })
    }
}

const fs = require('fs')
