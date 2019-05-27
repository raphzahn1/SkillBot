var database = require('./db')
var tools = require('./tools')
var builder = require('./builder')
module.exports = {
    getProgrammiersprache: function(session,params,intent,req) {
        console.log("In getProgrammiersprache")
        console.log("Es geht in preconditions")
        var preconditions = tools.preconditions(params,intent)
        console.log("Es geht in database")
        var result = database.database(tools.counter(preconditions,intent))
        console.log("Ergebnis aus der Datenbank: " + JSON.stringify(result))
        result = tools.converter(result)
        console.log("Ergebnis nach Konvertierung:" + JSON.stringify(result))

        // Das überschreiben der Nachricht wird vorbereitet
        var back = {
        }
        var anzahl
        var message
        intent = "programmiersprache"

        // Finden des richtigen Kontext, damit der Chatbot weiß ob update oder info
        var i = 1
        var context = ""
        var outputContexts = req.body.queryResult.outputContexts
        console.log("Der Kontext aus Programmiersprache: "+JSON.stringify(req.body.queryResult.outputContexts))
        console.log("Unser Vergleichskontext:"+ session + "/contexts/update")
        console.log("Die Länge des Kontext" +outputContexts.length)

        for ( var i=1; i < outputContexts.length; i++ ) {
          if (outputContexts[i].name == session + "/contexts/update" || session + "/contexts/info" ) {
            var context = outputContexts[i].name ; // "entry" is now the entry you were looking for
            // ... do something useful with "entry" here...
          }
          
        }
        console.log("Kontext nach Konvertierung :" + context)
          

        console.log("Weiter in den Abgleich")
        if(result[1]== undefined){
            back["fulfillmentText"] = "Ich konnte leider keinen Eintrag zu deiner Suche finden. Kannst du bitte die NAtwort wiederholen"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "programmiersprache" ,
              "lifespanCount":1
            }
          ]

        }else if(result[2] != undefined){
            anzahl = 2
            message = "Ich habe mehrere Einträge zu deiner Suche gefunden: \n\n "
            message += builder.message (result,params,anzahl,intent)

            // Unterschiedliche Inhalte für -> insert
            if(context == session + "/contexts/info"){
              message += "Zu welchen Eintrag möchtest du genauere Informationen?"
            if(context)
            back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "programmiersprache_fu" ,
                "lifespanCount":2,
                "parameters":{
                    result
                }
            }
            ]
            }

            // Unterschiedliche Inhalte für -> update
            if(context == session + "/contexts/update"){
              message += "Bitte, wähle den Eintrag aus, für den du das Update durchführen möchtest?"
            if(context)
            back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "update" ,
                "lifespanCount":2,
                "parameters":{
                    result
                }
            }
            ]
            }


            back["payload"]={"slack":{"text": message}}
            back["fulfillmentText"]=message
        }else{
          anzahl = 1
          message += "Ich habe einen Eintrag "
          message += builder.message (result,params,anzahl,intent)

           // Unterschiedliche Inhalte für -> insert
           if(context == session + "/contexts/insert"){
          message += "gefunden. Was möchtest du zu dem Eintrag wissen?"
          
          back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "programmiersprache_fu" ,
              "lifespanCount":7,
              "parameters":{
                result
            }
              },
              {  
                "name":session + "/contexts/" + "auswahl" ,
                "lifespanCount":1,
                "parameters":{
                  "auswahl":1
              }
              }
            ]
           }

           // Unterschiedliche Inhalte für -> update
           if(context == session + "/contexts/update"){
            message += "gefunden. Du kannst jetzt einen neuen Kommentar machen, oder das Erfahrungslevel verändern. Was soll es sein?"
            
            back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "update" ,
                "lifespanCount":7,
                "parameters":{
                  result
              }
                },
                {  
                  "name":session + "/contexts/" + "auswahl" ,
                  "lifespanCount":1,
                  "parameters":{
                    "auswahl":1
                }
                }
              ]
             }
          back["fulfillmentText"] = message
      }
        console.log("Message ist gesetzt")
        // test von input
        return back;
    },
    getProgrammierspracheVS: function(session,params,intent){
      console.log("In Programmiersprache Vergleich")
      var array = []
      var i = 1
      for (var key in params.mitarbeiter){
        var entry = params.mitarbeiter[key]
        var result = params
        result.mitarbeiter = entry
        console.log("Es geht in preconditions")
        var preconditions = tools.preconditions(params,intent)
        console.log("Es geht in database")
        var result = database.database(tools.counter(preconditions,intent))
        console.log("Ergebnis aus der Datenbank: " + JSON.stringify(result))
        result = tools.converter(result)
        console.log("Ergebnis nach Konvertierung:" + JSON.stringify(result))
        array[i].push(result)
        i++
      }
      var back = {
      }
        console.log(array)
        console.log("Message ist gesetzt")
        // test von input
        return back;
    },
    getProgrammierspracheFU: function (req,session,params){
      console.log("ProgrammierspracheFU")
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
        console.log("Parameter in ProgrammierspracheFU:" + JSON.stringify(fu) + context["programmiersprache"])
        var fulfillmentText = "Also, lass uns mal sehen..."
        var message = {
      }
      // vorher muss der Artikel gesucht werden
        var artikel = params.artikel
        console.log("Der Artikel = " + artikel)

        console.log("Lass uns nach der Frage suchen")
        var param
        for (var key in fu){
                param = fu[key]
                console.log("Parameter "+ param+ "und Key:" + key)
                // Hier noch Kommentare zurückgeben 
                if(artikel == "wann" && param == "erstellt") {
                  fulfillmentText += "Der Éintrag ist vom" + context['erstelldatum'] 
                } 
                if(artikel == "wann" && param == "bearbeitet") {
                  fulfillmentText += "Bearbeitet wurde er am" +context['pflegedatum']
                } 
                if(artikel == "wer" && (param == "ersteller" || param == "erstellt")) {
                  fulfillmentText += context['ersteller']+ "hat den Eintrag erstellt"
                } 
                if(artikel == "wer" && (param == "bearbeiter" || param == "bearbeitet") ) {
                  fulfillmentText += context['bearbeiter'] + "hat den Eintrag bearbeitet"
                } 
                if(param == "level") {
                  fulfillmentText += context['mitarbeiter'] + "ist auf dem Level " +context['level']
                } 
                if(param == "beschreibung"){
                  message["fulfillmentMessages"]  = [
                         {
                          "card": {
                          "title": "Hier ist eine Beschreibung zu " + context["programmiersprache"]+ ": Willst du sonst noch etwas Wissen? Stelle mir die Frage, oder sage Nein",
                              "subtitle": "hier klicken :)",
                               "imageUri": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikipedia_logo_593.jpg",
                              "buttons": [
                                  {
                              "text": "button text",
                              "postback": "https://de.wikipedia.org/wiki/" + context["programmiersprache"]
                              }
                            ]
                          }
                        }
                   ]
                } 
                if (param == "kommentar"){
                  fulfillmentText += "Für den Eintrag von "+ context['mitarbeiter'] + " habe ich folgende Kommentare gefunden: \n "+context['kommentar']
                }
                 
            }
            fulfillmentText += "\n Möchtest du weitere Fragen stellen? Wenn nicht kannst du einfach verneinen"
                 message["fulfillmentText"] = fulfillmentText
                 message["outputContexts"] = [  
                   {  
                   "name":session + "/contexts/" + "programmiersprache_FU" ,
                   "lifespanCount":1,
                   "parameters":{
                        context
                      }
                  },
                  {  
                    "name":session + "/contexts/auswahl" ,
                    "lifespanCount":1
                   },
                   {  
                     "name":session + "/contexts/info" ,
                     "lifespanCount":1
                    }
             ]

            console.log( "raus aus Programmiersprache_FU")
            return message
        }
}