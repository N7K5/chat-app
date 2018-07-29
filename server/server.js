
const path= require("path");
const publicDir= path.join(__dirname, "../public");

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


    socket.on("disconnect", function() {
        console.log("Disconnected from client");
    });

    socket.on("createMessage", message => {
        io.emit("newMessage", message);
    })

}); 



app.use(express.static(publicDir));


// app.get("/", (req, res) => {
//     res.sendFile(publicDir+ "/index.html");
// });

server.listen(PORT, () => {
    console.log("\n\n\tListening on port "+ PORT +"\n\n");
});

