
var database = require('./db');


module.exports = {
  // ********** tools *****
    // Name => ID
    preconditions: function (params,intent){
      console.log("In Preconditions")
      console.log("Intent in prekonditions = " + intent)
        if (undefined != params["mitarbeiter"] && "" != params["mitarbeiter"]){
            console.log("In mitarbeiter")
            var query = "Select mpr_mta_id from mitarbeiter_properties where mpr_erstellt_von = '" + params["mitarbeiter"] + "'" 
            var mitarbeiter = database.database(query)
            console.log("Die Prekonditions:"+mitarbeiter[1].MPR_MTA_ID)
            params["mitarbeiter"] = mitarbeiter[1].MPR_MTA_ID

            if (intent == "framework")
            params = JSON.parse(JSON.stringify(params).split('"mitarbeiter":').join('"mfe_mta_id":'))

            if (intent == "programmiersprache")
            params = JSON.parse(JSON.stringify(params).split('"mitarbeiter":').join('"mpe_mta_id":'))

            if (intent == "skill")
            params = JSON.parse(JSON.stringify(params).split('"mitarbeiter":').join('"mse_mta_id":'))
        } 
        
          if (undefined != params["erfahrung"] && "" != params["erfahrung"]){
            console.log("In erfahrung")
            console.log("Erfahrung = " + JSON.stringify(params.erfahrung))
            var query = "Select erfa_id from erfahrung where erfa_bezeichnung = '" + params["erfahrung"] + "'" 
            var erfahrung = database.database(query)
            console.log("Die Prekonditions:"+erfahrung[1].ERFA_ID)
            params["erfahrung"] = erfahrung[1].ERFA_ID

            if (intent == "framework")
            params = JSON.parse(JSON.stringify(params).split('"erfahrung":').join('"mfe_erfa_id":'))

            if (intent == "programmiersprache")
            params = JSON.parse(JSON.stringify(params).split('"erfahrung":').join('"mpe_erfa_id":'))

            if (intent == "skill")
            params = JSON.parse(JSON.stringify(params).split('"erfahrung":').join('"mse_erfa_id":'))
           
        }

        if (undefined != params["programmiersprache"] && "" != params["programmiersprache"]){
                console.log("In programmiersprache")
                var query = "Select prog_ID from programmiersprachen where prog_bezeichnung = '" + params["programmiersprache"] + "'" 
                var programmiersprache = database.database(query)
                console.log("Die Prekonditions:"+programmiersprache[1].PROG_ID)
                params["programmiersprache"] = programmiersprache[1].PROG_ID
                params = JSON.parse(JSON.stringify(params).split('"programmiersprache":').join('"mpe_prog_id":'))
                console.log("Programmmiersprache:" + params['mpe_prog_id'])
        }

        if (undefined != params["framework"] && "" != params["framework"]){
                console.log("In Framework")
                var query = "Select fram_ID from frameworks where fram_bezeichnung = '" + params["programmiersprache"] + "'" 
                var framework = database.database(query)
                console.log("Die Prekonditions:"+framework[1].FRAM_ID)
                params["framework"] = framework[1].FRAM_ID
                params = JSON.parse(JSON.stringify(params).split('"framework":').join('"mfe_fram_id":'))
                console.log("Framework:" + params['mfe_fram_id'])
        }

      if (undefined != params["skill"] && "" != params["skill"]){
          console.log("In skills")
          var query = "Select skill_id from skills where skil_bezeichnung = '" + params["skill"] + "'" 
          var skill = database.database(query)
          console.log("Die Prekonditions:"+skill[1].SKIL_ID)
          params["skill"] = skill[1].SKIL_ID
          params = JSON.parse(JSON.stringify(params).split('"skill":').join('"mse_skil_id":'))
          console.log("SKill:" + params['mse_skil_id'])
      }     

      // Hier muss noch ein Case eingefügt werden, der Felder mit z.B. framework = "" löscht 
        console.log("Raus aus Preconditions")
          return params
    },


  // converter ID => Name
    converter:function(result){
      console.log("in converter")
      var counter = 1
       while(result[counter] != undefined){
              console.log("in Reihe")
                    var key 
                    var index 
                    var validator
                  // Proframmiersprache
                  if(result[counter]['MPE_PROG_ID'] != undefined){
                    console.log('Eintrag gefunden Programmiersprache')
                    key = result[counter]['MPE_PROG_ID'] 
                    index = 'MPE_PROG_ID'
                    console.log('Der Key'+key)
                    result[counter] = module.exports.programmiersprache(counter,index,key,result)
                  }
               
                  if(result[counter]['MPE_ERFA_ID'] != undefined){
                      console.log('Eintrag gefunden Erfahrung')
                      key = result[counter]['MPE_ERFA_ID'] 
                      index = 'MPE_ERFA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.erfahrung(counter,index,key,result)
                    } 
                 
                    if(result[counter]['MPE_MTA_ID'] != undefined){
                      console.log('Eintrag gefunden  Mitarbeiter')
                      key = result[counter]['MPE_MTA_ID'] 
                      index = 'MPE_MTA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.mitarbeiter(counter,index,key,result)
                    } 

                    
                    // Für Framework Erfahrung und Mitarbeiter
                    if(result[counter]['MFE_FRAM_ID'] != undefined){
                      console.log('Eintrag gefunden Framework')
                      key = result[counter]['MFE_FRAM_ID'] 
                      index = 'MFE_FRAM_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.framework(counter,index,key,result)
                    } 

                    if(result[counter]['MFE_ERFA_ID'] != undefined){
                      console.log('Eintrag gefunden Erfahrung')
                      key = result[counter]['MFE_ERFA_ID'] 
                      index = 'MFE_ERFA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.erfahrung(counter,index,key,result)
                    } 
                 
                    if(result[counter]['MFE_MTA_ID'] != undefined){
                      console.log('Eintrag gefunden  Mitarbeiter')
                      key = result[counter]['MFE_MTA_ID'] 
                      index = 'MFE_MTA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.mitarbeiter(counter,index,key,result)
                    } 

                      // Für Skill Erfa und Mitarbeiter
                   
                    if(result[counter]['MSE_SKIL_ID'] != undefined){
                      console.log('Eintrag gefunden')
                      key = result[counter]['MSE_SKIL_ID'] 
                      index = 'MSE_SKIL_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.skills(counter,index,key,result)
                    } 

                    if(result[counter]['MSE_ERFA_ID'] != undefined){
                      console.log('Eintrag gefunden Erfahrung')
                      key = result[counter]['MSE_ERFA_ID'] 
                      index = 'MSE_ERFA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.erfahrung(counter,index,key,result)
                    } 
                 
                    if(result[counter]['MSE_MTA_ID'] != undefined){
                      console.log('Eintrag gefunden  Mitarbeiter')
                      key = result[counter]['MSE_MTA_ID'] 
                      index = 'MSE_MTA_ID'
                      console.log('Der Key'+key)
                      result[counter] = module.exports.mitarbeiter(counter,index,key,result)
                    }
                    validator = Object.keys(result[counter])
                     console.log("Der Validator:"+validator)
                     result[counter] = module.exports.validator(result,validator,counter)
     
                    
                
                console.log('wieder raus')
       counter++
     }
     return result
    },
    counter: function (params,intent){
        console.log("hallo aus counter")
        console.log("String: " + params["ID"])
        var params 
        
        var output = "Select * from " 
        switch(intent){
            case "programmiersprache" || "programmiersprachefu":
            output += " mta_prog_erfa_zuo "
            break;
            case "skill" || "skillfu":
            output += " mta_skil_erfa_zuo "
            break;
            case "framework" || "frameworkfu":
            output += " mta_fram_erfa_zuo "
            break;
            case "datei":
            break; 
        }
        output += "where ";
        var counter = 0
        for (var i in params) {
            if (params[i] != ""){
                if(counter == 0)
            output += i + " = '" + params[i] + "'"
            else{
            output += " AND " + i + " = '" + params[i]+ "'"
            }
            counter++
            } 
        }
        console.log("Der Output ist: " + output)
        return output
    },

    // *********** Die Methoden für den Converter *************
    
    // Wandelt keys in konkrete Namen um 

    programmiersprache : function (counter,index,key,result){
      var programmiersprache = database.database("Select prog_id,prog_bezeichnung from programmiersprachen")
      console.log('In PS DB-Eintrag gefunden')
      var i = 1
      while(programmiersprache[i] != undefined){
        // console.log(i+"Durchgang")
        if (programmiersprache[i]['PROG_ID'] === key){
          console.log('der Key wurde gefunden')
          // Prog Bezeichnung finden
          result[counter][index] = programmiersprache[i]['PROG_BEZEICHNUNG']
          result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+ index+'":').join('"programmiersprache":'))
          console.log("Programmiersprache:" + result[counter]['programmiersprache'])
          console.log("Result aus Programmiersprache:" + JSON.stringify(result[counter]))
          
        }
        i++
        }
        return result[counter]
    },framework : function (counter,index,key,result){
      var frameworks = database.database("Select fram_id,fram_bezeichnung from frameworks")
      console.log('In PS DB-Eintrag gefunden')
      var i = 1
      while(frameworks[i] != undefined){
        // console.log(i+"Durchgang")
        if (frameworks[i]['FRAM_ID'] === key){
          console.log('der Key wurde gefunden')
          // Prog Bezeichnung finden
          result[counter][index] = frameworks[i]['FRAM_BEZEICHNUNG']
          result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+ index+'":').join('"framework":'))
          console.log("Framework:" + result[counter]['framework'])
          console.log("Result aus Framework:" + JSON.stringify(result[counter]))
          
        }
        i++
        }
        return result[counter]
    },
      skills : function (counter,index,key,result){
        var skills = database.database("Select skil_id,skil_bezeichnung from skills")
        console.log('In PS DB-Eintrag gefunden')
        var i = 1
        while(skills[i] != undefined){
         // console.log(i+"Durchgang")
          if (skills[i]['SKIL_ID'] === key){
            console.log('der Key wurde gefunden')
            // Prog Bezeichnung finden
            result[counter][index] = skills[i]['SKIL_BEZEICHNUNG']
            result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+ index+'":').join('"skills":'))
            console.log("Skill:" + result[counter]['skills'])
           // console.log("Result aus Skills:" + JSON.stringify(result[counter]))
            
          }
          i++
          }
          return result[counter]
      },
     mitarbeiter : function (counter,index,key,result){
      var mitarbeiter = database.database("Select mpr_mta_id,mpr_erstellt_von from mitarbeiter_properties")
      var i = 1
      while(mitarbeiter[i] != undefined){
        //console.log(i+"Durchgang")
        //console.log("Der Scheiß key:"+key)
        //console.log("Das Scheiß Ergebnis:"+mitarbeiter[i]['MPR_MTA_ID'])
        if (mitarbeiter[i]['MPR_MTA_ID'] === key){
          console.log('der Key wurde gefunden')
          result[counter][index] = mitarbeiter[i]['MPR_ERSTELLT_VON']
          result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+ index+'":').join('"mitarbeiter":'))
          // console.log("Ergebnis Aus Mitarbeiter:" + JSON.stringify(result[counter]))
        }
        i++
        }
        return result[counter]
    },
    erfahrung : function (counter,index,key,result){
      var erfahrung = database.database("Select erfa_id, erfa_bezeichnung from erfahrung")
      var i = 1
      console.log("Erfahrung am Anfang:" + JSON.stringify(result[counter]))
      while(erfahrung[i] != undefined){
       // console.log(i+"Durchgang")
        //console.log("Der Scheiß key:"+key)
        //console.log("Das Scheiß Ergebnis:"+erfahrung[i]['ERFA_ID'])
        if (erfahrung[i]['ERFA_ID'] === key){
          console.log('der Key wurde gefunden')
          result[counter][index] = erfahrung[i]['ERFA_BEZEICHNUNG']
          console.log("Der neue EIntrag aus Erfahrung"+ result[counter][index])
          result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+ index+'":').join('"erfahrung":'))
         // console.log("Ergebnis AUs Erfahrung:" + JSON.stringify(result[counter]))
        }
        i++
        }
        return result[counter]
    },
    // *** Wandelt SPaltenschlüssel in Namen um
    validator: function(result,validator,counter){
      console.log("In validator")
              
                    index = 0
                    while (validator[index]!= undefined){

                    
                    if('MPE_ERSTELLT_VON'  == validator[index] || 'MSE_ERSTELLT_VON'  == validator[index] || 'MFE_ERSTELLT_VON'  ==  validator[index])
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"ersteller":')) 

                    if('MPE_ERSTELLT_AM' == validator[index] || 'MSE_ERSTELLT_AM' == validator[index] || 'MFE_ERSTELLT_AM' == validator[index]) 
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"erstelldatum":')) 
 
                    if('MPE_GEPFLEGT_VON' == validator[index] || 'MSE_GEPFLEGT_VON' == validator[index] || 'MFE_GEPFLEGT_VON' == validator[index])
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"pfleger":')) 

                    if('MPE_GEPFLEGT_AM' == validator[index] || 'MSE_GEPFLEGT_AM' == validator[index] || 'MFE_GEPFLEGT_AM' == validator[index])
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"pflegedatum":'))
                    
                    if('MPE_LEVEL'  == validator[index] || 'MSE_LEVEL'  == validator[index] || 'MFE_LEVEL'  == validator[index])
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"level":'))

                    if('MPE_KOMMENTAR'  == validator[index] || 'MSE_KOMMENTAR'  == validator[index] || 'MFE_KOMMENTAR'  == validator[index])
                    result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"'+validator[index]+'":').join('"kommentar":'))

                    index++
                  }
              
              return result[counter]
    },
    contextButtler: function(req,name){
      console.log("In Kontextbuttler")
      // Finden des richtigen Kontext, damit der Chatbot weiß ob update oder info
      var i = 1
      var context = ""
      var outputContexts = req.body.queryResult.outputContexts
      console.log("Der Kontext aus Programmiersprache: "+JSON.stringify(req.body.queryResult.outputContexts))
      console.log("Unser Vergleichskontext:"+ name)
      console.log("Die Länge des Kontext" +outputContexts.length)

      for ( var i=1; i < outputContexts.length; i++ ) {
        if (outputContexts[i].name == name) {
          var context = outputContexts[i] ; // "entry" is now the entry you were looking for
          // ... do something useful with "entry" here...
        }
        
      }
      console.log("Kontext nach Konvertierung :" + context)
      return context

    }
    
    
};