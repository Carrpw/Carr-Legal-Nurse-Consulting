const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json(path.join(__dirname, "index.html"))
});

app.listen(PORT, () => {
  console.log("you've connected at http://localhost:" + PORT);
});