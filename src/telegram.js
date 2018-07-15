require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token)

bot.sendMessage(process.env.TELEGRAM_CHAT_ID, 'Test')
bot.sendPhoto(process.env.TELEGRAM_CHAT_ID, 'test.jpg', { caption: 'Motion detected' })
