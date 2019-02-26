framework = require('./framework')
skill = require ('./skill')
erfahrung = require ('./erfahrung')
sonstiges = require ('./sonstiges')


module.exports = {
    cb: function(params,intent){
        var query

        // *** framework ***
        if(intent == "framework")
            query = framework.Framework(params,intent);
        else if(intent == "framework_FU")
            query = framework.getFrameworkFU(params,intent);
        else if (intent == "ID_framework")
            query = framework.getFrameworkID(params,intent);

        // *** skill ***            
        else if(intent == "skill")
            query = skill.getSkill(params,intent);
        else if(intent == "skill_FU")
            query = skill.getSkillFU(params,intent);  
        else if (intent == "ID_skill")
            query = skill.getSkillID(params,intent);

        // *** erfahrung ***
        else if(intent == "erfahrung")
            query = erfahrung.getErfahrung(params,intent);
        else if(intent == "erfahrung_FU")
            query = erfahrung.getErfahrungFU(params,intent);
        else if (intent == "ID_erfahrung")
            query = erfahrung.getErfahrungID(params,intent);

        // ****  sonstiges ***
        else if (intent == "datei")
            query = sonstiges.getDatei(params,intent);

        return query
    }
}