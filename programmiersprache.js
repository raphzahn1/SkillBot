/**
  Import:
    database: Modul für die Persistence-Verbindung zur Datenbank BA S.57
    tools: Tools enthält Zusatzmethoden u.a. für das Umwandeln der der Parameternamen in Tabellenbezeichnungen
    builder: Modul für das Zusammenbauen der Antwort für Dialogflow 
*/ 


var database = require('./db')
var tools = require('./tools')
var builder = require('./builder')
module.exports = {
   /**  Hier ist die Methode für das Liefern von Einträgen bei Programmiersprachen -> BA S.56 */
    getProgrammiersprache: function(session,params,intent,req) { 
        console.log("In getProgrammiersprache")
        console.log("Es geht in preconditions")
        // Die Entities aus Dialogflow müssen in die Bezeichnungen der Datenbank-Spalten umgewandelt werden
        var preconditions = tools.preconditions(params,intent)
        console.log("Es geht in database")
        // Die Anfrage an die Datenbank
        var result = database.database(tools.counter(preconditions,intent))
        console.log("Ergebnis aus der Datenbank: " + JSON.stringify(result))
        // Datenbank Objekte werden in Format für Dialogflow gebracht
        result = tools.converter(result)
        console.log("Ergebnis nach Konvertierung:" + JSON.stringify(result))

        // Das Schreiben der Nachricht wird vorbereitet
        var back = {
        }
        var anzahl
        var message = ""
        intent = "programmiersprache"
        // Basiswort für die Antworten festlegen -> "Zu (Programmiersprache oder Mitarbeiter) habe ich folgende Einträge gefunden"
        var basiswort
        if(result[1] != undefined){
        if(params["programmiersprache"] != (undefined || "") && params["mitarbeiter"] == (undefined || "")){
          basiswort = result[1]["programmiersprache"]
          console.log(basiswort + "PS")
        }else if(params["programmiersprache"] == (undefined || "") && params["mitarbeiter"] != (undefined || "")){
          basiswort = result[1]["mitarbeiter"]
          console.log(basiswort + "MA")
        }else if(params["programmiersprache"] == (undefined || "") && params["mitarbeiter"] == (undefined || "")){
          basiswort = result[1]["erfahrung"]
          console.log(basiswort + "Level")
        }else{
          basiswort = result[1]["mitarbeiter"]
          console.log(basiswort + "ELSE")
        }}
        console.log("Basiswort gefunden")
        // Kontext muss ausgelesen werden, Um die Richtige Antwort für die unterschiedlichen Intents auszulesen
        // Finden des richtigen Kontext, damit der Chatbot weiß ob update oder info
        var i = 1
        var context = ""
        var outputContexts = req.body.queryResult.outputContexts
        console.log("Der Kontext aus Programmiersprache: "+JSON.stringify(req.body.queryResult.outputContexts))
        console.log("Unser Vergleichskontext:"+ session + "/contexts/update")
        console.log("Die Länge des Kontext" + outputContexts.length)

        for ( var i=1; i < outputContexts.length; i++ ) {
          if (outputContexts[i].name == session + "/contexts/update" || outputContexts[i].name == session + "/contexts/info" ) {
            var context = outputContexts[i].name ; // "entry" is now the entry you were looking for
            // ... do something useful with "entry" here...
          }
        }

        /* !! Ab hier werden die Antworten für Dialogflow gebaut: BA S.56f
           Eine Antwort besteht aus:
            - message: Antwort
            - back: Der Outputkontext für Dialogflow BA S.54 
            - (Optional) Rich Replies als JSON
        
        */
        console.log("Kontext nach Konvertierung :" + context)
        console.log("Weiter in den Abgleich")
        // Falls kein Eintrag gefunden:
        if(result[1]== undefined){
            message += "Ich konnte leider keinen Eintrag zu deiner Suche finden. Du kannst die Frage jetzt nocheinmal formulieren. :grey_question: Falls du die Anfrage abbrechen möchtest sage einfach *abbrechen*, dann kommst du zurück zum Hauptmenü.:back:  "
            back["outputContexts"]= [
                {  
                  "name":session + "/contexts/" + context ,
                  "lifespanCount":5,
              }
            ]
        // Falls mehrere Einträge gefunden:
        }else if(result[2] != undefined){
            anzahl = 2
            message = "Ich habe mehrere Inhalte zu " + basiswort +" gefunden: :rocket:\n\n "
            message += builder.message (result,params,anzahl,intent)

            // Unterschiedliche Inhalte für -> insert
            if(context == session + "/contexts/info"){
              message += "Zu welchen Eintrag möchtest du genauere Informationen? Sage bitte die Nummer des Eintrags z.B. Nummer 3:point_up: :crystal_ball:"
            back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "programmiersprache_fu" ,
                "lifespanCount":4,
                "parameters":{
                    result
                }
            },
            {  
              "name":session + "/contexts/" + "12oder3" ,
              "lifespanCount":1
            },{  
              "name":session + "/contexts/" + "info",
              "lifespanCount":5,
            }
            ]
            }

            // Unterschiedliche Inhalte für -> update
           else if(context == session + "/contexts/update"){
              message += "Bitte, wähle die Nummer des Eintrag aus, für den du das Update durchführen möchtest."
              back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "update" ,
                "lifespanCount":4,
                "parameters":{
                    result
                }
            },
            {  
              "name":session + "/contexts/" + "12oder3" ,
              "lifespanCount":1
            }
            ]
            }
  
        }
        /* Falls ein Eintrage gefunden:
        */
        else if(result[1] != undefined){
          anzahl = 1
          message += "Ich habe einen Eintrag zu " + basiswort 
          message += builder.message (result,params,anzahl,intent)

           // Unterschiedliche Inhalte für -> insert
          if(context == session + "/contexts/info"){
          message += " gefunden. Was möchtest du zu dem Eintrag wissen? :point_up: :crystal_ball:"
          back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "programmiersprache_fu" ,
              "lifespanCount":4,
              "parameters":{
                result,
                "auswahl":1
                }
              },
              {  
                "name":session + "/contexts/" + "auswahl" ,
                "lifespanCount":1
              },{  
                "name":session + "/contexts/" + "info" ,
                "lifespanCount":5,
               }
            ]
            back["payload"] = {
              "slack":{
                
                  "text": message,
                  "attachments": [
                    {
                      "text": "Was möchtest du wissen?",
                      "fallback": "leider kann ich dir gerade nicht helfen",
                      "callback_id": "option_auswahl",
                      "color": "#3AA3E3",
                      "attachment_type": "default",
                      "actions": [
                        {
                          "name": "Kommentar",
                          "text": "Kommentar",
                          "type": "button",
                          "value": "kommentar"
                        },
                        {
                          "name": "Level",
                          "text": "Level",
                          "type": "button",
                          "value": "level"
                        },{
                          "name": "Bearbeiter",
                          "text": "Bearbeiter",
                          "type": "button",
                          "value": "bearbeiter"
                        },
                        {
                          "name": "Ersteller",
                          "text": "Ersteller",
                          "type": "button",
                          "value": "ersteller"
                        },
                        {
                          "name": "Erstelldatum",
                          "text": "Erstelldatum",
                          "type": "button",
                          "value": "erstelldatum"
                        }
                      ]
                    }, {
                      "text": "",
                      "fallback": "leider kann ich dir gerade nicht helfen",
                      "callback_id": "option_auswahl2",
                      "color": "#3AA3E3",
                      "attachment_type": "default",
                      "actions": [
                        {
                          "name": "Bearbeitungsdatum",
                          "text": "Bearbeitungsdatum",
                          "type": "button",
                          "value": "bearbeitungsdatum"
                        },
                        {
                          "name": "Skill-Beschreibung",
                          "text": "Skill-Beschreibung",
                          "type": "button",
                          "value": "skillbeschreibung"
                        }
                      ]
                    }
                  ]
              }
              
             }
           }

           

           // Unterschiedliche Inhalte für -> update
           else if(context == session + "/contexts/update"){
            message += " gefunden. Du kannst jetzt einen neuen *Kommentar* machen, oder das *Erfahrungslevel* verändern. :point_up: :crystal_ball:"

            back["outputContexts"]= [  
                {  
                "name":session + "/contexts/" + "update" ,
                "lifespanCount":7,
                "parameters":{
                  result,
                  "auswahl":1
              }
                },
                {  
                  "name":session + "/contexts/" + "auswahl" ,
                  "lifespanCount":1
                }
              ]
              back["payload"] = {
                "slack":{
                  
                    "text": message,
                    "attachments": [
                      {
                        "text": "Welche der beiden Optionen möchtest du?",
                        "fallback": "leider kann ich dir gerade nicht helfen",
                        "callback_id": "option_update",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "actions": [
                          {
                            "name": "Kommentar",
                            "text": "Kommentar",
                            "type": "button",
                            "value": "kommentar"
                          },
                          {
                            "name": "Level",
                            "text": "Level",
                            "type": "button",
                            "value": "level"
                          }
                        ]
                      }
                    ]
                }
                
               }
              

             }
        }
        console.log(message)
        // Daten werden Antworten Objekt geschrieben
        back["fulfillmentText"]=message
        console.log("Message ist gesetzt")
        // Senden der Message -> Manager -> Webserver
        return back;
    },
    //** Methode für Mitarbeitervergleich: Wurde verworfen  */
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

    //**  Hier werden Einträge geliefert -> siehe BA S.56  *
    getProgrammierspracheFU: function (req,session,params){
      console.log("ProgrammierspracheFU")
            var entry
            var context
            i=1
            console.log("Entry" + entry)
            while (context == undefined){
                 entry = req.body.queryResult.outputContexts[i].parameters.auswahl
                 context = req.body.queryResult.outputContexts[i].parameters.result
                i++
            }
            console.log("Entry" + entry)
            console.log("context glesen" + JSON.stringify(context))
            var context = context[entry]
            console.log("result ist ausgelesen" + JSON.stringify(context) )
            var fu = params["anfragen_auskunft"] 
        console.log("Parameter in ProgrammierspracheFU:" + JSON.stringify(fu) + context["programmiersprache"])
        var fulfillmentText = "Also, lass uns mal sehen...:mag:\n\n"
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
                if(artikel == "wann" && param == "erstellt" || param == "erstelldatum") {
                  fulfillmentText += "Der Eintrag ist vom *" + context['erstelldatum'] +"*."
                } 
                if((artikel == "wann" && param == "bearbeitet")|| param == "bearbeitungsdatum") {
                  fulfillmentText += "Der Eintrag wurde am *" + context['erstelldatum'] +"* bearbeitet."
                } 
                if((artikel == "wer" && param == "erstellt") || param == "ersteller") {
                  fulfillmentText += "*"+context['ersteller']+ "* hat den Eintrag erstellt."
                } 
                if((artikel == "wer" && param == "bearbeitet") || param == "bearbeiter" ) {
                  fulfillmentText += "*"+context['pfleger'] + "* hat den Eintrag bearbeitet."
                } 
                if(param == "level") {
                  fulfillmentText += context['mitarbeiter'] + " ist in "+context["programmiersprache"]+" auf dem Level *" +context['level']+"*."
                } 
                if(param == "beschreibung"){
                  message["fulfillmentMessages"]  = [
                         {
                          "card": {
                          "title": "Hier ist eine Beschreibung zu " + context["programmiersprache"]+ ": bitte klicken :sparkles:",
                              "subtitle": " Willst du sonst noch etwas Wissen? Stelle mir die Frage, oder sage *Nein*",
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
                  fulfillmentText += "Für den Eintrag von "+ context['mitarbeiter'] + " habe ich folgende Kommentare gefunden: :arrow_down_small:\n\n _"+context['kommentar'] +"_ \n"
                }
                 
            }
            fulfillmentText += "\n Möchtest du weitere Fragen stellen? Wenn nicht kannst du einfach verneinen. :put_litter_in_its_place::x:"
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