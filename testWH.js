const express = require('express');
var oracledb = require('oracledb');
var app = express();
// const http = require('https');
const bodyParser = require('body-parser');
var connection = require('./db');
var port = 3000;
// var _ = require('underscore');
// const deasync = require('deasync');

app.use(bodyParser.json()); 

app.get ('/', function (req, res){
    res.setHeader('Content-Type', 'application/json');
    var param = 141
    oracledb.getConnection( 
        {
        user : "system", // [username]
        password : "Ip280595!", // [password]
        connectString : "localhost/xe" // [hostname]:[port]/[DB service name]
      },
      function (err, connection)
      {
          if(err){
              console.error(err.mesage);
              return;
          }
          connection.execute(
            "SELECT * from skills where skil_id = " + "'" + param + "'"
          ,function(err, result){
              if (err){
                  console.error(err.mesage);
                  doRelease(connection);
                  return;
  
              }
              console.log(result.metaData)
              console.log(result.rows.param);
              res.json(result);
              doRelease(connection);
          });
      });
  
    function doRelease(connection)
    {
        connection.close(
          function(err){
              if(err){
                  console.error(err.mesage);
              }
          }
        );
    }
    return res;
})
// immer den Response Body als Json Format!
app.post('/post', (req,res)=> {
    if (!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'application/json');
    var param = req.body.queryResult.parameters['ID'];
  // var check = undefined
    var db = "test"
    db = connection.database(param)
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


