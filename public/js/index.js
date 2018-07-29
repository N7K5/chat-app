
var socket= io();

socket.on("connect", function() {
    console.log("Connected to Server");
    document.getElementById("message").innerHTML= "";
});

socket.on("disconnect", function() {
    console.log("Disconnected from Server");
});

socket.on("newMessage", message => {
    console.log(JSON.stringify(message, undefined, 2));
    var li= `<li> ${message.from} : ${message.text}`;
    document.getElementById("message").innerHTML+=li;
});

// socket.on("newEmail", function(cont) {
//     console.log("New Email Comming " + JSON.stringify(cont, undefined, 2));
// })


document.getElementById("send").addEventListener("click", e => {
    e.preventDefault();
    socket.emit("createMessage",{
        from: "anonymous",
        text: document.getElementById("text").value
    }, function() {
        // alert("send successfully...");
    });
}, false);