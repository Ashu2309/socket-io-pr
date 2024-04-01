const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

var users = 0;
//# Normal Brodcasting

// io.on('connection', (socket) => {
//     console.log("A user Connected");

//     users++;
//     // show how many users connected
//     io.sockets.emit("broadcast", { usersCon: users })
//     console.log(users)

//     socket.on('disconnect', () => {
//         console.log("A user Disconnected")
//         users--;
//         io.sockets.emit("broadcast", { usersCon: users })

//     })
// })

// ------------------------------------------------------

// # NEW USER - Welcome Message ! 
// # Other Brodacast Users - How many are there

io.on('connection', (socket) => {
    console.log("User Connected")
    users++;
    //NEW USER
    socket.emit("newUserEvent", { message: "Welcome, Nice to see you !" })

    //Other Users
    socket.broadcast.emit("newUserEvent", { message: users + " connected!" })

    socket.on('disconnect', () => {
        console.log("User Disconnected")
        users--;
        socket.broadcast.emit("newUserEvent", { message: users + " connected!" })

    })
})

http.listen(8000, () => {
    console.log("Server running at 8000");
})
