var express = require('express')
  , fs = require('fs');

exports.auth = express.basicAuth(function(user, pass){
    info = fs.readFileSync('auth.txt', 'utf8').split("\n");
    for (line in info)
      if (user == info[line].split(':')[0] && pass == info[line].split(':')[1])
        return true;
    return false;
});

