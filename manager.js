framework = require('./framework')
skill = require ('./skill')
programmiersprache = require ('./programmiersprache')
sonstiges = require ('./sonstiges')


module.exports = {
    cb: function(req){
        console.log("in manager")
        var query
        var intent = req.body.queryResult.intent.displayName
        var params = req.body.queryResult.parameters
        var session = req.body.session
        console.log (intent + params +session)
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
        else if(intent == "programmiersprache"){
        console.log("in Programmiersprache")
            query = programmiersprache.getProgrammiersprache(session,params,intent)}
        else if(intent == "programmiersprache_FU"){
            console.log("in ProgrammierspracheFU")
            var entry = req.body.queryResult.outputContexts[1].parameters.auswahl
            console.log("Entry" + entry)
            var context = req.body.queryResult.outputContexts[1].parameters.result
            if (context == undefined)
            var context = req.body.queryResult.outputContexts[0].parameters.result

            console.log("context glesen")
            var context = context[entry]
            console.log("result ist ausgelesen")
            var fu = params["anfragen_programmiersprachen"] 
            console.log("Parameter in FU:" + JSON.stringify(fu))
            query = programmiersprache.getProgrammierspracheFU(session,fu,context,intent);
        }
        // ****  sonstiges ***
        else if (intent == "datei")
            query = sonstiges.getDatei(params,intent);

        return query
    }
}