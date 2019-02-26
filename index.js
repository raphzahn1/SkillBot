const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var manager = require('./manager');
var port = 3000;

app.use(bodyParser.json()); 

// immer den Response Body als Json Format!
app.post('/post', (req,res)=> {
    if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')
    var intent = req.body.intent.displayName
    var params = req.body.queryResult.parameters
    var query = "test"
    query = manager.cb(params,intent)
    let response = " ";
    let responseObj={
          "fullfillmentText":response,
             "fullfillmentMessages":[{"text": {"text": [db]}}]
            ,"source":""
    }
    console.log('Here is the response to dialogflow');
    console.log(responseObj);
        // gib reponse Objekt zurück
        res.json(responseObj);
        return res;
})

app.listen(port, function () {
    console.log("Server is up and running...");
});















