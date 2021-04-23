var fs = require("fs")

exports.get = (file, chooser, callback) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    if(typeof(callback === "function")) {
      if (chooser != "") {
        callback(obj[0][chooser]);
      } else {
        callback(obj);
      }      
    }
  })
}