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
    "status": 403,
    "content": {}
  };
  res.status(403).send(errorMsg);
}