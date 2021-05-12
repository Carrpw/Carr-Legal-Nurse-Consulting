// Lets it write files and run express
const express = require("express");
const fs = require("fs");
const path = require("path");

// Lets express run and sets where the port is
const app = express();
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
// app.use("/assets", express.static("assets"));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));

// Routes for the api and htmls
// require("./routes")(app);
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

// Lets the port listen for commands
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});