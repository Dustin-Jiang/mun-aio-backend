var express = require('express');
var app = express()
var data = require("./src/data");

app.get('/',(req, res)=> {
  res.set({"Content-Type": "text/css"})
  res.send("Hello World!")
});

app.get('/login/:email/:md5', (req, res) => {
  data.get("./data/user.json", "", (content) => {
    for (i in content) {
      if (content[i]["email"] == req.params.email && content[i]["md5"] == req.params.md5) {
        successMsg = {
          "status": 200,
          "content": content[i]
        }
        res.status(200).send(successMsg);
        return ;
      }
    }
    errorMsg = { 
      "status": 404,
      "content": {}
    }
    res.status(404).send(errorMsg);
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

app.listen('5000', () => {
  console.log("Listening port 5000 successfully.")
})