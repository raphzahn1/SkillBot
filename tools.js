
var database = require('./db');
module.exports = {
  // ********** tools *****
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
                params = JSON.parse(JSON.stringify(params).split('"programmiersprache":').join('"mpe_prog_id":'))
                console.log("Programmmiersprache:" + params['mpe_prog_id'])
        }
        if (undefined != params["erfahrung"]){
                var query = "Select erfa_id from erfahrung where erfa_bezeichnung = '" + params["erfahrung"] + "'" 
                params["erfahrung"] = database.database(query)
                params = JSON.parse(JSON.stringify(params).split('"erfahrung":').join('"mpe_erfa_id":'))
                console.log("Erfahrung:" + params['mpe_erfa_id'])
            }


        return params
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
    }
    
};