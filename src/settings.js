var data = require("./data")

exports.change = (req, res, userID, type) => {
  if (type === 'changePassword') {
    content = req.params[0];
    content = content.split("/");
    password = {
      "old": content[0],
      "new": content[1],
    }
    data.get("./data/user.json", "md5", (result) => {
      if (result[userID] == password["old"]){
        res.sendStatus(200);
      }
      else {
        res.sendStatus(403);
      }
    })
    data.edit("./data/user.json", [1, "name"], "foo", (result) => {
      console.log(result);
    })
  }
}