const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var tools = require('./tools');
var database = require('./db');
var framework = require('./framework')
var port = 3000;

app.use(bodyParser.json()); 

app.post('/post', function (req, res) {
  if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')
    var intent = req.body.queryResult.intent.displayName
    var params = req.body.queryResult.parameters
    console.log (params + intent)
    //var query = tools.counter(params,intent)
   // var db = database.database(query)
    var message = framework.getFramework(params,intent)
   let responseObj = {
    "fulfillmentText": message,
  }
  console.log ("Response Obj:" + responseObj)
    res.json(responseObj);
    return res;
  
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});