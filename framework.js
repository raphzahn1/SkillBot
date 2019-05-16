var database = require('./db')
var tools = require('./tools')
var builder = require('./builder')
module.exports = {
    getFramework : function (session,params,intent){
            console.log("In Frameworks")
            console.log("Es geht in preconditions")
            var preconditions = tools.preconditions(params,intent)
            console.log("Es geht in database")
            var result = database.database(tools.counter(preconditions,intent))
            console.log("Ergebnis aus der Datenbank: " + JSON.stringify(result))
            result = tools.converter(result)
            console.log("Ergebnis nach Konvertierung:" + JSON.stringify(result))
            var back = {
            }
            var anzahl
            var message =""
            intent = "framework"
            if(result[1]== undefined){
                back["fulfillmentText"] = "Ich konnte leider keinen Eintrag zu deiner Suche finden. Kannst du bitte die NAtwort wiederholen"
    
            }else if(result[2] != undefined){
                anzahl = 2
                message = "Ich habe mehrere Einträge zu deiner Suche gefunden: \n\n "
                message += builder.message (result,params,anzahl,intent)
                message += "Zu welchen Eintrag möchtest du genauere Informationen?"
                back["fulfillmentText"]=message
                back["outputContexts"]= [  
                    {  
                    "name":session + "/contexts/" + "framework_fu" ,
                    "lifespanCount":2,
                    "parameters":{
                        result
                    }
                }
                ]
            }else{
                anzahl = 1
                message += "Ich habe einen Eintrag "
                message += builder.message (result,params,anzahl,intent)
                message += "gefunden "
                back["fulfillmentText"] = message
                back["outputContexts"]= [  
                    {  
                    "name":session + "/contexts/" + "framework_fu" ,
                    "lifespanCount":5,
                    "parameters":{
                      result
                  }
                    },
                    {  
                      "name":session + "/contexts/" + "single" ,
                      "lifespanCount":1,
                    },
                    {  
                      "name":session + "/contexts/" + "auswahl" ,
                      "lifespanCount":1,
                    }
                ]
            }
            console.log("Message ist gesetzt")
            // test von input
            return back;
    },
    getFrameworkFU: function (req,session,params){
      console.log("FrameworkFU")
            var entry
            var context
            i = 1
            while (entry == undefined){
            entry = req.body.queryResult.outputContexts[i].parameters.auswahl
            i++
            }
            i=1
            console.log("Entry" + entry)
            while (context == undefined){
                 context = req.body.queryResult.outputContexts[i].parameters.result
                i++
            }
            console.log("context glesen" + JSON.stringify(context))
            var context = context[entry]
            console.log("result ist ausgelesen" + JSON.stringify(context) )
            var fu = params["anfragen_auskunft"] 
        console.log("Parameter in frameworkFU:" + JSON.stringify(fu) + context["framework"])
        var fulfillmentText = "Also, lass uns mal sehen..."
        var message = {
      }
        console.log("Lass uns nach der Frage suchen")
        var param
        for (var key in fu){
                param = fu[key]
                console.log("Parameter "+ param+ "und Key:" + key)
                // Hier noch Kommentare zurückgeben 
                if(param == "erstellt") {
                  fulfillmentText += "Der Éintrag ist vom" + context['erstelldatum'] 
                  message["fulfillmentText"] = fulfillmentText
                } 
                if(param == "bearbeitet") {
                  fulfillmentText += "Bearbeitet wurde er am" +context['pflegedatum']
                  message["fulfillmentText"] = fulfillmentText
                } 
                if(param == "ersteller") {
                  fulfillmentText += context['ersteller']+ "hat den Eintrag erstellt"
                  message["fulfillmentText"] = fulfillmentText
                } 
                if(param == "bearbeiter") {
                  fulfillmentText += context['bearbeiter'] + "hat den Eintrag bearbeitet"
                  message["fulfillmentText"] = fulfillmentText
                } 
                if(param == "level") {
                  fulfillmentText += context['mitarbeiter'] + "ist auf dem Level " +context['level']
                  message["fulfillmentText"] = fulfillmentText
                } 
                if(param == "beschreibung"){
                  message["fulfillmentMessages"]  = [
                         {
                          "card": {
                          "title": "Hier ist eine Beschreibung zu " + context["framework"],
                              "subtitle": "hier klicken :)",
                               "imageUri": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikipedia_logo_593.jpg",
                              "buttons": [
                                  {
                              "text": "button text",
                              "postback": "https://de.wikipedia.org/wiki/" + context["framework"]
                              }
                            ]
                          }
                        }
                   ]
                } 
                if (param == "kommentar"){
                  fulfillmentText += "Für den Eintrag von "+ context['mitarbeiter'] + " habe ich folgende Kommentare gefunden: /n"+context['kommentar']
                  message["fulfillmentText"] = fulfillmentText
                  
                }


                 message["outputContexts"] = [  
                   {  
                   "name":session + "/contexts/" + "eintrag" ,
                   "lifespanCount":1,
                   "parameters":{
                        context
                      }
                  }
             ]

            }
            console.log( "raus")
            return message
        }
      
}