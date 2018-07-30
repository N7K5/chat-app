
const path= require("path");
const publicDir= path.join(__dirname, "../public");
const  utils  = require("./../utils/utils");
const {Users}= require("./../utils/Users");

const moment= require("moment");

const socketIO= require("socket.io");
const http= require("http");

const PORT= process.env.PORT || 3000;

const express= require("express");
var app= express();

var people= new Users();

var server= http.createServer(app);
var io= socketIO(server);

app.use((req, res, next) => {
    console.log("-->requested on " + new Date().toLocaleTimeString() + "\n\n");
    next();
});

io.on("connection", function(socket) {
    console.log("Connected with client");


    socket.on("disconnect", function() {
        var user= people.removeUser(socket.id);
        if(user) {
            socket.broadcast.to(user.room).emit("updateUserList", people.getUserList(user.room));
            socket.broadcast.to(user.room).emit("newMessage", utils.createMessage("Admin", `${user.name} has left...`));
        }
    });

    socket.on("join", (data, callback) => {
        if(!isValidString(data.name) || !isValidString(data.room)) {
            return callback("Invalid name or room name");
        }
        
        socket.join(data.room);
        people.removeUser(socket.id);
        people.addUser(socket.id, data.name, data.room);

        io.to(data.room).emit("UpdateUserList", people.getUserList(data.room));

        socket.emit("newMessage", utils.createMessage("Admin", "Welcome to Chatroom..."));
        socket.broadcast.to(data.room).emit("newMessage", utils.createMessage("Admin", `${data.name} has joined...`));

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
//     res.sendFile(publicDir+ "/chat.html");
// });

server.listen(PORT, () => {
    console.log("\n\n\tListening on port "+ PORT +"\n\n");
});



function isValidString(str) {
    if(str) {
        return str.trim().length>2;
    }
    return false;
}