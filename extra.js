var builder = require('./builder')
var tools = require('./tools')
var database = require('./db')

module.exports = {
    getFunction : function(params,session){
        console.log("in getFunction")
           // context = params["auswahl_funktion"]
            for (var key in params)
                context = params[key]
          // var message = "Gut also " +context+ ": Du kannst mich zu einer bestimmten Fähigkeit, einem bestimmten Mitarbeiter oder einem bestimmten Erfahrlevel befragen "
            var outputContexts= [  
                {  
                "name":session + "/contexts/" + context ,
                "lifespanCount":1,
                
            }
            ]
            var message = builder.builder(outputContexts,message)
        
        return message
    },
    save : function(req,session){
        console.log("in save")
        var check = undefined
        const deasync = require('deasync');
        var name = session + "/contexts/eintrag"
        var data = req.body.queryResult.outputContexts
        var params =  data.filter(
             function (data){
                if (data.name == name){
                check = "done"
                console.log("gefunden")
                return data.name == name}}  
         )
        deasync.loopWhile(() => check == undefined);
        check = undefined
        name = session + "/contexts/info"
        var info =  data.filter(
            function (data){
               if (data.name == name){
               check = "done"
               console.log("gefunden")
               return data.name == name}}  
       
        )
       deasync.loopWhile(() => check == undefined);
       console.log("Info:"+JSON.stringify(info))
        console.log("Der Eintrag wurde ausgelesen")
        var message = {}
        var entry = info[0]["parameters"]["entry"]
        console.log("Entry"+ JSON.stringify(entry))
        var key= 1
        if(entry == undefined){
            console.log("in undefined")
            entry ={}
            entry[key] =  params[0]["parameters"]["context"]
            
        } else{
            console.log("in else")
            key = Object.keys(entry).sort().pop()
            console.log(key + "Der KEy")
            key = parseInt(key) +1
            entry[key] = params[0]["parameters"]["context"]
        }
        message["outputContexts"] = [  
            {  
            "name":session + "/contexts/" + "info" ,
            "lifespanCount":5,
            "parameters":{
                entry 
               }
           }
      ] 
        return message
    },
    getParamsByName : function(name, data){
        
        var check = undefined
        data = data.filter(
            function (data){ 
                if (data.name == name){
                check = "done"
                return data.name == name}} 
        );
        deasync.loopWhile(() => check == undefined);
        return data
    },
    send : function(req,session){
        var name = session + "/contexts/info"
        var data = req.body.queryResult.outputContexts
        var info =  data.filter(
             function (data){
                if (data.name == name){
                check = "done"
                console.log("gefunden")
                return data.name == name}}  
         )
        deasync.loopWhile(() => check == undefined);
        nodmailer = require('nodemailer')
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth:{
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        })
        let mailOptions = {
            from: '"Raphael Palombo" <raphzahn1@gmail.com>',
            to: "raphael.palombo@gmx.de",
            subject: "Hello from Node",
            text: "Hallo raphael du bist schlau" + info
        }

        transporter.sendMail(mailOptions,(error,info)=>{
            if (error){
                return console.log(error)
            }
            console.log("Nachricht gesendet",info.messageId)
        })
        
    },
    insert : function(name,params,intent){
        console.log("In Insert aus Extra")
        var query
        if (intent == "eintragen_programmiersprache"){
            var typ = "programmiersprache"
            params = tools.preconditions(params,typ)
            // ACHTUNG! Datum muss noch angepasst werden
            //query = "Insert into mta_prog_erfa_zuo (mpe_id,mpe_prog_id,mpe_erfa_id,mpe_erstellt_von,mpe_erstellt_am,mpe_gepflegt_von,mpe_gepflegt_am,mpe_level,mpe_mta_id) values ('333','"+params.mpe_prog_id+"','"+params.mpe_erfa_id+"','"+name+"','01.05.2019','"+name+"','01.05.2019','2','"+params.mpe_mta_id+"');"
        }else if (intent == "eintragen_framework"){
            var typ = "framework"
            params = tools.preconditions(params,typ)
            query = "Insert into mta_fram_erfa_zuo (mfe_fram_id,mfe_erfa_id,mfe_erstellt_von,mfe_erstellt_am,mfe_gepflegt_von,mfe_gepflegt_am,mfe_mta_id) values ("+params.mfe_prog_id+","+params.mfe_erfa_id+","+name+","+Date.now.stringify+","+params.mfe_mta_id+");"
        }else if(intent == "eintragen_skill"){
            var typ = "skill"
            params = tools.preconditions(params,typ)
            query = "Insert into mta_skil_erfa_zuo (mse_skil_id,mse_erfa_id,mse_erstellt_von,mse_erstellt_am,mse_gepflegt_von,mse_gepflegt_am,mse_mta_id) values ('"+params.mfe_prog_id+"','"+params.mfe_erfa_id+","+name+","+Date.now.stringify+","+params.mfe_mta_id+");"
        }
        console.log("Der Query vor dem Datenbankeintrag:" + query)
        database.insert(query)
    }
    


}