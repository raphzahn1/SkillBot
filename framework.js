var database = require('./db')
var tools = require('./tools')
var builder = require('./builder')
module.exports = {
    getFramework : function (session,params,intent){
            console.log("Es geht in preconditions")
            var preconditions = tools.preconditions(params)
            console.log("Es geht in database")
            var result = database.database(tools.counter(preconditions,intent))
            console.log("Ergebnis aus der Datenbank: " + JSON.stringify(result))
            result = tools.converter(result)
            console.log("Ergebnis nach Konvertierung:" + JSON.stringify(result))
            var outputContexts
            if(result[1]== undefined){
                message = "Ich konnte leider keinen Eintrag zu deiner Suche finden. Kannst du bitte die NAtwort wiederholen"
                outputContexts = null
            }else if(result[2] != undefined){
                message = "Ich habe mehrere Einträge zu Frameworks gefunden: \n\n "
                message += builder.message (result,params)
                outputContexts= [  
                    {  
                    "name":session + "/contexts/" + "selection" ,
                    "lifespanCount":5,
                    "parameters":{
                        result
                    }
                }
                ]
            }else{
                message = "Ich habe einen Eintrag gefunden"
                outputContexts= [  
                    {  
                    "name":session + "/contexts/" + "selection" ,
                    "lifespanCount":5,
                    result
                    }
                ]
            }
            back = builder.builder(outputContexts,message)
            console.log("Message ist gesetzt")
            // test von input
            return back;
    },
  getFrameworkFU: function (session,params,context,intent){
      var fulfillmentText = "Kein Problem, also lass uns mal sehen..."
      var fulfillmentMessages
      var message = {
    }
      for (var i = 0; params.length; i++){
          param = params[i]
              if(param == "erstellt") {
                fulfillmentText += "Der Éintrag ist vom" + context['erstelldatum'] 
              } 
              if(param == "bearbeitet") {
                fulfillmentText += "Bearbeitet wurde er am" +context['pflegedatum']
              } 
              if(param == "ersteller") {
                fulfillmentText += context['ersteller']+ "hat den Eintrag erstellt"
              } 
              if(param == "bearbeiter") {
                fulfillmentText += context['bearbeiter'] + "hat den Eintrag bearbeitet"
              } 
              if(param == "level") {
                fulfillmentText += context['mitarbeiter'] + "ist auf dem Level" +context['level']
              } 
              if(param == "beschreibung"){
                fulfillmentMessages = [
                       {
                        "card": {
                        "title": "card title",
                            "subtitle": "card text",
                             "imageUri": "https://taxprof.typepad.com/.a/6a00d8341c4eab53ef013485744a6a970c-popup",
                            "buttons": [
                                {
                            "text": "button text",
                            "postback": "https://de.wikipedia.org/" + context[framework]
                            }
                          ]
                        }
                      }
                 ]
                
              } 
              message["fulfillmentText"] = fulfillmentText
              message["fulfillmentMessages"] = fulfillmentMessages
          }
          
          return message
      }
      
}