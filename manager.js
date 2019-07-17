/*
    Import:
        Framework, Programmiersprache, Skill: für Auskunft von Mitarbeiterfähigkeiten BA S.56
        Extra: für Einträge, Email und Updates von Mitarbeiterfähigkeiten
        Fallback: für Situationsgerechte Hilfestellungen BA.58
*/
framework = require('./framework')
skill = require ('./skill')
programmiersprache = require ('./programmiersprache')
extra = require ('./extra')
fallback = require ('./fallback')


module.exports = {
    // Callbackmethode, die aus index.js aufgerufen wird
    cb: function(req){
        console.log("in manager")
        // Hier werden der Intentname, Entities als Parameter, und Session ID ausgelesen. 
        // Die Session ID wird benötigt um Kontexts aus Session ID + Kontextname zu bauen
        var query = null
        var intent = req.body.queryResult.intent.displayName
        var params = req.body.queryResult.parameters
        var session = req.body.session
        
        console.log (intent + JSON.stringify(params) +session )
        // Hier werden die Funktionen den Einzelnen Intents zugeordnet: 

        // *** auswahl bei mehreren unterschiedlichen intents **
          if(intent == "info_auswahl-funktion" || intent == "eintragen_auswahl" || intent == "update_auswahl-funktion")
             query = extra.getFunction(params,session)

        // *** Update durchführen **
        if(intent == "update_auswaehlen_kommentar_start" || intent == "update_auswaehlen_level_start"){
            query = extra.update(req, intent,session)}


        //*** merken von Daten **
         if(intent == "speichern_yes")
                query = extra.save(req,session)

        //*** speichern von Daten **
        if(intent == "senden")
        query = extra.send(req,session)

        // Ab jetzt alle Funktionen für die Auskünfte ...

        // *** framework ***
        if(intent == "framework")
            query = framework.getFramework(session,params,intent,req);

        if(intent == "framework_FU"){
            query = framework.getFrameworkFU(req,session,params);
        }

        // *** skill ***            
        if(intent == "skills")
            query = skill.getSkill(session,params,intent,req);

        if(intent == "skills_FU")
            query = skill.getSkillFU(req,session,params);  

        // *** Programmiersprache ***
        if(intent == "programmiersprache")
            query = programmiersprache.getProgrammiersprache(session,params,intent,req)

        if (intent == "programmiersprache_vergleich")
            query = programmiersprache.getProgrammierspracheVS(session,params,intent)

        if(intent == "programmiersprache_FU")
            query = programmiersprache.getProgrammierspracheFU(req,session,params);
        
        // Hier Eintrag:

        // *** Eintrag ***
        if(intent == "eintragen_yes"){
            query = extra.insert(req,session);
        } 

        // Hier Fallback:

        //*** Der Webhook für den Fallbackintent
        if (intent == "Default Fallback Intent")
            query = fallback.fallback(req,session)
        
        // Die Antwort wird an den Webserver ausgegeben
        return query
    }
}