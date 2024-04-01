const app = require('express')();
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
    console.log("A user Connected");

    //message event
    // setTimeout(() => {
    // socket.send("Message from server side")

    //create custom event - emit
    // socket.emit("myCustomEvent", { description: "Custom event data" })

    // }, 3000)
    //catch message from client side
    socket.on('customClientEvent', (data) => {
        console.log(data.description)
    })

    socket.on('disconnect', () => {
        console.log("A user Disconnected")
    })
})

http.listen(8000, () => {
    console.log("Server running at 8000");
})
