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

            var funktion
            var auskunft
           // context = params["auswahl_funktion"]
            for (var key in params){
                if (key == "auswahl_funktion")
                funktion = params[key]

                if (key == "anfragen_auskunft")
                auskunft = params[key]
            }
        
        
        // Finden des richtigen Kontext, damit der Chatbot weiß ob update oder info
        var i = 1
        var context = ""
        var outputContexts = req.body.queryResult.outputContexts
        console.log("Der Kontext aus Programmiersprache: "+JSON.stringify(req.body.queryResult.outputContexts))
        console.log("Unser Vergleichskontext:"+ session + "/contexts/update")
        console.log("Die Länge des Kontext" +outputContexts.length)

        for ( var i=1; i < outputContexts.length; i++ ) {
          if (outputContexts[i].name == session + "/contexts/update") {
            var context = outputContexts[i].parameters ; // "entry" is now the entry you were looking for
            // ... do something useful with "entry" here...
          }
          
        }
        console.log("Kontext nach Konvertierung :" + context)

                
          // Kontext wird für Kommentar und Level verändert

            if(funktion == "eintragen" || auskunft == "kommentar"){
                var outputContexts= [  
                    {  
                    "name":session + "/contexts/kommentar"  ,
                    "lifespanCount":1,
                    
                },{
                    "name":session + "/contexts/update" ,
                    "lifespanCount":1, 
                    context
                }]    
            }

            if(funktion == "bearbeiten" || auskunft == "level"){
                var outputContexts= [  
                    {  
                    "name":session + "/contexts/level"  ,
                    "lifespanCount":1,
                    
                },{
                    "name":session + "/contexts/update" ,
                    "lifespanCount":1, 
                    context
                }]    
            }

            
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
    insert : function(req,session){
        console.log("Eintragen_yes")
         var name 
         var outputContexts = req.body.queryResult.outputContexts
         for ( var i=1; i < outputContexts.length; i++ ) {
            if (outputContexts[i].name == session + "/contexts/name") {
              name = outputContexts[i].parameters.user // "entry" is now the entry you were looking for
              // ... do something useful with "entry" here...
            }
          }
        name = "Tester"
        console.log("Name: "+ name + "JSON"+outputContexts[i].parameters.user)
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

        /*
            -> Level muss angepasst werden
            -> ID anpassen
            -> wenn funktioniert auf framework und skill übertragen ACHTUNG!!!!!!!
        */ 

        if (params.programmiersprache != undefined){
            var typ = "programmiersprache"
            var info = database.database("SELECT mpe_id FROM MTA_PROG_ERFA_ZUO WHERE mpe_id =(SELECT max(mpe_id) FROM MTA_PROG_ERFA_ZUO)")
            console.log("Die ID aus der Datenbankabfrage:" + JSON.stringify(info))
            var s = info[1]["MPE_ID"] 
            var id = Number(s) + 1
            console.log("Die Info als String: "+s +" Der Eintrag " + Number(s)+" Die neue ID " + Number(id))
            params = tools.preconditions(params,typ)
            query = "Insert into mta_prog_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=[id,params.mpe_prog_id,params.mpe_erfa_id,name,date,name,date,'2',params.mpe_mta_id,"Anfang"]

        }else if (params.framework != undefined){
            var typ = "framework"
            var info = database.database("SELECT mfe_id FROM MTA_FRAM_ERFA_ZUO WHERE mfe_id =(SELECT max(mfe_id) FROM MTA_FRAM_ERFA_ZUO)")
            console.log("Die Info aus der Datenbankabfrage:" + JSON.stringify(info))
            var s = info[1]["MFE_ID"] 
            var id = Number(s) + 1
            console.log("Die Info als String: "+s +" Der Eintrag " + Number(s)+" Die neue ID " + Number(id))
            params = tools.preconditions(params,typ)
            query = "Insert into mta_fram_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=[id,params.mfe_fram_id,params.mfe_erfa_id,name,date,name,date,'2',params.mfe_mta_id,"Anfang"]

        }else if(params.skill != undefined){
            var typ = "skill"
            var info = database.database("SELECT mse_id FROM MTA_SKIL_ERFA_ZUO WHERE mse_id =(SELECT max(mse_id) FROM MTA_SKIL_ERFA_ZUO)")
            console.log("Die Info aus der Datenbankabfrage:" + JSON.stringify(info))
            var s = info[1]["MSE_ID"] 
            var id = Number(s) + 1
            console.log("Die Info als String: "+s +" Der Eintrag " + Number(s)+" Die neue ID " + Number(id))
            params = tools.preconditions(params,typ)
            query = "Insert into mta_skil_erfa_zuo values (:0, :1, :2, :3, :4, :5, :6, :7, :8, :9)"
            values=[id,params.mse_skil_id,params.mse_erfa_id,name,date,name,date,'2',params.mse_mta_id,"Anfang"]
        }
        console.log("Der Query vor dem Datenbankeintrag:" + query +"und die Values " + values)
        console.log("value 0 einzelnes Experiment" + values[0])
        database.insert(query,values)
    },
    update: function (req, intent,session){
        console.log("In Update")
        date = date.format(new Date(),'DD.MM.YYYY')
        var query
        var input
        var params

        var name = session + "/contexts/update"
        var context = tools.contextButtler(req,name)
        var auswahl = context.parameters.auswahl
        params = context.parameters.result[auswahl]

        // Input aus der Anfrage ziehen und in EIntrag schreiben
        if (intent == "update_auswaehlen_kommentar_start"){
            input = req.body.queryResult.queryText
            params.kommentar += "\n Eintrag vom " + date  +": \n "+ input
        }
        if (intent == "update_auswaehlen_level_start"){
            input = context.parameters.erfahrung
            params.level = input
        }
 
        
        // ACHTUNG! Datum muss noch angepasst werden

        /*
            -> Level muss angepasst werden
            -> ID anpassen
            -> wenn funktioniert auf framework und skill übertragen ACHTUNG!!!!!!!
        */ 

    if (params.programmiersprache != undefined){
        var typ = "programmiersprache"
        params = tools.preconditions(params,typ)
        console.log("params nach Preconditions in update "+ JSON.stringify(params))
        query = "UPDATE mta_prog_erfa_zuo SET mpe_erfa_id = :1, mpe_kommentar = :2 where MPE_ID = :3"
        values=[params.mpe_erfa_id,params.kommentar, params.MPE_ID]
        // Noch nicht fertig!!!!!!!!!
    }else if (params.framework != undefined){
        var typ = "framework"
        params = tools.preconditions(params,typ)
        query = "UPDATE mta_fram_erfa_zuo SET mfe_erfa_id = :1, mfe_kommentar = :2 where MFE_ID = :3"
        values=[params.mfe_erfa_id,params.kommentar, params.MFE_ID]
    }else if(params.skill != undefined){
        var typ = "skill"
        params = tools.preconditions(params,typ)
        query = "UPDATE mta_skil_erfa_zuo SET mse_erfa_id = :1, mse_kommentar = :2 where MSE_ID = :3"
        values=[params.mse_erfa_id,params.kommentar, params.MSE_ID]
    }
    console.log("Der Query vor dem Datenbankeintrag:" + query +"und die Values " + values)
    console.log("Params.mpe_id: " + params.MPE_ID)
    console.log("value 0 einzelnes Experiment" + values[0])
    database.insert(query,values)
       
    }
    


}