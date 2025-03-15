import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: ".env.discord-bot" });

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('Discord token is not provided.');
}

// Konfiguriere die Backend-URL via Umgebungsvariable
const backendBaseUrl = process.env.BACKEND_BASE_URL || "http://localhost:4000";

// Erstelle einen neuen Discord-Client mit den nötigen Intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Sobald der Bot bereit ist
client.once('ready', () => {
  console.log(`Eingeloggt als ${client.user?.tag}`);
});

// Wenn eine Nachricht erstellt wird
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.trim();
  
  if (content === '!ping') {
    message.channel.send('Pong!');
  } else if (content === '!update') {
    try {
      // Aufruf der Backend-Route /downloadExamDates
      const response = await axios.get(`${backendBaseUrl}/downloadExamDates`);
      const data = response.data;
      // Sende das Ergebnis als formatierten JSON-String zurück
      message.channel.send(`Update erfolgreich:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``);
    } catch (error) {
      console.error('Fehler beim Abrufen des Updates:', error);
      message.channel.send('Fehler beim Abrufen des Updates.');
    }
  }
});

// Logge den Bot ein
client.login(token);
