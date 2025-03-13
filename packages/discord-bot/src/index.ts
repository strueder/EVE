import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config({ path: ".env.discord-bot" });

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('Discord token is not provided.');
}

// Erstelle einen neuen Discord-Client mit den nötigen Intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Soblad der Bot bereit ist
client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user?.tag}`);
});

// Wenn eine Nachricht erstellt wird
client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.trim() === '!ping') {
      message.channel.send('Pong!!');
    }
});

// Logge den Bot ein
client.login(token);