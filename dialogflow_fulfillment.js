'use strict';

const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var manager = require('./manager')
var port = 3000;

const {WebhookClient} = require('dialogflow-fulfillment');
app.use(bodyParser.json()); 

process.env.DEBUG = 'dialogflow:debug';

app.post('/post', function (request, response) {
  if (!request.body) return response.sendStatus(400)

    const agent = new WebhookClient({request, response});
    console.log('Req headers: ' + JSON.stringify(request.headers));
    console.log('Req body: ' + JSON.stringify(request.body));

    function welcome (agent) {
      agent.add("Willkommen aus dem Webhook!! Raphael");
    }

    function programmiersprache (agent) {
      agent.add(manager.cb(request));
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent',welcome);
    intentMap.set('programmiersprache',programmiersprache);
    agent.handleRequest(intentMap);

  
});

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});