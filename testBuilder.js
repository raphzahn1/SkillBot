//bd = require('./builder')
tools = require('./tools')
db = require('./db')
var query = "Select * from mta_prog_erfa_zuo"
var result = db.database(query)
result = tools.converter2 (result)
console.log("Output zum Ende:"+JSON.stringify(result))
// result = tools.converter(result)
//console.log("Konvertierte Ergebnis:" + result.metaData[0].name + result.rows[0][1])
//console.log(result.rows)
//var session = 'projects/mtbot-3f8c7/agent/sessions/4db6e7d2-8412-e29b-e33c-b61d3daaccd2'
//var message = "Testmessage"
// var message = bd.builder(session,result,message)
//console.log(message)
