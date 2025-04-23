const { Buffer } = require('buffer');
const axios = require('axios');
const { cmd, commands } = require('../command')
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);
const config = require('../config'); // Assuming you have an API key stored in config
const Esana = require('@sl-code-lords/esana-news');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const cheerio = require('cheerio')
const ffmpeg = require('fluent-ffmpeg')


var api = new Esana()
cmd({
    pattern: "wiki",
    desc: "Search Wikipedia and get a summary.",
    category: "search",
    use: '.wiki < Text >',
    react: "📚",
    filename: __filename
},
async(conn, mek, m, {from, args, reply}) => {
    try {
        if (args.length < 1) return reply('Please provide a search term.');
        const query = args.join(' ');
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

        const response = await axios.get(url);
        const { extract, title } = response.data;

        const message = `*${title}*\n\n${extract}\n\n> *POWERED by ASITHA-MD*`;
        return await conn.sendMessage(from, { text: message }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply('An error occurred while searching Wikipedia.');
    }
})


//esana
cmd({
    pattern: "esananews",
    react: '🎙️',
    desc: "To see esana news",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, l, prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const latst = await api.latest_id();
            const nws = latst.results.news_id
            let nn = q || nws
            const ress = await api.news(nn);
            const res = ress.results;

            const txt2 = await conn.sendMessage(from, {image: 
	    {url: res.COVER},caption: `\n*┃◉* *⇨ ᴛɪᴛᴇʟ :*
 ${res.TITLE}\n\n*┃◉* *⇨ ᴅᴀᴛᴇ :*
 ${res.PUBLISHED}\n\n*┃◉* *⇨ ᴜʀʟ :*
 ${res.URL}\n\n*┃◉* *⇨ Description :*
 ${res.DESCRIPTION}\n\n> *POWERED by ASITHA-MD*\n\n`},
			{ quoted: mek });
await conn.sendMessage(from, { react: { text: `✅`, key: mek.key }}) 
} catch (e) {
reply()
l(e)
}
})       



cmd({
    pattern: "news",
    desc: "Get the latest news headlines.",
    category: "search",
    use: ".news",
    react: "📰",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiKey="0f2c43ab11324578a7b1709651736382";
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles;

        if (!articles.length) return reply("No news articles found.");

        // Send each article as a separate message with image and title
        for (let i = 0; i < Math.min(articles.length, 5); i++) {
            const article = articles[i];
            let message = `
📰 *${article.title}*
⚠️ _${article.description}_
🔗 _${article.url}_

> *POWERED by ASITHA-MD*
            `;

            console.log('Article URL:', article.urlToImage); // Log image URL for debugging

            if (article.urlToImage) {
                // Send image with caption
                await conn.sendMessage(from, { image: { url: article.urlToImage }, caption: message });
            } else {
                // Send text message if no image is available
                await conn.sendMessage(from, { text: message });
            }
        };
    } catch (e) {
        console.error("Error fetching news:", e);
        reply("Could not fetch news. Please try again later.");
    }
});

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "img",
    desc: "Search and send images from Google.",
    react: "🖼️",
    use: '.img < Text >',
    category: "search",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("Please provide a search query for the image.");

        // Fetch image URLs from Google Custom Search API
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("No images found for your query.");
        }

        // Send images
        for (let i = 0; i < data.items.length; i++) {
            const imageUrl = data.items[i].link;

            // Download the image
            const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(imageResponse.data, 'binary');

            // Send the image with a footer
            await conn.sendMessage(from, {
                image: buffer,
                caption: `
*Image ${i + 1} from your search!*
*ASITHA MD IMG DOWNLOADER*

> *POWERED by ASITHA-MD* 📸
`
}, { quoted: mek });
}

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

cmd({
    pattern: "movie",
    desc: "Fetch detailed information about a movie.",
    category: "other",
    use: '.movie < Text >',
    react: "🎬",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const movieName = args.join(' ');
        if (!movieName) {
            return reply("📽️ Please provide the name of the movie.");
        }

        const apiUrl = `http://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=76cb7f39`;
        const response = await axios.get(apiUrl);

        const data = response.data;
        if (data.Response === "False") {
            return reply("🚫 Movie not found.");
        }

        const movieInfo = `
🎬 *Movie Information* 🎬

🎥 *Title:* ${data.Title}

📅 *Year:* ${data.Year}

🌟 *Rated:* ${data.Rated}

📆 *Released:* ${data.Released}

⏳ *Runtime:* ${data.Runtime}

🎭 *Genre:* ${data.Genre}

🎬 *Director:* ${data.Director}

✍️ *Writer:* ${data.Writer}

🎭 *Actors:* ${data.Actors}

📝 *Plot:* ${data.Plot}

🌍 *Language:* ${data.Language}

🇺🇸 *Country:* ${data.Country}

🏆 *Awards:* ${data.Awards}

⭐ *IMDB Rating:* ${data.imdbRating}

🗳️ *IMDB Votes:* ${data.imdbVotes}
`;

        // Define the image URL
        const imageUrl = data.Poster && data.Poster !== 'N/A' ? data.Poster : config.ALIVE_IMG;

        // Send the movie information along with the poster image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
            caption: `${movieInfo}\n> *POWERED by ASITHA-MD*`
        }, { quoted: mek });
    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

const { fetchJson } = require('../lib/functions')

const apilink = 'https://dark-yasiya-news-apis.vercel.app/api' // API LINK ( DO NOT CHANGE THIS!! )


// ================================HIRU NEWS========================================

cmd({
    pattern: "hirunews",
    alias: ["hiru","news1"],
    react: "⭐",
    desc: "",
    category: "search",
    use: '.hirunews',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/hiru`)
  
const msg = `
           ⭐ *HIRU NEWS* ⭐

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url}

> *POWERED by ASITHA-MD*`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================SIRASA NEWS========================================

cmd({
    pattern: "sirasanews",
    alias: ["sirasa","news2"],
    react: "🔺",
    desc: "",
    category: "search",
    use: '.sirasa',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply }) => {
try{

const news = await fetchJson(`${apilink}/sirasa`) 
const msg = `
           🔺 *SIRASA NEWS* 🔺

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Link* - ${news.result.url} 

> *POWERED by ASITHA-MD* 

`


await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})

// ================================DERANA NEWS========================================

cmd({
    pattern: "derananews",
    alias: ["derana","news3"],
    react: "📑",
    desc: "",
    category: "search",
    use: '.derana',
    filename: __filename
},
async(conn, mek, m,{from, quoted, reply}) => {
try{

const news = await fetchJson(`${apilink}/derana`)
  
const msg = `
           📑 *DERANA NEWS* 📑

       
• *Title* - ${news.result.title}

• *News* - ${news.result.desc}

• *Date* - ${news.result.date}

• *Link* - ${news.result.url} 

> *POWERED by ASITHA-MD*`

await conn.sendMessage( from, { image: { url: news.result.image || '' }, caption: msg }, { quoted: mek })
} catch (e) {
console.log(e)
reply(e)
}
})



 
