

module.exports = {
        database: function(query){
            var oracledb = require ('oracledb');
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
                query
            ,function(err, result){
                if (err){
                    console.error(err.mesage);
                    connection.close(
                        function(err){
                            if(err){
                                console.error(err.mesage);
                            }
                        }
                      ); 
                    return;

                }
                console.log(result.metaData[0].name)
                console.log(result.rows[0][1]);
                ergebnis = result
                check = "done"
                connection.close(
                    function(err){
                        if(err){
                            console.error(err.mesage);
                        }
                    }
                  ); 
            });
        });
        deasync.loopWhile(() => check == undefined);
        //console.log(ergebnis)


        // ***** Converting in simple JSON
        var o = {}
        counter = 0
        //console.log ("ergebnis rows counter"+ ergebnis.rows[counter])
        
        while(ergebnis.rows[counter]!= undefined){
            var key = counter +1;
            o[key]={}
            
            var index = 0
            json={}
            while (ergebnis.metaData[index] != undefined){
                
                // selector = metadata Schlüssel
                // es werden Einträge erstellt
                selector = ergebnis.metaData[index].name 
                content = ergebnis.rows[counter][index ]
                json[selector] = content
                index += 1
            }
            o[key] = json
            
            //console.log(data)
           
            counter ++
        }
        return o
        },
        
            
                
        
    
};
