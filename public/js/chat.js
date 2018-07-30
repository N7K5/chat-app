
var socket= io();

socket.on("connect", function() {
    console.log("Connected to Server");
    document.getElementById("message").innerHTML= "";

    socket.emit("join", {
        name: getParms("name"),
        room: getParms("room")
    }, (err) => {
        if(err) {
            alert(err);
            window.location.href="/";
        }
    });
});

socket.on("disconnect", function() {
    console.log("Disconnected from Server");
});

socket.on("UpdateUserList", function(users) {
    //console.log(users);
    var users_ol= document.getElementById("users_ol");
    users_ol.innerHTML= "";
    users.forEach((user) => {
        users_ol.innerHTML+=`<li>${user}</li>`;
    });
})

socket.on("newMessage", message => {
    // console.log(JSON.stringify(message, undefined, 2));
    var time= moment(message.createdAt).format("h:mm a");
    // var li= `<li> ${message.from} ${time} : ${message.text}`;
    // document.getElementById("message").innerHTML+=li;

    var template= document.getElementById("message__template").innerHTML;
    var html= Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: time
    });
    document.getElementById("message").innerHTML+= html;
    document.getElementById("message").scrollTop+= 9999;
});

socket.on("newLocMessage", message => {
    // console.log(JSON.stringify(message, undefined, 2));
    var time= moment(message.createdAt).format("h:mm a");
    // var li= `<li> ${message.from} ${time} : ${message.text}`;
    // document.getElementById("message").innerHTML+=li;

    var template= document.getElementById("message__loc__template").innerHTML;
    var html= Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: time
    });
    document.getElementById("message").innerHTML+= html;
    document.getElementById("message").scrollTop+= 9999;
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
            from:"anon",
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



function getParms(search_str) {
    var url= new URL(window.location.href);
    return url.searchParams.get(search_str);
}