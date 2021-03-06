module.exports = {
     fallback : function(req,session){
         console.log("In fallback")
        var road
        var array = []
        var back = {}
        var outputContexts = req.body.queryResult.outputContexts
        for ( var i=0; i < outputContexts.length; i++ ) {
              var name = outputContexts[i].name ; // "entry" is now the entry you were looking for
              // ... do something useful with "entry" here...
              array.push(name)
          }
        console.log("Das fertige Array:"+array)
        // Fallbacks für:

        //welcome
        if (array.includes(session + "/contexts/defaultwelcome")){
          back["fulfillmentText"] = "Ich habe deinen Namen leider nicht Verstanden. Sage bitte *Vorname und Nachname* hintereinander wie _Raphael Palombo_ (Aus dem Webhook)"
          back["outputContexts"]= [  
            {  
            "name":session + "/contexts/defaultwelcome",
            "lifespanCount":1
          }
        ]
      }

        //option
       else if (array.includes(session + "/contexts/option")){
            back["fulfillmentText"] = "Bitte sage konkret, was du machen möchtest. Am einfachsten sagst du einfach die Schlüsselwörter Update, Auskunft oder Eintrag ;) (Aus dem Webhook)"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/option",
              "lifespanCount":1
            }
          ]
        }
        // Kategorie (Programmiersprache, Skills, Framework) für alle Gesprächspfade
        else if (array.includes(session + "/contexts/kategorie")){
            console.log("in Kategorie")
            back["fulfillmentText"] = "Bitte sage konkret, welche Kategorie du möchtest. Am einfachsten sagst du einfach die Schlüsselwörter Programmiersprache, Framework oder Skills ;) (Aus dem Webhook)"
            
            if(array.includes(session + "/contexts/info")){
              road = "/contexts/info"
            }
            

            else if(array.includes(session + "/contexts/update")){
              road = "/contexts/update"
            }
            

            if(array.includes(session + "/contexts/insert")){
              road = "/contexts/insert"
            }
            

            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/" + "kategorie",
              "lifespanCount":1
            }
            ,{  
                "name":session + road,
                "lifespanCount":1
              }

          ]
        }

       

        // Fallback für die FU's
        else if (array.includes(session + "/contexts/programmiersprache_fu" || session + "/contexts/framework_fu" || session + "/contexts/skills_fu") && array.includes(session + "/contexts/auswahl")) {
            back["fulfillmentText"] = "Wenn du Fragen zu einer Person oder einem Datum hast, stelle mir deine Frage mit einem Fragewort und einer Operation. z.B: 'Wer hat den Eintrag bearbeitet', ansonsten nenne mir einfach Schlüsselwörter, wie Level und Kommentar. Versuche es bitte erneut ...   (Aus dem Webhook)" 
            
            if(array.includes(session + "/contexts/programmiersprache_fu")){
              road = "/contexts/programmiersprache_fu"
            }
            else if(array.includes(session + "/contexts/framework_fu")){
              road = "/contexts/framework_fu"}
  
            else if(array.includes(session + "/contexts/skills_fu")){
              road = "/contexts/skills_fu"
            }
              
  
            back["outputContexts"] = [
              {  
                "name":session + road,
                "lifespanCount":1
              },
              {  
                "name":session + "/contexts/auswahl",
                "lifespanCount":1
              },
              {  
                "name":session + "/contexts/info",
                "lifespanCount":1
              }
            ] 
  
          console.log("Back output = " + back["outputContexts"])
        }

         // Bei der Suche nach einem Eintrag
       else if (array.includes(session + "/contexts/programmiersprache" || session + "/contexts/framework"|| session + "/contexts/skills")&& array.includes(session + "/contexts/info")){
        back["fulfillmentText"] = "Ich benötige einen Hinweis wonach ich suchen soll. Du könntest mir z.B. folgende Frage stellen: 'Was weißt du zu Robin Schulz' oder 'Wer kann Java'. Du kannst mich jetzt nocheinmal fragen ... (Webhook)"
        
        if(array.includes(session + "/contexts/programmiersprache")){
          road = "/contexts/programmiersprache"
        }
        else if(array.includes(session + "/contexts/framework")){
          road = "/contexts/framework"
        }
        else if(array.includes(session + "/contexts/skills")){
          road = "/contexts/skills"
        }
          

        back["outputContexts"] =[ {  
            "name":session + road,
            "lifespanCount":1
          }
        ]
      }
      // Auswahlfunktion für Infoeinträge info_auswaehlen
        else if (array.includes(session + "/contexts/12oder3" && session + "/contexts/info")){
            back["fulfillmentText"] = "Damit ich dir Antworten zu einer Person geben kann, musst du einen Eintrag auswählen. Sage dafür mir bitte die Nummer deines Eintrags. Z.B. 'Gebe mir 1'. Wennn du überhaupt keinen Eintrag auswählen möchtest sage einfach 'Nein'. Bitte versuche es nocheinmal ... (Webhook)"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/12oder3",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/info",
              "lifespanCount":1
            }
            
          ]
        }

        // für eintragen (programmiersprache, framework, skills)
        else if (array.includes(session + "/contexts/programmiersprache" || session + "/contexts/framework" || session + "/contexts/skills") && array.includes(session + "/contexts/insert")){
          back["fulfillmentText"] = "Damit ich den Eintrag machen kann, musst du folgendes angeben: Vorname, Name, Programmiersprache und das Level. Du könntest z.B. sagen 'Trage Java für Robin Schulz auf level 1 ein ' Bitte versuche es nocheinmal ... (Webhook)"
          
          if(array.includes(session + "/contexts/programmiersprache")){
            road = "/contexts/programmiersprache"
          }
          else if(array.includes(session + "/contexts/framework")){
            road = "/contexts/framework"}

          else if(array.includes(session + "/contexts/skills")){
            road = "/contexts/skills"
          }
          back["outputContexts"]= [  
            {  
            "name":session + road,
            "lifespanCount":1
          },
          {  
            "name":session + "/contexts/insert",
            "lifespanCount":1
          }
          
        ]
      }

           

             // speichern
             else if (array.includes(session + "/contexts/eintrag")) {
              back["fulfillmentText"] = "Leider habe ich deine Antwort nicht verstanden. Möchtest du, dass ich deinen Eintrag speichere. Sage bitte dafür *Ja* oder *Nein*    (Aus dem Webhook)" 
              back["outputContexts"] = [
                {  
                  "name":session + "/contexts/eintrag",
                  "lifespanCount":1
                },
                {  
                  "name":session + "/contexts/info",
                  "lifespanCount":1
                }
                ,
                {  
                  "name":session + "/contexts/name",
                  "lifespanCount":1
                }
              ] 
    
          }

          
          // info_new_yes
          else if (array.includes(session + "/contexts/new_info")) {
            back["fulfillmentText"] = "Leider habe ich deine Antwort nicht verstanden. Möchtest du nach einem weiteren Eintrag suchen? Sage bitte dafür *Ja* oder *Nein*   (Aus dem Webhook)" 
              
  
            back["outputContexts"] = [
              {  
                "name":session + "/contexts/new_info",
                "lifespanCount":1
              }
              ,
              {  
                "name":session + "/contexts/info",
                "lifespanCount":1
              }
            ] 
  
        }

        // email_yes_fu
        else if (array.includes(session + "/contexts/email")&& array.includes(session + "/contexts/fu")) {
          back["fulfillmentText"] = "Ich habe deine E-mail Adresse nicht bekommen. Bitte sage mir deine E-mail Adresse erneut. (Aus dem Webhook)" 
          back["outputContexts"] = [
            {  
              "name":session + "/contexts/email",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/fu",
              "lifespanCount":1
            }
          ] 

      }

      // email_yes
      else if (array.includes(session + "/contexts/email") && (array.includes(session + "/contexts/fu") != true)) {
        back["fulfillmentText"] = " Möchtest du eine E-mail mit deinen ausgewählten Einträgen. Sage bitte dafür *Ja* oder *Nein*     (Aus dem Webhook)" 
        back["outputContexts"] = [
          {  
            "name":session + "/contexts/email",
            "lifespanCount":1
          }
        ] 
       }

       // **** Die Fallbacks für Update ***

       
        // Auswahlfunktion für Infoeinträge update_auswaehlen
        else if (array.includes(session + "/contexts/12oder3" && session + "/contexts/update")){
          back["fulfillmentText"] = "Damit du einen eintrag bearbeiten kannst, musst du einen Eintrag auswählen. Sage dafür mir bitte die Nummer deines Eintrags. Z.B. '1'. Bitte versuche es nocheinmal ... (Webhook)"
          back["outputContexts"]= [  
            {  
            "name":session + "/contexts/12oder3",
            "lifespanCount":1
          },
          {  
            "name":session + "/contexts/update",
            "lifespanCount":1
          }
          
        ]
      }

     // update_auswaehlen_level
     else if (array.includes(session + "/contexts/level") && array.includes(session + "/contexts/update" )) {
      back["fulfillmentText"] = "Du musst mir das neue Level sagen. Z.B. könntest du sagen: *Setze Raphael Palombo auf Level 2 sagen*. Level 1 ist niedrigste, Level 3 die höchste Stufe.    (Aus dem Webhook)" 
      back["outputContexts"] = [
        {  
          "name":session + "/contexts/level",
          "lifespanCount":1
        },
        {  
          "name":session + "/contexts/update",
          "lifespanCount":1
        }
      ] 

  }

   // update_auswaehlen_level
   else if (array.includes(session + "/contexts/kommentar" && session + "/contexts/update" && session + "/contexts/update_auswaehlen_kommentar_followup")) {
    back["fulfillmentText"] = "Ich habe deinen Kommentar leider nicht erhalten. Bitte mache ihn erneut" 
    back["outputContexts"] = [
      {  
        "name":session + "/contexts/update",
        "lifespanCount":1
      },
      {  
        "name":session + "/contexts/update_auswaehlen_kommentar_followup",
        "lifespanCount":1
      },
      {  
        "name":session + "/contexts/kommentar",
        "lifespanCount":1
      },
      {  
        "name":session + "/contexts/auswahl",
        "lifespanCount":1
      }
    ] 

}

        console.log("Die Fallbackmessage :" + back["fulfillmentText"])
        console.log("Fallback zurückgegeben")
        return back
    }

    

    

}