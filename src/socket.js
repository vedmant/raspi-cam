const net = require('net')
const fs = require('fs')

// This server listens on a Unix socket at /var/run/mysocket
const unixServer = net.createServer(function(socket) {
  // Do something with the client connection

  socket.on('data', function(data) {
    console.log(data.toString())
  })
})

unixServer.listen('./mysocket.sock')

process.on('SIGINT', () => {
  fs.unlinkSync('./mysocket.sock')
  process.exit()
})

// bash: echo 'test' | nc -U mysocket.sock
