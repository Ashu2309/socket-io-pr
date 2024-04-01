const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
//for particular name space
var cnsp = io.of('custom-namespace')
cnsp.on('connection', (socket) => {
    console.log("A user Connected");
    cnsp.emit('message', "Hello from custom Namespace")
    socket.on('disconnect', () => {
        console.log("A user Disconnected")
    })
})

//for global
io.on('connection', (socket) => {
    console.log("A user Connected");
    socket.emit('message', "Hello from Global")

    socket.on('disconnect', () => {
        console.log("A user Disconnected")
    })
})

http.listen(8000, () => {
    console.log("Server running at 8000");
})
