const express = require("express");
const app = express();
const server = require("http").Server(app);
const sockets = require("socket.io")
const io = sockets(server);
const session = require("express-session");
const massive = require("massive");

let messages = [];
let db = null;

massive(process.env.CONNECTION_STRING).then(dbInstance => {
    db = dbInstance;
})

io.on("connection", socket => {

    socket.emit("onConnection", {
        message: "Sockets has been connected"
    })

    socket.on("messageSend", data => {
        console.log(db);
        //rooms table
        //messages table
        const {username, message, roomName} = data;
        let roomIndex = messages.findIndex(val => val.roomName === roomName); //check to see if the room exists
        if(roomIndex === -1) {
            messages.push({
                roomName,
                messages: []
            }) //create a room
            roomIndex = messages.length - 1;
        } 
        messages[roomIndex].messages.push(message); //insert into messages table with room id
        io.emit("newMessage", {
            messages: messages[roomIndex].messages //send back messages with that room id
        })
        console.log(messages);
    })
})


server.listen(80);
