require('dotenv').config()

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
  console.log(err.stack);
})

require('./src/stream')
// require('./src/upnp')
