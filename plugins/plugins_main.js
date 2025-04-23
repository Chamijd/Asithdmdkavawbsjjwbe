const config = require('../config'); 
const {cmd , commands} = require('../command')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, Func, fetchJson} = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "repo",
    desc: "bot repo",
    react: "🤖",
    category: "main",
    use :".repo",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.videourl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.header;
let prefix = config.PREFIX;
let repo =`
*╭──────────────●●►*
*| 𝙾𝚆𝙽𝙴𝚁 𝙽𝚄𝙼𝙱𝙴𝚁:* 94789123880 
*| 𝙰𝚂𝙸𝚃𝙷𝙰-𝙼𝙳 𝚁𝙴𝙿𝙾:* https://github.com/ASITHA-MD/ASITHA-MD
*| 𝙱𝙾𝚃 𝚄𝙿𝙳𝙴𝚃𝙰 𝙽𝙴𝚆𝚂 :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
*╰──────────────●●►*

${FOOTER}
`


await conn.sendMessage(from, 
  { 
    video: { url: LOGO }, // මෙහි LOGO වෙනුවට ඔබගේ video url එක යොදන්න
    caption: repo,
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
    pattern: "system",
    desc: "Check runtime, owner & more...",
    category: "main",
    use :".system",
    react: "🛠️",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  const msr =await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')


let status = `*┌───────────────────────*
*├* ⏰ *Runtime:-* ${runtime(process.uptime())}
*├* 📟 *Ram usage:-* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*├*⚙️ *Platform:-* ${os.hostname()}
*├* 👨‍💻 *Owners:-* ${msr.CREATED_BY}
*├* 🧬 *Version:-* ${msr.VERSION}
*└───────────────────────*

> POWERED by ASITHA-MD
`

return reply(`${status}`)

}catch(e){
console.log(e)
reply(`${e}`)

}
});

cmd({
    pattern: "ping",
    react: "🚀",
    desc: "To check ping",
    category: "main",
    use: ".ping",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    try {
        // React before sending the ping message
        await conn.sendMessage(from, { react: { text: "🚀", key: mek.key } });

        var inital = new Date().getTime();
        const { key } = await conn.sendMessage(from, { text: '```Ping!!!```' });
        var final = new Date().getTime();

        // Send the Pong response with the time difference
        return await conn.sendMessage(from, { text: '*Pong*  *' + (final - inital) + ' ms* ', edit: key });
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});


// Initialize activeGroups using NEWS_GROUPS
let lastNewsTitles = {
    hiru: {},
    sirasa: {},
    derana: {}
};

// Function to get the latest news from Hiru
async function getHiruNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/hiru');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Hiru News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Sirasa
async function getSirasaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/sirasa');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Sirasa News: ${err.message}`);
        return null;
    }
}

// Function to get the latest news from Derana
async function getDeranaNews() {
    try {
        const response = await axios.get('https://dark-yasiya-news-apis.vercel.app/api/derana');
        if (response.data.status) {
            const news = response.data.result;
            return {
                title: news.title,
                content: news.desc,
                date: news.date,
                url: news.url,
                image: news.image
            };
        }
        return null;
    } catch (err) {
        console.error(`Error fetching Derana News: ${err.message}`);
        return null;
    }
}

// Function to send news to a group
async function sendNews(conn, groupId, news, source) {
    if (news) {
        // Check if the title is different before sending
        if (lastNewsTitles[source][groupId] !== news.title) {
            lastNewsTitles[source][groupId] = news.title; // Update the last news title sent to the group
            
            // Constructing the message
            let message = `📰 *${source} News*\n\n*Title:* ${news.title}\n\n*Description:* ${news.content}\n\n*Published On:* ${news.date}`;
            if (news.url) message += `\n\n*Read more:* ${news.url}`;
            message += `\n\n> *POWERED by ASITHA-MD*`; // Add caption

            // Check if there is an image to send
            if (news.image) {
                await conn.sendMessage(groupId, {
                    image: { url: news.image },
                    caption: message
                });
            } else {
                await conn.sendMessage(groupId, { text: message });
            }
        }
    }
}

async function checkAndPostNews(conn, groupId) {
    const hiruNews = await getHiruNews();
    const sirasaNews = await getSirasaNews();
    const deranaNews = await getDeranaNews();

    // Send Hiru News
    await sendNews(conn, groupId, hiruNews, 'hiru');

    // Send Sirasa News
    await sendNews(conn, groupId, sirasaNews, 'sirasa');

    // Send Derana News
    await sendNews(conn, groupId, deranaNews, 'derana');
}

// Export function to start the news interval for external use
function startNewsService(conn, nsjid) {
    if (!startNewsService.interval) {
        startNewsService.interval = setInterval(async () => {
            if (nsjid) { // Check if nsjid (group ID) is provided
                await checkAndPostNews(conn, nsjid);
            }
        }, 60000); // Runs every 60 seconds
    }
}

module.exports = { startNewsService, checkAndPostNews, sendNews };


cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    react: "🛠️",
    category: "main",
    use :".alive",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

const msr =await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')

const voice = {
    alive: 'https://github.com/athulakumara604/ASITHA-MD-DATABASE/raw/main/Alivevoice/0909.MP3'
}
const ownerdata = (await axios.get('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/ditels/ditels.json')).data
            let LOGO = ownerdata.videourl;
            let BTN = ownerdata.button;
            let FOOTER = ownerdata.footer;
            let BTNURL = ownerdata.buttonurl;
            let HEADER = ownerdata.heade
const aliveMsg = config.ALIVE_MSG 
let aliveMessage = ` 
*╭─「 ALIVE 」──────●●►*
*│◈ 𝚁𝚄𝙽𝚃𝙸𝙼𝙴 -* ${runtime(process.uptime())}
*│◈ 𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴 -* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰────────────────●●►*
 *${msr.ALIVE_NEWS}*
*╰────────────────●●►*
 ${aliveMsg}

${FOOTER}
`
await conn.sendMessage(from, { audio: { url: voice.alive }, mimetype: 'audio/mp4', ptt: true }, { quoted: mek })
  await conn.sendMessage(from, 
  { 
    video: { url: LOGO }, // මෙහි LOGO වෙනුවට ඔබගේ video url එක යොදන්න
    caption: aliveMessage,
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
        console.log(e)
        reply(`${e}`)
    }});
