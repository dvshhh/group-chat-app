const express = require('express')
const { Socket } = require('socket.io')

const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static( __dirname + '/public'))
app.get('/', (req, res) => {
    // for seding string below is the command
    // res.send('Hello world')


    // but we want to send index file,so we will give directory + index file path
    res.sendFile(__dirname + '/index.html')
})


// Socket

// importing socket
// server is http above declared
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
        
    })
})
