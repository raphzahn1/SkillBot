const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var manager = require('./manager')
var port = 3000;

app.use(bodyParser.json()); 

app.post('/post', function (req, res) {
  if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')
    var obj = manager.cb(req)
    res.json(obj);
    return res;
  
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});