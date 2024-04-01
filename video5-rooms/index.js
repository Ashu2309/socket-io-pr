const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

var room_no = 1;
var full = 0;
io.on('connection', (socket) => {
    console.log("User Connected")

    //create room
    socket.join("room-" + room_no)
    io.sockets.in("room-" + room_no).emit("roomEvent", `Message from room-${room_no}`)

    full++;
    if (full >= 2) {
        room_no++;
        full = 0;
    }
    io.on('disconnect', () => {
        console.log("User Connected")
    })
})

http.listen(8000, () => {
    console.log("Server running at 8000");
})
