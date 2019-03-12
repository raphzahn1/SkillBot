var oracledb = require('oracledb');
const deasync = require('deasync');
var ergebnis
var check = undefined
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
            "SELECT * from skills"
        ,function(err, result){
            if (err){
                console.error(err.mesage);
                doRelease(connection);
                return;

            }
            console.log(result.metaData[0].name)
            console.log(result.rows[0][1]);
            ergebnis = result
            check = "done"
            doRelease(connection);
        });
    });
    deasync.loopWhile(() => check == undefined);
    console.log(ergebnis.metaData[0].name)
    console.log(ergebnis.rows[0][1]);

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

 
  