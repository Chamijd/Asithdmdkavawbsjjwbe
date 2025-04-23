const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "weather",
    desc: "🌤 Get weather information for a location",
    react: "🌤",
    category: "other",
    use: '.weather < colombo >',
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❗ Please provide a city name. Usage: .weather [city name]");

        const apiKey = '2d61a72574c11c4f36173b627f8cb177'; 
        const city = q;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(url);
        const data = response.data;

        const weather = `
🌍 *Weather Information for ${data.name}, ${data.sys.country}* 🌍

🌡️ *Temperature*: ${data.main.temp}°C
🌡️ *Feels Like*: ${data.main.feels_like}°C
🌡️ *Min Temp*: ${data.main.temp_min}°C
🌡️ *Max Temp*: ${data.main.temp_max}°C
💧 *Humidity*: ${data.main.humidity}%
☁️ *Weather*: ${data.weather[0].main}
🌫️ *Description*: ${data.weather[0].description}
💨 *Wind Speed*: ${data.wind.speed} m/s
🔽 *Pressure*: ${data.main.pressure} hPa

*POWERED by ASITHA-MD*
`;

        return reply(weather);
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 404) {
            return reply("🚫 City not found. Please check the spelling and try again.");
        }
        return reply("⚠️ An error occurred while fetching the weather information. Please try again later.");
    }
});

cmd({
    pattern: "bb",
    react: "✔️",
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
	
const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1]   
	
let i = 0
const end = datas
	
if ( !m.quoted ) return reply('*ℹ Please mention a Derect Link*')
while (i < end) {
await conn.sendMessage(data, { text :  m.quoted.msg  } )
     i++
}
		} catch (e) {
reply('❗ Error' + e )
l(e)
}
})


cmd({
    pattern: "boom",
    desc: "forward msgs",
    alias: ["bbb"],
    category: "owner",
    use: '.boom <jid> & <count>',
    filename: __filename
},

async (conn, mek, m, { from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

if (!isOwner) {
	return reply("*Owner Only ❌*")}
	
if (!q || !m.quoted) {
reply("*give me message ❌*")
}


const data = q.split(" & ")[0] 
const datas = q.split(" & ")[1]   
	
let i = 0
const end = datas


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

while (i < end) {
const mass =  await conn.forwardMessage(data, message, false)
i++
}
	
return reply(`*ASITHA MD Boom sender to:*\n\n ${data}`)
            
})
