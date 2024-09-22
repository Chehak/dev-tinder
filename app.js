const express = require("express");
const app = express();

app.listen(3000);
app.arguments("/", (req, res) => {
  res.send("Hello from the server");
});
