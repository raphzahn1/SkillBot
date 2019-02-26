

module.exports = {
    database: function (query){ 
            var oracledb = require ('oracledb');
            var check = undefined
            var collection = []
            var _ = require('underscore');
            const deasync = require('deasync');
            oracledb.getConnection( 
            {
            user : "system", // [username]
            password : "Ip280595!", // [password]
            connectString : "localhost/xe" // [hostname]:[port]/[DB service name]

          },
          function (err, connection)
          {
              if(err){
                  connection.release(function(err) {
                    if (err) console.error(err.message);
                });
                  return;
              }
              connection.execute(
                  query, {}, //no binds
                {
                    resultSet: true,
                    prefetchRows: 1000
        
                }
              ,function(err, results){
                  var rowsProcessed = 0;
                  if (err){
                      console.error(err.mesage);
    
                      return;
      
                  }
    
                  function processResultSet() {
                         
                        results.resultSet.getRows(1000, function(err, rows) {
                            if (err) throw err;
     
                            if (rows.length) {
                                
                                rows.forEach(row => {
                                    var rw
                                     rowsProcessed += 1
                                     collection.push(_.toArray(row));
                                     console.log(collection[0][0], collection[0][1] )
                                     rw = JSON.stringify(collection[0][0])
                                     rw = JSON.parse(rw)
                                     console.log("hallooooo"+rw)
                                });
                               
     
                                //do work on the row here
                                try{
                                processResultSet(); //try to get another row from the result set
                                }catch(error){
                                    console.error("Probleme im Inneren")
                                }
    
                                return; //exit recursive function prior to closing result set
                            }
                             check = "done"
    
                            
                            console.log('Finish processing ' + rowsProcessed + ' rows');
                            
     
                            results.resultSet.close(function(err) {
                                if (err) console.error(err.message);
     
                                connection.release(function(err) {
                                    if (err) console.error(err.message);
                                });
                            });
    
                        });
                    }
                    // ----- normale Response 
    
                 try{
                    processResultSet();
                    
                 }catch(error){
                    console.error("Probleme mit process Result")
                 }
                    
                 
                    
              });
    
              return
          });
          deasync.loopWhile(() => check == undefined);
          return collection
        }
};
