module.exports={
    builder: function(outputContexts,message){
            data= {
              "fulfillmentText": message,
              // "fulfillmentMessages": [
              //   {
              //     "card": {
              //       "title": "card title",
              //       "subtitle": "card text",
              //       "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
              //       "buttons": [
              //         {
              //           "text": "button text",
              //           "postback": "https://assistant.google.com/"
              //         }
              //       ]
              //     }
              //   }
              // ]
              
          }
          if(outputContexts != null){
            data["outputContexts"] = outputContexts
          }
          console.log("Data aus builder:"+ JSON.stringify(data))
            return data
        },
     message: function(result,params, anzahl, intent){
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

                
                if (intent == "skill"){

                  if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                    message+= " mit *" + result[i].mitarbeiter+"*"

                  if(params["skill"] == undefined ||  params["skill"] == "" && result[i].skill != undefined )
                      message+= " zu *" + result[i].skill+"*"

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

        
                    if (intent == "skill"){

                      if(params["mitarbeiter"] == undefined||  params["mitarbeiter"] == "" && result[i].mitarbeiter != undefined)
                        message+= " mit *" + result[i].mitarbeiter +"*"

                      if(params["skill"] == undefined ||  params["skill"] == "" && result[i].skill != undefined )
                          message+= " zu dem Skill *" + result[i].skill +"*"

                      if(params["erfahrung"] == undefined ||  params["erfahrung"] == "" && result[i].erfahrung != undefined)
                        message+= " auf dem Erfahrungslevel *" + result[i].erfahrung+"*"
                }
          }
          
          return message
        },
        compare: function(array,params){

        }
    //   cardmessage: function(params,result,intent){
    //     // Der card builder
    //            counter = 0
    //            var cardentry
    //            while(result[counter] != undefined){
    //            data = result[counter]
    //            cardentry +=  result[counter][1]+ "" + []
    //            console.log ("Eintrag: "+counter + "ist " + JSON.stringify(parameters[counter]))
               
    //           }
    //        
    //     }

     
}