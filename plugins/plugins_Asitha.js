const { SinhalaSub } = require('@sl-code-lords/movie-api');
const { cmd } = require('../command');
const os = require("os");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson } = require('../lib/functions');
const axios = require('axios');
const { PixaldrainDL } = require("pixaldrain-sinhalasub");
//const { getMovies, getMovieDL, getMoviesSearch } = require('dark-yasiya-sinhalasub.lk');
const config = require('../config')
const { igdl } = require('ruhend-scraper')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')
const { File } = require('megajs')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();

async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}


function formatNumber(num) {
    return String(num).padStart(2, '0');
} 


const yourName = "*POWERED by ASITHA-MD*"; // YOURBOTNAME 💚 කියන තැනට ඔයාගේ බොට්ගේ නම හරි ඔයාගෙ නම හරි දාන්න.




//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    react: "🎥",
    desc: "download tw videos",
    use: '.twitter < Link >',
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me twitter url ❌*")
        m.react('⬇️')
        //fetch data from api  
        //let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        let data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/twitter?url=${q}`)
	reply("*Downloading...*")
        //send video (hd,sd)
        m.react('⬆️')
        await conn.sendMessage(from, { video: { url: data.result.video_sd}, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })
        m.react('✅')
        await conn.sendMessage(from, { video: { url: data.result.video_hd}, mimetype: "video/mp4", caption: `> ${yourName}` }, { quoted: mek })  
        m.react('✅')
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.result.video_sd }, mimetype: "audio/mpeg" }, { quoted: mek })  
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//gdrive(google drive) dl
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    react: "📀",
    desc: "download gdrive files",
    use: '.gdrive < Link >',
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q || !q.startsWith("https://")) return reply("*give me gdrive url ❌*");

        m.react('⬇️');
        // Fetch data from API
        let data = await fetchJson(`https://api.fgmods.xyz/api/downloader/gdrive?url=${q}&apikey=mnp3grlZ`);

        if (!data.result) return reply("*Failed to fetch the download details ❌*");

        reply("*Downloading...⏳*");
        m.react('⬆️');

        // Extract file extension and MIME type
        let fileName = data.result.fileName || "unknown_file";
        let downloadUrl = data.result.downloadUrl;
        let mimeType = data.result.mimetype;

        // Derive MIME type if missing
        if (!mimeType) {
            const ext = fileName.split('.').pop().toLowerCase();
            mimeType = ext === 'mp4' ? 'video/mp4' :
                       ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                       ext === 'png' ? 'image/png' :
                       ext === 'pdf' ? 'application/pdf' :
                       'application/octet-stream'; // Default fallback
        }

        // Validate download URL
        if (!downloadUrl) return reply("*Invalid download URL ❌*");

        // Send file
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: fileName,
            mimetype: mimeType,
            caption: `${fileName}\n\n> Downloaded via bot`
        }, { quoted: mek });

        m.react('✅');
    } catch (e) {
        console.error(e);
        reply("*An error occurred while processing your request ❌*");
    }
});


cmd({
    pattern: "gdrivegini",
    react: "📀",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        
        m.react('⬇️');

        let url = q.split(" & ")[0]
	let img = q.split(" & ")[1]


	let down = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/ginisisila?url=${url}`);
        let downurl = down.result.dl_link
	reply(downurl)
        // Fetch data from API
        let data = await fetchJson(`https://api.fgmods.xyz/api/downloader/gdrive?url=${downurl}&apikey=mnp3grlZ`);

        if (!data.result) return reply("*Failed to fetch the download details ❌*");
        m.react('⬆️');

        // Extract file extension and MIME type
        let fileName = data.result.fileName || "unknown_file";
        let downloadUrl = data.result.downloadUrl;
        let mimeType = data.result.mimeType;

        // Derive MIME type if missing
        if (!mimeType) {
            const ext = fileName.split('.').pop().toLowerCase();
            mimeType = ext === 'mp4' ? 'video/mp4' :
                       ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                       ext === 'png' ? 'image/png' :
                       ext === 'pdf' ? 'application/pdf' :
                       'application/octet-stream'; // Default fallback
        }


          const adReply = {
            title: "ASITHA-MD",
            body: "ASITHA-MD",
            thumbnailUrl: img, // Path to thumbnail image
            sourceUrl: downloadUrl // The URL to redirect when clicking the banner
        };

	    
        // Validate download URL
        if (!downloadUrl) return reply("*Invalid download URL ❌*");

	    
        // Send file
        await conn.sendMessage(from, {
            document: { url: downloadUrl },
            fileName: fileName,
            mimetype: mimeType,
            caption: `${fileName}\n\n> Downloaded via bot`,
	    contextInfo: { externalAdReply: adReply }
        }, { quoted: mek });

        m.react('✅');
    } catch (e) {
        console.error(e);
        reply("*An error occurred while processing your request ❌*");
    }
});
//mediafire dl
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    react: "📚",
    desc: "download mfire files",
     use: '.mediafire < Link >',
    category: "download",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("*give me mediafire url ❌*")
        m.react('⬇️')
        //fetch data from api  
        //let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`)
        let data = await fetchJson(`https://dark-yasiya-api-new.vercel.app/download/mfire?url=${q}`)
	reply("*Downloading...*")
        m.react('⬆️')
        await conn.sendMessage(from, { document: { url: data.result.dl_link }, fileName: data.result.fileName, mimetype: data.result.file_type, caption: `${data.result.fileName}\n\n${yourName}` }, { quoted: mek })                                                                                                                 
        m.react('✅')
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
//instgarm download 


cmd({

    pattern: "ig",
    desc: "To get the bot informations.",
    react: "🎥",
    use: '.ig < Link >',
    category: "download",
    filename: __filename

},

async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {

try{
    
if (!q) return m.reply(`Please Give Me a vaild Link...`);
m.react('⬇️')

         let res = await igdl(q);
        
         let data = await res.data;
         for (let i = 0; i < 20; i++) {
            let media = data[i];
            let downloadurl = media.url
             m.react('⬆️')
            await conn.sendMessage(from,{video: {url:downloadurl},mimetype:"video/mp4",caption: `> ${yourName}`},{quoted:mek})
             m.react('✅')
         }

}catch(e){
console.log(e)
}
})



cmd({
    pattern: "apk",
    react: '🗽',
    desc: "Download apk.",
    use: '.apk < Link or Name>',
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
try {

await m.react("🔄")
      
const apiUrl = `http://ws75.aptoide.com/api/7/apps/search/query=${q}/limit=1`;
const response = await axios.get(apiUrl);
const data = response.data;

let step1 = data.datalist.list[0].size % 1000000
let step2 = `.` + step1
let step3 = data.datalist.list[0].size / 1000000
let correctsize = step3 - step2
    
let desc = `
*「 𝗔𝗣𝗞 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥 」*
*╭──📦 APK Details 📦──◦•◦❥•*
*╎*
*╎* *🏷️ Nᴀᴍᴇ :* ${data.datalist.list[0].name}
*╎* *📦 Sɪᴢᴇ :* ${correctsize}MB
*╎* *🔖 Pᴀᴄᴋᴀɢᴇ :* ${data.datalist.list[0].package}
*╎* *📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* ${data.datalist.list[0].updated}
*╎* *👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* ${data.datalist.list[0].developer.name}
*╎*
*╰───────────────◦•◦❥•*\n\n\> *POWERED by ASITHA-MD*`

await conn.sendMessage(from,{image: {url: data.datalist.list[0].icon},caption: desc},{quoted: mek})
await conn.sendMessage(from,{document: {url: data.datalist.list[0].file.path_alt},fileName: data.datalist.list[0].name,mimetype: 'application/vnd.android.package-archive',caption: `> *POWERED by ASITHA-MD*`},{quoted: mek})
        
await m.react("✅")

}catch(e){
console.log(e)
reply(`${e}`)
}
})



cmd({
    pattern: "mega",
    category: "download",
    react: "⬇️",
    use: '.mega < Link >',
    desc: "Download Mega file and send it.",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q || !isUrl(q) || !q.includes('mega.nz')) {
            return reply("Please provide a valid Mega.nz file URL.")
        }

        // Extract file link and key (if present)
        const [fileURL, fileKey] = q.split("#");

        if (!fileKey) {
            return reply("Error: Decryption key is missing in the provided URL.");
        }

        // Use File.fromURL() to create a valid file instance
        const file = File.fromURL(`${fileURL}#${fileKey}`);

        // Track progress
        file.on('progress', (bytesLoaded, bytesTotal) => {
            const percent = (bytesLoaded / bytesTotal * 100).toFixed(2);
            reply(`Downloading: ${percent}% (${(bytesLoaded / 1024 / 1024).toFixed(2)} MB of ${(bytesTotal / 1024 / 1024).toFixed(2)} MB)`);
        });

        const buffer = await file.downloadBuffer();  // Download the file as a buffer

        // Send the file as a document
        await conn.sendMessage(from, { document: buffer, mimetype: "application/octet-stream", fileName: "mega_downloaded_file" }, { quoted: mek });
        reply("File sent successfully!");

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});















cmd({
    pattern: "download",
    react: "☠️",
    alias: ["dn"],
    desc: "Movie download",
    category: "extra",
    use: '.download < Direct Link >',
    dontAddCommandList: false,
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        

        if (!q) return reply('❗ කරුණාකර download link එකක් ලබා දෙන්න.');

        const data = q.trim();
        const urlRegex = /^(https?:\/\/[^\s]+)/;

        // URL එකේ format එක validate කරනවා
        if (!urlRegex.test(data)) {
            return reply('❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න.');
        }

        await conn.sendMessage(from, { react: { text: '⬇️', key: mek.key } });

        // Document (file) එක යවනවා
        await conn.sendMessage(from, { 
            document: { url: data },
            caption: `\n\n> *POWERED by ASITHA-MD*`,
            mimetype: "video/mp4",
            fileName: `☠️ASITHA-MD☠️.mp4`
        });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('❗ Error: ' + e.message);
    }
});

cmd({
    pattern: "downjid",
    react: "✔️",
    alias: ["upmv"],
    desc: "Movie Searcher",
    category: "extra",
    use: '.downjid < Jid > & < Name >',
    dontAddCommandList : false ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const premiumUsers = await getPremiumUsers();
        const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Check if the sender is a premium user
        
if ( !m.quoted ) return reply('*ℹ Please mention a Derect Link*')
if ( !q ) return 
const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1] 
 await conn.sendMessage(data, { document : { url : m.quoted.msg  } ,caption: `\n${datas}\n\n> *POWERED by ASITHA-MD*`  ,mimetype: "video/mp4" , fileName: `🎬 ASITHA-MD 🎬\n${datas}.mp4` } )
		} catch (e) {
reply('❗ Error' + e )
l(e)
}
})

//===============??????????///??=-;#-#7#/2?#=#--2=


















































































//*#*#8#-#8#?#(#





cmd({
    pattern: "loading",
    react: "⬇️",
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {

const ad_mg = await conn.sendMessage(from, { text: '````LOADING..```' }, { quoted: mek });

var asithalod = [
  "[■□□□□□□□□□□□]",
  "[■■■□□□□□□□□□]",
  "[■■■■■□□□□□□□]",
  "[■■■■■■■□□□□□]",
  "[■■■■■■■■■□□□]",
  "[■■■■■■■■■■□□]",
  "[■■■■■■■■■■■□]",
  "[■■■■■■■■■■■■]",
  "[■□□□□□□□□□□□]",
  "[■■■□□□□□□□□□]",
  "[■■■■■□□□□□□□]",
  "[■■■■■■■□□□□□]",
  "[■■■■■■■■■□□□]",
  "[■■■■■■■■■■□□]",
  "[■■■■■■■■■■■□]",
  "[■■■■■■■■■■■■]",
  "[■□□□□□□□□□□□]",
  "[■■■□□□□□□□□□]",
  "[■■■■■□□□□□□□]",
  "[■■■■■■■□□□□□]",
  "[■■■■■■■■■□□□]",
  "[■■■■■■■■■■□□]",
  "[■■■■■■■■■■■□]",
  "[■■■■■■■■■■■■]",
  "[■□□□□□□□□□□□]",
  "[■■■□□□□□□□□□]",
  "[■■■■■□□□□□□□]",
  "[■■■■■■■□□□□□]",
  "[■■■■■■■■■□□□]",
  "[■■■■■■■■■■□□]",
  "[■■■■■■■■■■■□]",
  "[■■■■■■■■■■■■]"
];

let { key } = await conn.sendMessage(from, { text: '....' }, { quoted: mek });

for (let i = 0; i < asithalod.length; i++) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
  await conn.sendMessage(from, { text: asithalod[i], edit: key });
}





} catch (e) {
        reply('❗ Error: ' + e);
    }
});














cmd({
    pattern: "dbl",
    react: "⬇️",
    filename: __filename
},
async(conn, mek, m, { from, q, sender, reply }) => {
    try {
      const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        
        const link = q.split(" & ")[0]
        const titel = q.split(" & ")[1] 
        const si = q.split(" & ")[2]     

        if (!link) return reply('❗ කරුණාකර download link එකක් ලබා දෙන්න.');

        const urlRegex = /^(https?:\/\/[^\s]+)/;

        // URL එකේ format එක validate කරනවා
        if (!urlRegex.test(link)) {
            return reply('❗ දීලා තියෙන URL එක වැරදි. කරුණාකර link එක හොඳින් බලන්න.');
        }
const ad_mg = await conn.sendMessage(from, { text : 'ᴜᴘʟᴏᴀᴅɪɴɢ file...📥' }, {quoted: mek} )
	    
var asithalod = [
  "[■□□□□□□□□□□□] 0%",
  "[■■■□□□□□□□□□] 15%",
  "[■■■■■□□□□□□□] 30%",
  "[■■■■■■■□□□□□] 45%",
  "[■■■■■■■■■□□□] 60%",
  "[■■■■■■■■■■□□] 75%",
  "[■■■■■■■■■■■□] 90%",
  "[■■■■■■■■■■■■] 100%",
  "*👀 Please wait, downloading...*"
];
let { key } = await conn.sendMessage(from, {text: 'ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ ᴜᴘʟᴏᴀᴅᴇᴅ ᴍᴀɢɴᴇᴛ ꜰɪʟᴇ ✅...' , edit : ad_mg.key }, {quoted: mek})

for (let i = 0; i < asithalod.length; i++) {
await conn.sendMessage(from, {text: asithalod[i], edit: key })
}
        await conn.sendMessage(from, { react: { text: '⬆️', key: mek.key } });

        // Document (file) එක යවනවා
        await conn.sendMessage(from, { 
            document: { url: link },
            caption: `\n*${titel}*\n\n> *${si}*\n\n> *POWERED by ASITHA-MD*`,
            mimetype: "video/mp4",
            fileName: `🎬 ASITHA-MD 🎬${titel}.mp4`
        });

        await conn.sendMessage(from, { react: { text: '✅', key: mek.key } });
    } catch (e) {
        reply('❗ Error: ' + e);
    }
});





//==========





cmd({
    pattern: "forward",
    desc: "forward msgs",
    alias: ["fo"],
    category: "owner",
    use: '.forward < Jid address >',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

if (!isOwner) {
	return reply("*Owner Only ❌*")}
	
if (!q || !m.quoted) {
reply("*give me message ❌*")
}



let p;
let message = {}

            message.key = mek.quoted?.fakeObj?.key;

            if (mek.quoted?.documentWithCaptionMessage?.message?.documentMessage) {
            
		let mime = mek.quoted.documentWithCaptionMessage.message.documentMessage.mimetype

const mimeType = require('mime-types');
let ext = mimeType.extension(mime);		    

                mek.quoted.documentWithCaptionMessage.message.documentMessage.fileName = (p ? p : mek.quoted.documentWithCaptionMessage.message.documentMessage.caption) + "." + ext;
            }

            message.message = mek.quoted;
const mass =  await conn.forwardMessage(q, message, false)
return reply(`*Message forwarded to:*\n\n ${q}`)
            
})

