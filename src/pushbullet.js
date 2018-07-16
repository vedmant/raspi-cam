const PushBullet = require('pushbullet')
const pusher = new PushBullet(process.env.PUSHBULLET_API_KEY)

pusher.devices().then(response => {
  const devices = response.devices
  console.log('Pushbullet devices', response);
  pusher.file(devices[0].iden, '/Users/vedmant/Documents/40 Nature HD Wallpapers Pack/6.jpg', 'test')
})
