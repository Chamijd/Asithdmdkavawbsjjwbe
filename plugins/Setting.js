const axios = require('axios')
const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
var { updateCMDStore,isbtnID,getCMDStore,getCmdForCmdId,connectdb,input,get, updb,updfb } = require("../lib/asitha")
cmd({
    pattern: "apply",
    react: "🛡️",
    alias: ["add",'set'],
    desc: "desc2",
    category: "owner",
    use: '.apply <Text>',
    filename: __filename
},
async(conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
if(!q) return reply("Please give me text")
  
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'prefix ' + q,buttonText: {displayText: ' SET PREFIX'}, type: 1},
  {buttonId: prefix + 'alivemessage ' + q, buttonText: {displayText: ' ALIVE MESSAGE'}, type: 1},
  {buttonId: prefix + 'newsjid ' + q, buttonText: {displayText: ' AUTO NEWS SEND'}, type: 1}
]

let desc = `*「 APPLY PANEL 」*
*Input :* ${q}`

const buttonMessage = {
    image: { url:`${LOGO}`},
    caption: desc,
    footer: FOOTER,
    buttons: buttons,
    headerType: 3
}
return await conn.buttonMessage(from, buttonMessage, mek)
} catch (e) {
console.log(e)
reply(e)
}
})
cmd({
    pattern: "setting",
    react: "🛡️",
    alias: ["settings",'botsetting'],
    desc: "desc2",
    category: "owner",
    use: '.settings',
    filename: __filename
},
async(conn, mek, m, { from, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("❌ *Owner only*")

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;

const sections = [{
title: 'MODE',
rows: [{
title: 'PUBLIC',
description: '',
rowId: prefix + 'mode public'
},{
title: 'PRIVATE',
description: '',
rowId: prefix + 'mode private'
},{
title: 'GROUPS',
description: '',
rowId: prefix + 'mode groups'
},{
title: 'INBOX',
description: '',
rowId: prefix + 'mode inbox'
}]
},
		  
{
title: 'AUTO READ STATUS',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'autoreadsratus true'	
},{
title: 'False',
description: '',
rowId: prefix + 'autoreadsratus false'	
}]	
},
		  
{
title: 'AUTO REPLY',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'autoreply true'
},{
title: 'False',
description: '',
rowId: prefix + 'autoreply false'	
}]
},
		 
{
title: 'AUTO VOICE',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'autovoice true'
},{
title: 'False',
description: '',
rowId: prefix + 'autovoice false'	
}]
},

{
title: 'AUTO STICKER',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'autosticker true'
},{
title: 'False',
description: '',
rowId: prefix + 'autosticker false'	
}]
},

{
title: 'ANTI BAD',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'antibad true'
},{
title: 'False',
description: '',
rowId: prefix + 'antibad false'	
}]
},

{
title: 'ANTI LINK',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'antilink true'
},{
title: 'False',
description: '',
rowId: prefix + 'antilink false'	
}]
},

{
title: 'ANTI BOT',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'antibot true'
},{
title: 'False',
description: '',
rowId: prefix + 'antibot false'	
}]
},
		 
{
title: 'ALLWAYS OFFLINE',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'alwaysoffline true'
},{
title: 'False',
description: '',
rowId: prefix + 'alwaysoffline false'	
}]
},
		 
{
title: 'READ COMMAND',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'readcommand true'
},{
title: 'False',
description: '',
rowId: prefix + 'readcommand false'	
}]
},

{
title: 'RECORDING',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'recording true'
},{
title: 'False',
description: '',
rowId: prefix + 'recording false'	
}]
},

{
title: 'AUTO REACT',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'autoreact true'
},{
title: 'False',
description: '',
rowId: prefix + 'autoreact false'	
}]
},

{
title: 'BAD NO BLOCK',
rows: [{
title: 'True',
description: '',
rowId: prefix + 'badno true'
},{
title: 'False',
description: '',
rowId: prefix + 'badno false'	
}]
}] 
	    
const listMessage = {
text: `*「 SETTING PANEL 」*`,
  
footer: "> *POWERED by ASITHA-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})
        


cmd({
    pattern: "prefix",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("PREFIX")
if(gett === q) return await reply("*Allready Done*")
await input("PREFIX", q)
await reply("*PREFIX updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "alivemessage",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")

let gett = await get("ALIVE_MSG")
if(gett === q) return await reply("*Allready Done*")
await input("ALIVE_MSG", q)
await reply("*ALIVE MESSAGE updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})


cmd({
    pattern: "mode",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("MODE")
if(gett === q) return await reply("*Allready Done*")
await input("MODE", q)
await reply("*MODE updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "autoreply",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("AUTO_REPLY")
if(gett === q) return await reply("*Allready Done*")
await input("AUTO_REPLY", q)
await reply("*AUTO REPLY updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "autoreadsratus",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("AUTO_READ_STATUS")
if(gett === q) return await reply("*Allready Done*")
await input("AUTO_READ_STATUS", q)
await reply("*AUTO READ STATUS updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "autovoice",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("AUTO_VOICE")
if(gett === q) return await reply("*Allready Done*")
await input("AUTO_VOICE", q)
await reply("*AUTO VOICE updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "autosticker",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("AUTO_STICKER")
if(gett === q) return await reply("*Allready Done*")
await input("AUTO_STICKER", q)
await reply("*AUTO STICKER updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "antibad",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("ANTI_BAD")
if(gett === q) return await reply("*Allready Done*")
await input("ANTI_BAD", q)
await reply("*ANTI BAD updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "antilink",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("ANTI_LINK")
if(gett === q) return await reply("*Allready Done*")
await input("ANTI_LINK", q)
await reply("*ANTI LINK updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "antibot",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("ANTI_BOT")
if(gett === q) return await reply("*Allready Done*")
await input("ANTI_BOT", q)
await reply("*ANTI BOT updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "alwaysoffline",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("ALLWAYS_OFFLINE")
if(gett === q) return await reply("*Allready Done*")
await input("ALLWAYS_OFFLINE", q)
await reply("*ALLWAYS OFFLINE updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "readcommand",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("READ_CMD")
if(gett === q) return await reply("*Allready Done*")
await input("READ_CMD", q)
await reply("*READ COMMANDS updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "autoreact",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("AUTO_REACT")
if(gett === q) return await reply("*Allready Done*")
await input("AUTO_REACT", q)
await reply("*AUTO REACT updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
cmd({
    pattern: "recording",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("RECORDING")
if(gett === q) return await reply("*Allready Done*")
await input("RECORDING", q)
await reply("*RECORDING updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})

cmd({
    pattern: "newsjid",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("NEWS_JID")
if(gett === q) return await reply("*Allready Done*")
await input("NEWS_JID", q)
await reply("*NEWS JID updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})


cmd({
    pattern: "badno",
    dontAddCommandList: true,
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
if (!isMe) return await reply("Owner only")
let gett = await get("BAD_NO_BLOCK")
if(gett === q) return await reply("*Allready Done*")
await input("BAD_NO_BLOCK", q)
await reply("*BAD NO BLOCK updated: " + q + "*")

} catch (e) {
reply('*Error !!*')
console.log(e)
}
})
