
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
    converter: function (result){
      counter = 0
      while (result[counter] != undefined){
        console.log("in converter")
        if (undefined != result[counter]['MPE_MTA_ID']){
            console.log('in while')
              var query = "Select mpr_erstellt_von from mitarbeiter_properties where mpr_mta_id  = '" + result[counter]['MPE_MTA_ID'] + "'" 
              var entry = database.database(query)
              result[counter]['MPE_MTA_ID'] = entry[0]['MPR_ERSTELLT_VON']
              result[counter] = JSON.parse(JSON.stringify(result[counter]).split('"MPE_MTA_ID":').join('"mitarbeiter":'))
              console.log("Mitarbeiter:" + result[counter]['"mitarbeiter":'])
        } 
    //    if (undefined != result[counter]['MPE_PROG_ID']){
    //     var query = "Select mpe_prog_bezeichnung from programmiersprachen where = prog_id = '" + result[counter]['MPE_PROG_ID'] + "'" 
    //     result[0]['MPE_ROG_ID'] = database.database(query)
    //     result = JSON.parse(JSON.stringify(result).split('"MPE_PROG_ID":').join('"programmiersprache":'))
    //     console.log("Programmmiersprache:" + result['programmiersprache'])
    //   }
    //   if (undefined != result[counter]['MPE_ERFA_ID']){
    //     var query = "Select erfa_bezeichnung from erfahrung where erfa_bezeichnung = '" + result[counter]['MPE_ERFA_ID'] + "'" 
    //     result[0]['MPE_ERFA_ID'] = database.database(query)
    //     result = JSON.parse(JSON.stringify(result).split('"MPE_ERFA_ID":').join('"erfahrung":'))
    //     console.log("Erfahrung:" + result['erfahrung'])
    // }

    // Hier noch für die verschiedenen Tabellen IDS einfügen!!
    counter++
    console.log("hallo")
    }
    // Hier noch für Framework und Kompetenzen einfügen!!
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
    }
};