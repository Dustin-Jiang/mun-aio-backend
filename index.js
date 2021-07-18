var express = require('express');
var app = express()
var data = require("./src/data");
var login = require("./src/login");

app.get('/',(req, res)=> {
  res.set({"Content-Type": "text/css"})
  res.send("Hello World!")
});

app.get('/login/:email/:md5', (req, res) => {
  data.get("./data/user.json", "", (content) => {
    login.login(req, res, content);
  });
})

app.get('/user/:chooser', (req, res) => {
  chooser = req.params.chooser;
  banlist = [
    "md5",
    "permission"
  ]
  content = data.get("./data/user.json", chooser, (content) => {
    forbidden = (element) => element == chooser;
    if (banlist.some(forbidden)) {
      res.status(403).send("403 forbiddened");
    } else {
      res.send(content);
    }
  });
})

app.get('/conference/:id', (req, res) => {
  data.get("./data/conference.json", "", (content) => {
    res.send(content[req.params.id]);
  })
})

app.listen('5000', () => {
  console.log("Listening port 5000 successfully.")
})