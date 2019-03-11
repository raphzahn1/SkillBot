
var database = require('./db');


module.exports = {
  // ********** tools *****
    // Name => ID
    preconditions: function (params){
        if (undefined != params["mitarbeiter"]){
            var query = "Select mpr_mta_id from mitarbeiter_properties where mpr_erstellt_von = '" + params["mitarbeiter"] + "'" 
            params["mitarbeiter"] = database.database(query)
            params = JSON.parse(JSON.stringify(params).split('"mitarbeiter":').join('"mpe_mta_id":'))
            console.log("Mitarbeiter:" + params['mpe_mta_id'])
        } 
        if (undefined != params["programmiersprache"]){
                var query = "Select prog_ID from programmiersprachen where prog_bezeichnung = '" + params["programmiersprache"] + "'" 
                params["programmiersprache"] = database.database(query)
                params = JSON.parse(JSON.stringify(params).split('"programmiersprache":').join('"prog_id":'))
                console.log("Programmmiersprache:" + params['prog_id'])
        }
        if (undefined != params["erfahrung"]){
                var query = "Select erfa_id from erfahrung where erfa_bezeichnung = '" + params["erfahrung"] + "'" 
                params["erfahrung"] = database.database(query)
                params = JSON.parse(JSON.stringify(params).split('"erfahrung":').join('"erfa_id":'))
                console.log("Erfahrung:" + params['erfa_id'])
            }
        // Hier noch für Framework und Kompetenzen einfügen!!
          return params
    },


  // converter ID => Name
    converter2:function(result){
      console.log("in converter")
      var counter = 1
       while(result[counter] != undefined){
              console.log("in Reihe")
                    var key 
                    var index 
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
                      console.log('Eintrag gefunden')
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
    cardmessage: function(params,result,intent){
       // Der card builder
              counter = 0
              var cardentry
              while(result[counter] != undefined){
              data = result[counter]
              cardentry +=  result[counter][1]+ "" + []
              console.log ("Eintrag: "+counter + "ist " + JSON.stringify(parameters[counter]))
              
             }
    },

    // *********** Die Methoden für den Converter*************

    programmiersprache : function (counter,index,key,result){
      var programmiersprache = database.database("Select prog_id,prog_bezeichnung from programmiersprachen")
      console.log('In PS DB-Eintrag gefunden')
      var i = 1
      while(programmiersprache[i] != undefined){
        console.log(i+"Durchgang")
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
        console.log(i+"Durchgang")
        if (programmiersprache[i]['FRAM_ID'] === key){
          console.log('der Key wurde gefunden')
          // Prog Bezeichnung finden
          result[counter][index] = programmiersprache[i]['FRAM_BEZEICHNUNG']
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
          console.log(i+"Durchgang")
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
    }
};