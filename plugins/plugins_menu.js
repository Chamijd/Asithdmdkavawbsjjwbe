
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')
const axios = require('axios')
const config = require('../config')
function formatNumber(num) {

    return String(num).padStart(2, '0');
}

cmd({
  pattern: "menu",
  react: "📂",
  alias: ["panel","list","commands"],
  desc: "Get bot\'s command list.",
  category: "main",
  use: '.menu',
  filename: __filename
},
async(conn, mek, m,{from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'extra' ,buttonText: {displayText: ' MOVIE'}, type: 1},
  {buttonId: prefix + 'ownermenu' , buttonText: {displayText: ' OWNER'}, type: 1},
  {buttonId: prefix + 'aimenu' , buttonText: {displayText: ' AI'}, type: 1},
  {buttonId: prefix + 'searchmenu' , buttonText: {displayText: ' SEARCH'}, type: 1},
  {buttonId: prefix + 'downloadmenu' , buttonText: {displayText: ' DOWNLOAD'}, type: 1},
  {buttonId: prefix + 'funmenu' , buttonText: {displayText: ' FUN'}, type: 1},
  {buttonId: prefix + 'mainmenu' , buttonText: {displayText: ' MAIN'}, type: 1},
  {buttonId: prefix + 'groupmenu' , buttonText: {displayText: ' GROUP'}, type: 1},
  {buttonId: prefix + 'convertmenu' , buttonText: {displayText: ' CONVERT'}, type: 1},
  {buttonId: prefix + 'othermenu' , buttonText: {displayText: ' OTHER'}, type: 1}

]

let text = `*HELLO* ${pushname}

*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*
*╭──────────●●►*
*│⚜️ LIST MENU*
*│   ───────*`


const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: text,
    footer: '*╰───────────●●►*\n\n' + FOOTER,
    buttons: buttons,
    headerType: 2
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
console.log(e)
reply(e)
}
})

cmd({
    pattern: "downmenu",
    react: "📥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ DOWNLOAD MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "extra",
    react: "🎥",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'extra'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ MOVIE MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
    
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "searchmenu",
    react: "🔎",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ SEARCH MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})


cmd({
    pattern: "convertmenu",
    react: "",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'convert'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ CONVERT MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})


cmd({
    pattern: "othermenu",
    react: "👾",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'other'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ OTHER MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
  pattern: "ownermenu",
  react: "👨‍💻",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'owner'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ OWNER MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
console.log(e)
reply(`❌ *Error Accurated !!*\n\n${e}`)
}
} )

cmd({
  pattern: "aimenu",
  react: "👨‍🔧",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'ai'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ AI MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
  pattern: "groupmenu",
  react: "🎩",
  dontAddCommandList: true,
  filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ GROUP MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
} catch (e) {
const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(msr.replyMsg.erro)
}
})

cmd({
    pattern: "mainmenu",
    react: "🎀",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{
  let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ MAIN MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
  } catch (e) {
  const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
  await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
  console.log(e)
  reply(msr.replyMsg.erro)
  }
  })

  cmd({
    pattern: "funmenu",
    react: "🎈",
    dontAddCommandList: true,
    filename: __filename
  },
  async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
  try{ 
  let prefix = config.PREFIX;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let HEADER = ownerdata.header;
let pp =''  

for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'fun'){
  if(!commands[i].dontAddCommandList){
pp +=  `*╭──────────●●►*\n*│Command:* ${commands[i].pattern}\n*│Use:* ${commands[i].use}\n*╰──────────●●►*\n\n`
}}};

let menuc = `
HELLO ${pushname}
*╭─「 ᴄᴏᴍᴍᴀɴᴅꜱ ᴘᴀɴᴇʟ」*
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*╰──────────●●►*

*╭──────────●●►*
*│⚜️ FUN MENU*
*╰──────────●●►*
${pp}
${FOOTER}
`

await conn.sendMessage(from, 
  { 
    image: { url: LOGO },
    caption: menuc,
    contextInfo: { 
      mentionedJid: [m.sender],
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363314182963253@newsletter',
        newsletterName: "乡𝔸𝕊𝕀𝕋ℍ𝔸 𝕞𝕕 ࿐",
        serverMessageId: 999
      }
    }
  }, 
  { quoted: mek }
);
  } catch (e) {
  const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json'))
  await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
  console.log(e)
  reply(msr.replyMsg.erro)
  }
  })
