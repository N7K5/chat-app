
const path= require("path");
const publicDir= path.join(__dirname, "../public");

const PORT= process.env.PORT || 3000;

const express= require("express");
var app= express();

app.use((req, res, next) => {
    console.log("requested on " + new Date().toLocaleTimeString() + "\n\n");
    next();
});

app.use(express.static(publicDir));


app.get("/", (req, res) => {
    res.sendFile(publicDir+ "index.html");
});

app.listen(PORT, () => {
    console.log("\n\n\tListening on port "+ PORT +"\n\n");
});

