var builder = require('./builder')
var tools = require('./tools')
var database = require('./db')
var date = require('date-and-time')

module.exports = {
    getFunction : function(params,session){
        console.log("in getFunction")
           // context = params["auswahl_funktion"]
            for (var key in params){
                if (key == "auswahl_funktion")
                context = params[key]

                if (key == "anfragen_auskunft")
                context = params[key]


            }

                
          // var message = "Gut also " +context+ ": Du kannst mich zu einer bestimmten Fähigkeit, einem bestimmten Mitarbeiter oder einem bestimmten Erfahrlevel befragen "
            var outputContexts= [  
                {  
                "name":session + "/contexts/" + context ,
                "lifespanCount":1,
                
            },
            ]
            var message = builder.builder(outputContexts,message)
        
        return message
    },getUpdate : function(params,session){
        console.log("in getFunction")
           // context = params["auswahl_funktion"]
            for (var key in params){
                if (key == "auswahl_funktion")
                context = params[key]

                if (key == "anfragen_auskunft")
                context = params[key]


            }
        
        var params
        var key
        var i = 1

        // Hier werden jetzt die Daten aus dem Letzten Intent gesucht, die eingetragen werden sollen

        while (params == undefined){
            key = req.body.queryResult.outputContexts[i].name

            if(key == session + "/contexts/programmiersprache_fu" || session + "/contexts/framework_fu"||session + "/contexts/skills_fu")
            params = req.body.queryResult.outputContexts[i].parameters

            i++
            }

                
          // var message = "Gut also " +context+ ": Du kannst mich zu einer bestimmten Fähigkeit, einem bestimmten Mitarbeiter oder einem bestimmten Erfahrlevel befragen "
            var outputContexts= [  
                {  
                "name":session + "/contexts/" + context ,
                "lifespanCount":1,
                
            },{
                "name":session + "/contexts/update" ,
                "lifespanCount":1, 
                params
            }]
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
    insert : function(name,req,intent,session){
        console.log("In Insert aus Extra")
        date = date.format(new Date(),'DD.MM.YYYY')
        var context = session + "/contexts/insert"
        var query
        var values
        var params
        var key
        var i = 1

        // Hier werden jetzt die Daten aus dem Letzten Intent gesucht, die eingetragen werden sollen

        while (params == undefined){
            key = req.body.queryResult.outputContexts[i].name

            if(key == context)
            params = req.body.queryResult.outputContexts[i].parameters

            i++
            }
        console.log("Prams Programmiersprache für den Check" + params.programmiersprache)
        

        // ACHTUNG! Datum muss noch angepasst werden

        /*
            -> Level muss angepasst werden
            -> ID anpassen
            -> wenn funktioniert auf framework und skill übertragen ACHTUNG!!!!!!!
        */ 

        if (params.programmiersprache != undefined){
            var typ = "programmiersprache"
            params = tools.preconditions(params,typ)
            query = "Insert into mta_prog_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=['333',params.mpe_prog_id,params.mpe_erfa_id,name,date,name,date,'2',params.mpe_mta_id,"Test_Kommentar"]

            // Noch nicht fertig!!!!!!!!!
        }else if (params.framework != undefined){
            var typ = "framework"
            params = tools.preconditions(params,typ)
            query = "Insert into mta_prog_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=['333',params.mpe_prog_id,params.mpe_erfa_id,name,date,name,date,'2',params.mpe_mta_id,"Test_Kommentar"]
        }else if(params.skill != undefined){
            var typ = "skill"
            params = tools.preconditions(params,typ)
            query = "Insert into mta_prog_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=['333',params.mpe_prog_id,params.mpe_erfa_id,name,date,name,date,'2',params.mpe_mta_id,"Test_Kommentar"]
        }
        console.log("Der Query vor dem Datenbankeintrag:" + query +"und die Values " + values)
        console.log("value 0 einzelnes Experiment" + values[0])
        database.insert(query,values)
    }
    


}