
var socket= io();

socket.on("connect", function() {
    console.log("Connected to Server");
});

socket.on("disconnect", function() {
    console.log("Disconnected from Server");
});

socket.on("newMessage", message => {
    console.log(JSON.stringify(message, undefined, 2));
})

socket.on("newEmail", function(cont) {
    console.log("New Email Comming " + JSON.stringify(cont, undefined, 2));
})