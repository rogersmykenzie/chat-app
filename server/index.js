const express = require("express");
const app = express();
const server = require("http").Server(app);
const sockets = require("socket.io")
const io = sockets(server);
const session = require("express-session");

let messages = [];

app.post("/login", (req, res) => {
    req.session.username = req.body.username
})

io.on("connection", socket => {
    socket.emit("onConnection", {
        message: "Sockets has been connected"
    })

    socket.on("messageSend", data => {
        messages.push(data.message);
        io.emit("newMessage", {messages})
    })
})


server.listen(80);