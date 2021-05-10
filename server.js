// Lets it write files and run express
const express = require("express");
const fs = require("fs");

// Lets express run and sets where the port is
const app = express();
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
// app.use("/assets", express.static("assets"));
app.use(express.static(__dirname + '/assets'));
app.use(express.urlencoded({ extended: true }));

// Routes for the api and htmls
require("./routes")(app);

// Lets the port listen for commands
app.listen(PORT, function() {
    console.log("App is listening on PORT " + PORT);
});