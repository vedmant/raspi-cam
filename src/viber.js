require('dotenv').config()
const ViberBot = require('viber-bot').Bot
const BotEvents = require('viber-bot').Events
const TextMessage = require('viber-bot').Message.Text
// const UrlMessage = require('viber-bot').Message.Url
// const ContactMessage = require('viber-bot').Message.Contact
// const PictureMessage = require('viber-bot').Message.Picture
// const VideoMessage = require('viber-bot').Message.Video
// const LocationMessage = require('viber-bot').Message.Location
// const StickerMessage = require('viber-bot').Message.Sticker
// const RichMediaMessage = require('viber-bot').Message.RichMedia
// const KeyboardMessage = require('viber-bot').Message.Keyboard


process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack);
})

const bot = new ViberBot({
	authToken: process.env.VIBER_BOT_API_KEY,
	name: "EchoBot",
	avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
})

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message)
})

bot.getBotProfile().then(response => {
  console.log(response.members[0])
  bot.sendMessage(response.members[0], new TextMessage('Test')).then(console.log)
})
