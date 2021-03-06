framework = require('./framework')
skill = require ('./skill')
programmiersprache = require ('./programmiersprache')
extra = require ('./extra')
fallback = require ('./fallback')


module.exports = {
    cb: function(req){
        console.log("in manager")
        var query = null
        var intent = req.body.queryResult.intent.displayName
        var params = req.body.queryResult.parameters
        var session = req.body.session
        var context = req.body.queryResult.outputContexts
        
        console.log (intent + JSON.stringify(params) +session )

        // *** auswahl bei mehreren unterschiedlichen intents **
          if(intent == "info_auswahl-funktion" || intent == "eintragen_auswahl" || intent == "update_auswahl-funktion")
             query = extra.getFunction(params,session)

        //***  wird nicht  mehr benötigt 
        //if(intent == "update_auswahl-funktion")
        //query = extra.getUpdate(params,session,context)
        
        if(intent == "update_auswaehlen_kommentar_start" || intent == "update_auswaehlen_level_start"){
            query = extra.update(req, intent,session)}


        //*** speichern von Daten **
         if(intent == "speichern_yes")
                query = extra.save(req,session)

        //*** speichern von Daten **
        if(intent == "senden")
        query = extra.send(req,session)

        // *** framework ***
        if(intent == "framework")
            query = framework.getFramework(session,params,intent);

        if(intent == "framework_FU"){
            query = framework.getFrameworkFU(req,session,params);
        }

        // *** skill ***            
        if(intent == "skill")
            query = skill.getSkill(params,intent);

        if(intent == "skill_FU")
            query = skill.getSkillFU(params,intent);  

        // *** Programmiersprache ***
        if(intent == "programmiersprache")
            query = programmiersprache.getProgrammiersprache(session,params,intent,req)

        if (intent == "programmiersprache_vergleich")
            query = programmiersprache.getProgrammierspracheVS(session,params,intent)

        if(intent == "programmiersprache_FU")
            query = programmiersprache.getProgrammierspracheFU(req,session,params);
        

        // *** Eintrag ***
        if(intent == "eintragen_yes"){
            console.log("Eintragen_yes yes")
           // var name = req.body.outputContexts[2].parameters.user
            var name = "Tester"
            console.log("Name: "+ name)
            query = extra.insert(name,req,session);
        } 

        //*** Der Webhook für den Fallbackintent
        if (intent == "Default Fallback Intent")
            query = fallback.fallback(req,session)
        
        

        return query
    }
}