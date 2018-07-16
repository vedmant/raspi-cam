const express = require('express')
const app = express()
const wss = require('express-ws')(app)
const fs = require('fs')
const PassThrough = require('stream').PassThrough
const StreamConcat = require('stream-concat')
const getLiveStream = require('./raspi-stream').getLiveStream
const headerData = require('./raspi-stream').headerData

app.use('/', express.static('public'))
// app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

const liveStream = getLiveStream({ width: 1280, height: 720, rotation: 180, bitrate: 1000000 /*roi: '0.2,0.2,0.5,0.5'*/ })

liveStream.on('data', data => console.log('liveStream: ' + data.length))

/**
 * Write locally
 */
var fileStream = fs.createWriteStream('test.h264')
process.on('SIGINT', () => {
  fileStream.end()
  process.exit()
})

let localStream
let write = false

/**
 * Lister to user commands to start / stop writing file
 */
process.stdin.on('data', function(d) {
  if (d.toString().trim() === 't') {
    console.log('Start writing file')
    write = true
    localStream = new StreamConcat([headerData.getStream(), liveStream])
    localStream.on('data', data => {
      if (write) {
        fileStream.write(data)
        console.log('writeFile: ' + data.length)
      }
    })
  }
  if (d.toString().trim() === 'f') {
    write = false
    console.log('Stop writing file')
  }
})

/**
 * When web socket connected
 */
app.ws('/video-stream', (ws, req) => {
  let opened = true
  console.log('Client connected')
  const webStream = new StreamConcat([headerData.getStream(), liveStream])

  ws.send(
    JSON.stringify({
      action: 'init',
      width: '1280',
      height: '720',
    }),
  )

  webStream.on('data', data => {
    console.log('webStream: ' + data.length)
    if (!opened) return
    ws.send(data, { binary: true }, error => {
      if (error) console.error(error)
    })
  })

  ws.on('close', () => {
    console.log('Client left')
    webStream.removeAllListeners('data')
    opened = false
  })
})

app.use(function(err, req, res, next) {
  console.error(err)
  next(err)
})

app.listen(12345, () => console.log('Server started on 80'))

// ffmpeg -r 30 -i file.h264 -vcodec copy outputfile.mkv
