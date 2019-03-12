module.exports={
    builder: function(session,result,message){

        // Der Context builder
            counter = 0
            var parameters = {}
            var data
            while(result[counter] != undefined){
              data = result[counter]
              parameters[counter + 1] = []
              parameters[counter + 1].push(data)
              counter++
              console.log ("Eintrag: "+counter + "ist " + JSON.stringify(parameters[counter]))
              
            }
  
        // Der card builder
            // counter = 0
            // var cardentry
            // while(result[counter] != undefined){
            //   data = result[counter]
            //   cardentry +=  result[counter][1]+ "" + []
            //   console.log ("Eintrag: "+counter + "ist " + JSON.stringify(parameters[counter]))
              
            // }
            
            
  
            data= {
              "fulfillmentText": message,
              "fulfillmentMessages": [
                {
                  "card": {
                    "title": "card title",
                    "subtitle": "card text",
                    "imageUri": "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                    "buttons": [
                      {
                        "text": "button text",
                        "postback": "https://assistant.google.com/"
                      }
                    ]
                  }
                }
              ]
              , "outputContexts": [  
              {  
                "name":session + "/contexts/" + "selection" ,
                "lifespanCount":5,
                parameters
                }
             ]
          }
            return data
      }
}