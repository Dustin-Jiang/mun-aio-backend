var fs = require("fs")
var crypto = require("crypto");
var md5 = crypto.createHash("md5");

exports.get = (file, chooser, callback) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    if(typeof(callback === "function")) {
      if (chooser != "") {
        val = {}
        for (i in obj) {
          val[i] = obj[i][chooser];
        }
        callback(val);
      } else {
        callback(obj);
      }      
    }
  })
}

exports.edit = {
  changePassword(file, chooser, edit, callback) {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) throw err;
      obj = JSON.parse(data);
      if (typeof(chooser) != 'number') throw "Chooser Error";
      console.log(edit);
      obj[chooser]["md5"] = md5.update(edit).digest("hex");
      if (typeof(callback)!='function') throw "Callback requires a function";
      fs.writeFile(file, JSON.stringify(obj), 'utf8', (err) => {
        if (err) throw err;
        return ;
      })
    });
  }
}