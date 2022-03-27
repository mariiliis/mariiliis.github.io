(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let ampm = h >= 12 ? 'pm' : 'am';
            h = h % 12;
            h = h ? h : 12;
            m = m.toString().padStart(2, '0');
    
            c.innerHTML = h + ":" + m +' ' + ampm; 
            return strTime;
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");

        if (fname === "" || !isLetterOnly(fname)) {
            alert("Palun valige eesnimi");
            return;
        }

        if (lname === "" || !isLetterOnly(lname)) {
            alert("Palun valige perekonnanimi");
            return;
        }

        let linn = document.getElementById("linn");
        
        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
              
        } else {

            if(linn.value == "tln") {
                e.innerHTML = "0 &euro;";
            } else if(linn.value == "trt") {
                e.innerHTML = "2.5 &euro;";
            } else if(linn.value == "nrv") {
                e.innerHTML = "2.5 &euro;";
            } else if(linn.value == "prn") {
                e.innerHTML = "3 &euro;";
            }
            
        }      
        
        var choice = Array.from(document.getElementsByName("choice")).filter(r => r.checked);
        console.log(choice);

        if(choice.length == 0) {
            alert("Palun tehke reklaamkirja valik");
            return;
        }

        console.log("Tarne hind on arvutatud");
    }
    
})();

function isLetterOnly(text) {
    var lettersRegex = /^[A-Za-z]+$/;
    if(text.value.match(lettersRegex)) {
        return true;
    } else {
        return false;
    }
}

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

        let centerPoint2 = new Microsoft.Maps.Location(
            58.25, 
            22.48333
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

        let pushpin2 = new Microsoft.Maps.Pushpin(centerPoint2, {
            title: 'Kuressaare kindlus',
        });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    var infobox = new Microsoft.Maps.Infobox(centerPoint2, {
        title: 'Kuressaare kindlus',
    
    });

    var infobox = new Microsoft.Maps.Infobox(centerPoint, {
        title: 'Tartu Ülikool',
    
    });
    //Assign the infobox to a map instance.
    infobox.setMap(map);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

