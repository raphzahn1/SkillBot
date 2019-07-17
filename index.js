/* Alle Imports 
    express: für Webserver siehe BA S.55
    bodyParser: für JSON Generierung
    manager: Managerklasse BA S.56
    port = Port für den Server

*/
const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var manager = require('./manager')
var port = 3000;

app.use(bodyParser.json()); 

/* Post-Methode, die von Dialogflow angesprochen wird:
    - req enthällt die Webhook-Anfrage in JSON
    - res ist die Antwort von Node.Js in JSON-Format
      ->  Dialogflow-Request siehe: https://cloud.google.com/dialogflow/docs/fulfillment-how 
    - Das res-Objekt wird als JSON mit setHeader initiiert
    - obj erhällt die Antwort aus der Managermethode 
    - Response wird zurück versendet
*/
app.post('/post', function (req, res) {
  if (!req.body) return res.sendStatus(400)
    res.setHeader('Content-Type', 'application/json')
    var obj = manager.cb(req)
    res.json(obj);
    return res;
  
});
/*
  Webserver lauscht auf Port 3000 und wartet auf Anfrage von Dialogflow
*/ 
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});