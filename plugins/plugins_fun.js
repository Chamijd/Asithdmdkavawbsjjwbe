var Seedr = require("seedr");
const axios = require('axios');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const cheerio = require('cheerio');
async function getPremiumUsers() {
    const preUser = await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Moviedl/primiyam.json');
    const preUsers = preUser.split(",");
    return preUsers.map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net");
}

cmd({
    pattern: "animegirl",
    desc: "Fetch a random anime girl image.",
    category: "fun",
    react: "👧",
    use: '.animegirl < Name >',
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const apiUrl = `https://api.waifu.pics/sfw/waifu`;
        const response = await axios.get(apiUrl);
        const data = response.data;

        await conn.sendMessage(from, { image: { url: data.url }, caption: '👧 *Random Anime Girl Image* 👧\n> *POWERED by ASITHA-MD*' }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`Error fetching anime girl image: ${e.message}`);
    }
});
cmd({
    pattern: "fact",
    desc: "🧠 Get a random fun fact",
    react: "🤓",
    use: '.fact < Name >',
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://uselessfacts.jsph.pl/random.json?language=en';  // API for random facts
        const response = await axios.get(url);
        const fact = response.data.text;

        const funFact = `
🧠 *Random Fun Fact* 🧠

${fact}

Isn't that interesting? 😄
`;

        return reply(funFact);
    } catch (e) {
        console.log(e);
        return reply("⚠️ An error occurred while fetching a fun fact. Please try again later.");
    }
});
cmd({
    pattern: "ytmx",	
    react: '📽️',
    desc: "pirate moive downloader",
    filename: __filename
},
async (conn, m, mek, { from, prefix, q, l, isDev, sender,reply }) => {
try{

const msr = (await fetchJson('https://raw.githubusercontent.com/athulakumara604/ASITHA-MD-DATABASE/refs/heads/main/Mreply.json')).replyMsg

        // Fetch premium users
        const premiumUsers = await getPremiumUsers();

        // Check if the sender is a premium user
        const isPreUser = premiumUsers.includes(sender);

        // If the user is not a premium user, deny access
        if (!isPreUser) {
            return reply(msr.pre_cmd);
	}



        if (!q) return await reply('*Please Give Me Text..! 🖊️*')
const response = await axios.get(q);	
const $ = cheerio.load(response.data);

	const title = $("#mobile-movie-info > h1").text();
        const year = $("#mobile-movie-info > h2:nth-child(2)").eq(0).text();
        const language = $("#mobile-movie-info > h2 > span").text();
        const image = $("#movie-poster > img").attr("src");
        const enter = $("#mobile-movie-info > h2").eq(1).text();
        let results = [];
      $("div.modal.modal-download.hidden-xs.hidden-sm > div > div > div").each((c, d) => {
          results.push({ 
               quality: $(d).find("div > span").text(),
               type: $(d).find("p.quality-size").eq(0).text(),
               size: $(d).find("p.quality-size").eq(1).text(),
               torrent_file: $(d).find("a").attr("href"),
               magnet: $(d).find("a.magnet-download.download-torrent.magnet").attr("href"),
          })
      })

if (results.length < 1) return await conn.sendMessage(from, { text: "*මට කිසිවක් සොයාගත නොහැකි විය :(*" }, { quoted: mek } )
var srh = [];  
for (var i = 0; i < results.length; i++) {
srh.push({
title: results[i].quality  + ' ' + results[i].size,
description: '',
rowId: prefix + 'ytmxdl ' + results[i].magnet
});
}
const sections = [{
title: "_[Result from ytsmx.]_",
rows: srh
}
]
let cc = `
*📽️ASITHA-MD MOVIE®📽️*

☘️ *Tɪᴛʟᴇ :* ${title ?? 'Null'}

▫️📅 *Rᴇʟᴇᴀꜱᴇ Dᴀᴛᴇ :* ${year ?? 'Null'}
▫️🌎 *ɪᴍʙ :* ${language ?? 'Null'}
▫️⭕ *ᴅᴇꜱᴄ :* ${enter ?? 'Null'}

*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
▫️🔗 *Join :* https://whatsapp.com/channel/0029VaeyMWv3QxRu4hA6c33Z
*➟➟➟➟➟➟➟➟➟➟➟➟➟➟*
`


const listMessage = {
text: `*DOWNLOAD*`,  
footer: "> *POWERED by ASITHA-MD*",
title: '',
buttonText: '*🔢 Reply below number*\n',
sections
}
await conn.sendMessage(from, { image: { url: image ?? 'https://i.postimg.cc/9FGJDwzB/error-rubber-stamp-word-error-inside-illustration-109026446.jpg' }, caption: cc }, { quoted: mek });  	
await conn.listMessage(from, listMessage,mek)
} catch (e) {
  reply('*ERROR !!*')
  console.log(e)
}
});



cmd({
    pattern: "mvdb",
    react: "🎥",
    desc: "Download movies from ARAbdulla-Dev's API",
    category: "extra",
    use: '.mvdb <Movie Name>',
    filename: __filename
}, async (conn, mek, m, { from, prefix, q, reply }) => {
    const API_KEY = 'dzhdJ6Ty9jTH2D56-H171z83j319dj61d';
    const BASE_URL = 'http://103.195.101.44:2662';
    const MOVIE_SEARCH_URL = `${BASE_URL}/api/movies?search=${encodeURIComponent(q)}&apiKey=${API_KEY}`;
    const MOVIE_REQUEST_URL = `${BASE_URL}/api/request-movie`;

    if (!q) {
        reply('*ERROR:* Please provide a movie name to search.');
        return;
    }

    try {
        // Fetch movies from the API
        const { data: movies } = await axios.get(MOVIE_SEARCH_URL);

        if (!movies || movies.length === 0) {
            reply(`*ERROR:* No movies found for "${q}".`);
            return;
        }

        const movieResults = [];
        for (const movie of movies) {
            try {
                // Fetch the detailed URL and size for each movie
                const { data: detail } = await axios.get(`${MOVIE_REQUEST_URL}/${encodeURIComponent(movie.name)}?apiKey=${API_KEY}`);
                const downloadUrl = `${BASE_URL}${detail.url}`;

                // Convert size from bytes to GB (assuming detail.size is in bytes)
                const sizeInGB = (detail.size / (1024 ** 3)).toFixed(2);

                // Push movie details into results
                movieResults.push({
                    title: movie.name,
                    description: `Quality: ${movie.quality}\nSize: ${sizeInGB} GB`,
                    rowId: `${prefix}dbl ${downloadUrl} & ${movie.name} & ${movie.quality}`
                });
            } catch (error) {
                console.error(`Error fetching details for "${movie.name}":`, error.message);
            }
        }

        if (movieResults.length > 0) {
            const sections = [{
                title: '🎬 Results from ARAbdulla-Dev\'s API',
                rows: movieResults
            }];

            const listMessage = {
                text: `🎥 *ASITHA-MD CINEMA* 🎥\n\n🔎 *Search Query:* "${q}"`,
                footer: 'Powered by ASITHA-MD',
                title: '',
                buttonText: 'Choose Movie ⬇️',
                sections
            };

            await conn.listMessage(from, listMessage, mek);
        } else {
            reply(`*ERROR:* Unable to find downloadable results for "${q}".`);
        }
    } catch (error) {
        console.error('Error fetching movies:', error.message);
        reply('*ERROR:* Unable to process your request. Please try again later.');
    }
});



cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "🤣",
    use: '.joke < Name >',
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> *POWERED by ASITHA-MD*
`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ Couldn't fetch a joke right now. Please try again later.");
    }
});
