module.exports={
      // ** Baut Struktur des JSON zusammen *
    builder: function(outputContexts,message){
        // Wurde Programmiert um Code zu sparen
            data= {
              "fulfillmentText": message,
          }
          if(outputContexts != null){
            data["outputContexts"] = outputContexts
          }
          console.log("Data aus builder:"+ JSON.stringify(data))
            return data
        },
       // ** Hier werden die einzelnen Zeilen der Antwort in eine Message geschrieben *
     message: function(result,params, anzahl, intent){
          // Jede Zeile enthält einen Datenbankeintrag
          console.log("Es geht in Message")
          console.log ("Daten für die message"+JSON.stringify(result) + "Intent = " +intent)
          var message =""
          var i = 1
          if(anzahl == 2){
          while(result[i]!= undefined || result[10] != undefined){
            // die position des Eintrags
            if(result[i+1] == undefined){
                message+= " und ein letzter"
            }else if(i == 1){
              message+= "Ein erste Eintrag ist"
            }else{
              message+= ", ein weiterer Eintrag"
            }

            /*
              Hier werden nur die informationen geliefert die der Benutzer nicht gefragt hat:

              Benutzer fraget nach Robin Test -> System gibt nur Programmiersprache und Erfahrungslevel aus

            */

              if(intent == "programmiersprache"){
                // ab hier die Inhalte
                    if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                      message+= " mit *" + result[i].mitarbeiter+"*"

                    if(params["programmiersprache"] == undefined ||  params["programmiersprache"] == "" && result[i].programmiersprache != undefined )
                      message+= " zu *" + result[i].programmiersprache +"*" 

                    if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                      message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
              }

                if (intent == "framework"){

                      if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                        message+= " mit *" + result[i].mitarbeiter+"*"

                      if(params["framework"] == undefined ||  params["framework"] == "" && result[i].framework != undefined )
                        message+= " zu *" + result[i].framework +"*"  

                      if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                        message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
                }

                
                if (intent == "skills"){

                  if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                    message+= " mit *" + result[i].mitarbeiter+"*"

                  if(params["skills"] == undefined ||  params["skills"] == "" && result[i].skill != undefined )
                      message+= " zu *" + result[i].skills+"*"

                  if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                    message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
            }
            
              message+= "\n\n"
            i++
           }
          }

          else if (anzahl == 1){

                    if(intent == "programmiersprache"){
                      // ab hier die Inhalte
                          if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                            message+= " mit *" + result[i].mitarbeiter+"*"

                          if(params["programmiersprache"] == undefined ||  params["programmiersprache"] == "" && result[i].programmiersprache != undefined )
                            message+= " zu der Programmiersprache *" + result[i].programmiersprache+"*"  

                          if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                            message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
                    }

                    if (intent == "framework"){
                          console.log("In Message -> Anzahl1 -> Framework")
                          if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                            message+= " mit *" + result[i].mitarbeiter+"*"

                          if(params["framework"] == undefined ||  params["framework"] == "" && result[i].framework != undefined )
                            message+= " zu dem Framework *" + result[i].framework  +"*" 

                          if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                            message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
                    }

        
                    if (intent == "skills"){

                      if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                        message+= " mit *" + result[i].mitarbeiter +"*"

                      if(params["skills"] == undefined ||  params["skills"] == "" && result[i].skill != undefined )
                          message+= " zu dem Skill *" + result[i].skills +"*"

                      if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                        message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
                }
          }
          
          return message
        },
        compare: function(array,params){
          // Funktion für den Vergleich von Mitarbeitern: Nicht implementiert 

        }
     
}