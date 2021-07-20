var fs = require("fs")

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

exports.edit = (file, chooser, edit, callback) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;
    obj = JSON.parse(data);
    if (typeof(chooser) != 'object') throw "Chooser Error";
    // for (i in chooser) {
    //   obj = obj[chooser[i]];
    // }
    if (typeof(callback)!='function') throw "Callback requires a function";
    console.log(__changeObjectValue(obj, chooser, 0, edit));
  })
}

function __changeObjectValue(obj, keys, keysNum, data) {
  if (keysNum > (keys.length - 1)) {
    return ;
  }
  result = {};
  for (i in obj) {
    if (i != keys[keysNum]) {
      result[i] = obj[i];
      continue;
    } else {
      if (keysNum == (keys.length - 1)) {
        result[keys[keysNum]] = data;
        return(result);
      }
      result[i] = __changeObjectValue(obj[i], keys, (keysNum + 1), data);
    }
  }
  return(result);
}