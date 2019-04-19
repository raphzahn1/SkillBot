var builder = require('./builder')
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
        
    } 
    


}