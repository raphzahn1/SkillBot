framework = require('./framework')
skill = require ('./skill')
erfahrung = require ('./programmiersprache')
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
            entry = req.outputContexts.parameters.auswahl
            var context = req.outputContexts.parameters.result[entry]
            query = framework.getFrameworkFU(session,params,context,intent)
        }

        // *** skill ***            
        else if(intent == "skill")
            query = skill.getSkill(params,intent);
        else if(intent == "skill_FU")
            query = skill.getSkillFU(params,intent);  

        // *** erfahrung ***
        else if(intent == "erfahrung")
            query = programmiersprache.getProgrammiersprache(params,intent);
        else if(intent == "erfahrung_FU")
            query = programmiersprache.getProgrammierspracheFU(params,intent);

        // ****  sonstiges ***
        else if (intent == "datei")
            query = sonstiges.getDatei(params,intent);

        return query
    }
}