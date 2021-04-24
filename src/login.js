exports.login = (req, res, content) => {
  for (i in content) {
    if (content[i]["email"] == req.params.email && content[i]["md5"] == req.params.md5) {
      content[i]["md5"] = "";
      successMsg = {
        "status": 200,
        "content": content[i]
      };
      res.status(200).send(successMsg);
      return;
    }
  }
  errorMsg = {
    "status": 404,
    "content": {}
  };
  res.status(404).send(errorMsg);
}