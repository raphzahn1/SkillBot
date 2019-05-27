module.exports = {
     fallback : function(req,session){
         console.log("In fallback")
        var array = []
        var back = {}
        var outputContexts = req.body.queryResult.outputContexts
        for ( var i=0; i < outputContexts.length; i++ ) {
              var name = outputContexts[i].name ; // "entry" is now the entry you were looking for
              // ... do something useful with "entry" here...
              array.push(name)
          }
        console.log("Das fertige Array:"+array)
        // Fallbacks für:

        //option
        if (array.includes(session + "/contexts/option")){
            back["fulfillmentText"] = "Bitte sage konkret, was du machen möchtest. Am einfachsten sagst du einfach die Schlüsselwörter Update, Auskunft oder Eintrag ;) (Aus dem Webhook)"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "option",
              "lifespanCount":1
            }
          ]
        }
        // Kategorie (Programmiersprache, Skills, Framework)
        if (array.includes(session + "/contexts/kategorie")){
            console.log("in Kategorie")
            var road
            back["fulfillmentText"] = "Bitte sage konkret, welche Kategorie du möchtest. Am einfachsten sagst du einfach die Schlüsselwörter Programmiersprache, Framework oder Skills ;) (Aus dem Webhook)"
            if(array.includes(session + "/contexts/info"))
                road = "/contexts/info"

            if(array.includes(session + "/contexts/update"))
            road = "/contexts/update"

            if(array.includes(session + "/contexts/insert"))
            road = "/contexts/insert"

            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "kategorie",
              "lifespanCount":1
            }
            ,{  
                "name":session + road,
                "lifespanCount":1
              }

          ]
        }
        console.log("Fallback zurückgegeben")
        return back
    }

}