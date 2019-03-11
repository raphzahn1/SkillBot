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
            return data
        },
        message: function(result,params){
          console.log("Es geht in Message")
          console.log ("Ohne Mitarbeiter"+JSON.stringify(params))
          var message =""
          var i = 1
          while(result[i]!= undefined){
            // die position des Eintrags
            if(result[i+1] == undefined){
                message+= " und ein letzter Eintrag  "
            }else if(i == 1){
              message+= "Ein erste Eintrag ist  "
            }else{
              message+= ", ein weiterer Eintrag  "
            }
            // ab hier die Inhalte
            if(params["mitarbeiter"] == undefined && result[i].mitarbeiter != undefined)
              message+= "zu " + result[i].mitarbeiter

            if(params["programmiersprache"] == undefined && result[i].programmiersprache != undefined)
              message+= "mit der Programmiersprache " + result[i].programmiersprache

            if(params["erfahrung"] == undefined && result[i].erfahrung != undefined)
              message+= "mit dem Erfahrungslevel " + result[i].erfahrung
            
            

              message+= ".\n\n"
            i++
          }
          return message
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