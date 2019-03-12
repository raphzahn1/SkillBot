var database = require('./db')
var tools = require('./tools')
module.exports = {
    getFramework : function (params,intent){
            console.log("Es geht in preconditions")
            var query = tools.preconditions(params)
            console.log("Preconditions: " + params['mpe_mta_id'])
            console.log("Es geht in database")
            var result = database.database(tools.counter(query,intent))
            console.log("Ergebnis aus der Datenbank: " + result)
            result = tools.converter(params)
            console.log("Ergebnis nach Konvertierung:" + result)
            // test von input
            let message = "Fertiges Ergebnis: " + result 
            return message;
            
                    
            
    },
    getFrameworkID: function (param){
      if(param == "framework"){
         return db.connection ("Select Fram_ID from frameworks where Fram_bezeichnung='"+ param.title + "'")
      }
     
      

  },
  getFrameworkFU: function (parameters, connection){
      for (var i = 0; parameters.length; i++){
          param = parameters.param[i]
          if(param != ""){
              if(param == "erstellt") {
     
              } else if(param == "bearbeitet") {
             
              } else if(param == "ersteller") {
             
              } else if(param == "bearbeiter") {
             
              } else if(param == "level") {
             
              } else if(param == "beschreibung"){
                  db.connection ("Select Fram_ID from frameworks where Fram_bezeichnung='"+ param.title + "'")
              } 
          }
      }
  }, 
}