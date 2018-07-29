
var socket= io();

socket.on("connect", function() {
    console.log("Connected to Server");
    document.getElementById("message").innerHTML= "";
});

socket.on("disconnect", function() {
    console.log("Disconnected from Server");
});

socket.on("newMessage", message => {
    // console.log(JSON.stringify(message, undefined, 2));
    var time= moment(message.createdAt).format("h:mm a");
    var li= `<li> ${message.from} ${time} : ${message.text}`;
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
        document.getElementById("text").value= "";
    });
}, false);



document.getElementById("location").addEventListener("click", e => {
    
    if(!navigator.geolocation) {
        document.getElementById("location").setAttribute("disabled", "disabled");
        document.getElementById("location").style.cursor="not-allowed";
        return alert("Location share not supported");
    }
    document.getElementById("location").setAttribute("disabled", "disabled");
    document.getElementById("location").style.cursor="wait";

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit("sendLocation", {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
        }, () => {
            document.getElementById("location").removeAttribute("disabled");
            document.getElementById("location").style.cursor="pointer";
        });
    }, () => {
        alert("please allow access...");
        document.getElementById("location").style.cursor="not-allowed";
    });
}, false);



document.getElementById("message_form").addEventListener("submit", e => {
    e.preventDefault();
}, false);