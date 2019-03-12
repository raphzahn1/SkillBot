const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var manager = require('./manager')
var framework = require('./framework')
var port = 3000;

app.use(bodyParser.json()); 

app.post('/post', function (req, res) {
  if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')
    var obj = manager.cb(req)
   // var obj = framework.getFrameworkFU(session,params,context,intent)
    res.json(obj);
    return res;
  
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});