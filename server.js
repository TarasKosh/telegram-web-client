// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = process.env.PORT || 3000;
const botToken = 7700302856:AAGSrPWwLMGkpclouwwVgdse5hJTDpPcF-Y
const bot = new TelegramBot(botToken, { polling: true });

let chatId = null;
let messages = [];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get messages
app.get('/messages', (req, res) => {
    res.json({ messages });
});

// Endpoint to send a message
app.post('/send', (req, res) => {
    if (chatId) {
        const message = req.body.message;
        bot.sendMessage(chatId, message);
        messages.push({ from: 'You', text: message });
        res.status(200).send('Message sent');
    } else {
        res.status(400).send('Chat ID not available');
    }
});

// Handle incoming messages from Telegram
bot.on('message', (msg) => {
    chatId = msg.chat.id;
    messages.push({ from: 'Bot', text: msg.text });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
