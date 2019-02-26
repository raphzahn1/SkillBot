var oracledb = require('oracledb');
 
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
            console.log(result.metaData)
            console.log(result.rows);
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

 
  