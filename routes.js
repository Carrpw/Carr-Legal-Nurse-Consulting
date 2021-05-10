// Routes for the api notes page to get the notes, push the notes to be stored, and delete the notes
const fs = require("fs");
const path = require("path");

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "/index.html"));
    });
    
};