framework = require('./framework')
skill = require ('./skill')
programmiersprache = require ('./programmiersprache')
extra = require ('./extra')


module.exports = {
    cb: function(req){
        console.log("in manager")
        var query
        var intent = req.body.queryResult.intent.displayName
        var params = req.body.queryResult.parameters
        var session = req.body.session
        console.log (intent + JSON.stringify(params) +session)

        // *** auswahl bei mehreren unterschiedlichen intents **
          if(intent == "info_auswahl-funktion" || "eintragen_auswahl")
             query = extra.getFunction(params,session)

        //*** speichern von Daten **
         if(intent == "speichern_yes")
                query = extra.save(req,session)

        //*** speichern von Daten **
        if(intent == "senden")
        query = extra.send(req,session)

        // *** framework ***
        if(intent == "framework")
            query = framework.getFramework(session,params,intent);

        else if(intent == "framework_FU"){
        
        }

        // *** skill ***            
        else if(intent == "skill")
            query = skill.getSkill(params,intent);

        else if(intent == "skill_FU")
            query = skill.getSkillFU(params,intent);  

        // *** Programmiersprache ***
        else if(intent == "programmiersprache")
            query = programmiersprache.getProgrammiersprache(session,params,intent)

        else if (intent == "programmiersprache_vergleich")
            query = programmiersprache.getProgrammierspracheVS(session,params,intent)

        else if(intent == "programmiersprache_FU"){
            query = programmiersprache.getProgrammierspracheFU(req,session,params);
        }
        // ****  sonstiges ***
        else if (intent == "datei")
            query = extra.getData(params,intent);

        return query
    }
}