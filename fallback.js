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
          back["fulfillmentText"] = "Ich habe deinen Namen leider nicht Verstanden. Sage bitte *Vorname und Nachname* hintereinander wie z.B. _Raphael Palombo_ (Aus dem Webhook)"
          back["outputContexts"]= [  
            {  
            "name":session + "/contexts/defaultwelcome",
            "lifespanCount":1
          }
        ]
      }

        //option
       else if (array.includes(session + "/contexts/option")){
            back["fulfillmentText"] = "Bitte sage mir, wie ich dir Helfen kann. Am einfachsten sagst du hierfür die Schlüsselwörter für die verschiedenen Pfade: :simple_smile: :point_right: *Update*, *Auskunft* oder *Eintrag*  ?(Aus dem Webhook)"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/option",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
          ]
        }
        // Kategorie (Programmiersprache, Skills, Framework) für alle Gesprächspfade
        else if (array.includes(session + "/contexts/kategorie")){
            console.log("in Kategorie")
            back["fulfillmentText"] = "Bitte sage mir, wie ich dir helfen kann. Am einfachsten sagst du hierfür die Schlüsselwörter für die Kategorien, also: :point_right: *Programmiersprache*, *Framework* oder *Skills* ? (Aus dem Webhook)"
            
            if(array.includes(session + "/contexts/info")){
              road = "/contexts/info"
            }
            

            else if(array.includes(session + "/contexts/update")){
              road = "/contexts/update"
            }
            

           else if(array.includes(session + "/contexts/insert")){
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
              },
              {  
                "name":session + "/contexts/name",
                "lifespanCount":5
              }

          ]
        }

       

        // Fallback für die FU's
        else if (array.includes(session + "/contexts/programmiersprache_fu" || session + "/contexts/framework_fu" || session + "/contexts/skills_fu" && session + "/contexts/auswahl")) {
            back["fulfillmentText"] = "Leider habe ich deine Eingabe nicht verstanden. :interrobang: Wenn du Fragen zu einer Person oder einem Datum hast, stelle mir deine Frage mit einem Fragewort und einer Operation. z.B: :point_right: *'Wer hat den Eintrag bearbeitet?'* . Ansonsten nenne mir einfach Schlüsselwörter *Skill-Beschreibung, *Level* und *Kommentar*. Versuche es bitte erneut ...   (Aus dem Webhook)" 
            
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
              },
              {  
                "name":session + "/contexts/name",
                "lifespanCount":5
              }
            ] 
  
          console.log("Back output = " + back["outputContexts"])
        }

         // Bei der Suche nach einem Eintrag
       else if (array.includes((session + "/contexts/programmiersprache" || session + "/contexts/framework"|| session + "/contexts/skills")&& session + "/contexts/info")){
        back["fulfillmentText"] = "Leider habe ich dich nicht richtig verstanden. :exclamation::exclamation: Ich benötige für die Suche einen Hinweis, wonach ich suchen soll. Du könntest mir z.B. folgende Frage stellen: *Was weißt du zu Robin Schulz* oder *Wer kann Java*. Mit dem Befehl *abbrechen* kommst du zurück :back: zu dem Hauptmenü. Bitte versuche es jetzt erneut...  (Webhook)"
        
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
          ,
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
        ]
      }
      // Auswahlfunktion für Infoeinträge info_auswaehlen
        else if (array.includes(session + "/contexts/12oder3" && session + "/contexts/info")){
            back["fulfillmentText"] = "Damit ich dir Antworten zu einer Person geben kann, musst du einen Eintrag auswählen. Sage mir bitte die Nummer deines Eintrags. Z.B.::point_right: *Gebe mir 1*. Wennn du überhaupt keinen Eintrag auswählen möchtest sage einfach *Nein* :no_entry_sign:. Bitte versuche es nocheinmal ... (Webhook)"
            back["outputContexts"]= [  
              {  
              "name":session + "/contexts/12oder3",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/info",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
            
          ]
        }  

             // speichern
             else if (array.includes(session + "/contexts/eintrag")) {
              back["fulfillmentText"] = "Leider habe ich deine Antwort nicht verstanden. Möchtest du, dass ich deinen Eintrag speichere. Sage bitte dafür *Ja* oder *Nein*.  :point_up:  :exclamation:(Aus dem Webhook)" 
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
                  "lifespanCount":5
                }
              ] 
    
          }

          
          // info_new_yes
          else if (array.includes(session + "/contexts/new_info")) {
            back["fulfillmentText"] = "Leider habe ich deine Antwort nicht verstanden. Möchtest du nach einem weiteren Eintrag suchen? Sage bitte dafür *Ja* oder *Nein* .:point_up: :exclamation: (Aus dem Webhook)" 
            back["outputContexts"] = [
              {  
                "name":session + "/contexts/new_info",
                "lifespanCount":1
              }
              ,
              {  
                "name":session + "/contexts/info",
                "lifespanCount":1
              },
              {  
                "name":session + "/contexts/name",
                "lifespanCount":5
              }
            ] 
  
        }

        // email_yes_fu
        else if (array.includes(session + "/contexts/email"&& session + "/contexts/fu")) {
          back["fulfillmentText"] = " Ich habe deine E-mail Adresse nicht bekommen. Bitte sage mir deine E-mail Adresse erneut. :email: :exclamation:(Aus dem Webhook)" 
          back["outputContexts"] = [
            {  
              "name":session + "/contexts/email",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/fu",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
          ] 

      }

      // email_yes
      else if (array.includes(session + "/contexts/email") && (array.includes(session + "/contexts/fu") != true)) {
        back["fulfillmentText"] = " Möchtest du eine E-mail :email: mit deinen ausgewählten Einträgen. Sage bitte dafür *Ja* oder *Nein* :exclamation:    (Aus dem Webhook)" 
        back["outputContexts"] = [
          {  
            "name":session + "/contexts/email",
            "lifespanCount":1
          },
          {  
            "name":session + "/contexts/name",
            "lifespanCount":5
          }
        ] 
       }

       // **** Die Fallbacks für Update ***

         // Bei der Suche nach einem Eintrag
         else if (array.includes((session + "/contexts/programmiersprache" || session + "/contexts/framework"|| session + "/contexts/skills") && session + "/contexts/update")){
          back["fulfillmentText"] = "Ich benötige einen Hinweis wonach ich den Eintrag für die Bearbeitung suchen soll. Du könntest mir z.B. folgende Hinweise geben: *Einträge mit Robin Schulz* oder *Suche Einträge mit Java* :exclamation:. Wenn du den Vorgang abbrechen möchtest sage *abbrechen* dann kommst du zurück zum Hauptmenü. Du kannst mich jetzt nocheinmal fragen ... (Webhook)"
          
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
            }, {  
              "name":session + "/contexts/update",
              "lifespanCount":3
            },
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
          ]
        }
       
        // Auswahlfunktion für Infoeinträge update_auswaehlen
        else if (array.includes(session + "/contexts/12oder3"&& session + "/contexts/update")){
          back["fulfillmentText"] = "Damit du einen Eintrag bearbeiten kannst, musst du erstinmal einen auswählen. Sage dafür mir bitte die Nummer deines Eintrags. Z.B. *1* oder *eintrag 2*. Mit *abbrechen* kommst du zurück zum hauptmenü. Bitte versuche es nocheinmal ... (Webhook)"
          back["outputContexts"]= [  
            {  
            "name":session + "/contexts/12oder3",
            "lifespanCount":1
          },
          {  
            "name":session + "/contexts/update",
            "lifespanCount":1
          },
          {  
            "name":session + "/contexts/name",
            "lifespanCount":5
          }
          
        ]
      }

     // update_auswaehlen_level
     else if (array.includes(session + "/contexts/level" && session + "/contexts/update" )) {
      back["fulfillmentText"] = "Du musst mir das neue Level sagen. Z.B. könntest du sagen: *Setze Raphael Palombo auf Level 2*. Level 1 ist das niedrigste, Level 3 die höchste Stufe.    (Aus dem Webhook)" 
      back["outputContexts"] = [
        {  
          "name":session + "/contexts/level",
          "lifespanCount":1
        },
        {  
          "name":session + "/contexts/update",
          "lifespanCount":1
        }
        ,
        {  
          "name":session + "/contexts/name",
          "lifespanCount":5
        }
      ] 

  }

  
      // update_auswaehlen_kommentar_start
      else if (array.includes(session + "/contexts/update" && session + "/contexts/auswahl")) {
        back["fulfillmentText"] = "Ich habe deinen Auswahl leider nicht erhalten. Möchtest du eine *Level Änderung* oder einen *Kommentar* machen ?" 
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
          }
          ,
           {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
        ] 

    }
  

      // update_auswaehlen_kommentar_start
      else if (array.includes(session + "/contexts/kommentar" && session + "/contexts/update" && session + "/contexts/update_auswaehlen_kommentar_followup")) {
        back["fulfillmentText"] = "Ich habe deinen Kommentar leider nicht erhalten. Bitte mache ihn erneut. Denke daran, ein Kommentar startet immer mit dem '/' Zeichen. und bitte erwähne nicht das Wort *Kommentar* in all seinen Ausführungen, das verwirrt mich :dizzy:" 
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
            "name":session + "/contexts/name",
            "lifespanCount":5
          }
        ] 

        }

   

        // *** Hier für Eintragen
    
       // Bei eintragen_ (framework,skills,programmiersprache)
       else if (array.includes((session + "/contexts/programmiersprache" || session + "/contexts/framework"|| session + "/contexts/skills")&& session + "/contexts/insert")){
        back["fulfillmentText"] = "Für den Eintrag benötige ich von dir *Vor und Nachname* der Person, das *Level* auf dem sich der Mitarbeiter befindet und die Technologie bzw. *Fähigkeit* die du vermerken möchtest. Du könntest mir folgenden Auftrag geben: *Trage Robin Schulz auf Level 1 in Java ein* . Level zwischen 1 und 3 (höchste Level) können eingetragen werden. Mit dem Befehl *abbrechen* kommst du zum Hauptmenü. Du kannst mich jetzt nocheinmal fragen ... (Webhook)"
        
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
          }, {  
            "name":session + "/contexts/insert",
            "lifespanCount":3
          },{  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
        ]
      }
      


      // *** Standardfallback ***

        else  {
          back["fulfillmentText"] = "jetzt habe ich leider toatal den Faden verloren :collision: :disappointed: Bitte sage mir wieder neu, was du machen möchtest. Wolltest du ein *Update*,eine *Auskunft* oder einen *Eintrag* machen? " 
          back["outputContexts"] = [
            {  
              "name":session + "/contexts/option",
              "lifespanCount":1
            },
            {  
              "name":session + "/contexts/name",
              "lifespanCount":5
            }
          ] 

      }

      
        console.log("Die Fallbackmessage :" + back["fulfillmentText"])
        console.log("Fallback zurückgegeben")
        return back
    }

    

    

}