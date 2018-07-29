
const path= require("path");
const publicDir= path.join(__dirname, "../public");
const  utils  = require("./../utils/utils");

const moment= require("moment");

const socketIO= require("socket.io");
const http= require("http");

const PORT= process.env.PORT || 3000;

const express= require("express");
var app= express();

var server= http.createServer(app);
var io= socketIO(server);

app.use((req, res, next) => {
    console.log("-->requested on " + new Date().toLocaleTimeString() + "\n\n");
    next();
});

io.on("connection", function(socket) {
    console.log("Connected with client");

    socket.emit("newMessage", utils.createMessage("Admin", "Welcome to Chatroom..."));

    socket.broadcast.emit("newMessage", utils.createMessage("Admin", "New user joind..."));


    socket.on("disconnect", function() {
        console.log("Disconnected from client");
    });

    socket.on("createMessage", (message, callback) => {

        // io.emit("newMessage", message);
        socket.broadcast.emit("newMessage", utils.createMessage(message));
        callback();
    });

    socket.on("sendLocation", (message, callback) => {
        io.emit("newLocMessage", utils.createMessage(message.from, `${message.lat},${message.lng}`));
        callback();
    });

}); 



app.use(express.static(publicDir));


// app.get("/", (req, res) => {
//     res.sendFile(publicDir+ "/index.html");
// });

server.listen(PORT, () => {
    console.log("\n\n\tListening on port "+ PORT +"\n\n");
});

