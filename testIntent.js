const express = require('express');
var app = express();
// const http = require('https');
const bodyParser = require('body-parser');
var port = 3000;
var db = require('db');
app.use(bodyParser.json()); 

// immer den Response Body als Json Format!
app.post('/webhook', (req,res)=> {
    res.setHeader('Content-Type', 'application/json');
    // Parameter aus Dialogflow
    var param = req.body.param
    
    

     return res;
})


app.listen(port, function () {
    console.log("Server is up and running...");
});