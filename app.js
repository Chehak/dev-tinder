const express = require("express");
const app = express();

app.listen(3000);
app.use("/test/2", (req, res) => {
  res.send("Hello from the test2 server");
});
app.use("/test", (req, res) => {
  res.send("Hello from the test server");
});

app.use("/xyz", (req, res) => {
  res.send("Hello from the xyz");
});

app.get("/user", (req, res) => {
  res.send({
    id: req.query.id,
    password: req.query.password,
  });
});

// app.get("/user/:userId/:name/:password", (req, res) => {
//   res.send({
//     id: req.params.userId,
//     name: req.params.name,
//     password: req.params.password,
//   });
// });
