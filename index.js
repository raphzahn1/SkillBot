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
    var session = req.body.session
    console.log("Session"+ JSON.stringify(session))
    console.log (JSON.stringify(params) + intent)
    var message = framework.getFramework(params,intent)
    obj ={
      "fulfillmentText": message,
      "fulfillmentMessages": [
        {
          "card": {
            "title": "card title",
            "subtitle": "card text",
            "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
            "buttons": [
              {
                "text": "button text",
                "postback": "https://assistant.google.com/"
              }
            ]
          }
        }
      ]
      , "outputContexts": [  
      {  
        "name":session + "/contexts/" + "selection" ,
        "lifespanCount":5,
      "parameters":{  
         "result": message ,
        }
        }
     ]
  }
    //var context = tools.card()
    res.json(obj);
    return res;
  
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});