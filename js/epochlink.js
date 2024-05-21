//EpochLink.js - v1.0.1 | Made by daichimarukana | License: NYSL
function epochlink_json(adds) {
    var request = new XMLHttpRequest();
    if(!(adds.includes('https://') || adds.includes('HTTPS://') || adds.includes('http://') || adds.includes('HTTP://'))){
        adds = "https://"+adds;
    }
    try {
        request.open('GET', adds, false);
        request.send();

        if (request.status >= 200 && request.status < 400) {
            var time_data = request.responseText;
            var json = JSON.parse(time_data);
            return json;
        } else {
            console.error("Failed to load data. Status: " + request.status);
            return null;
        }
    } catch (error) {
        console.error("Request error: " + error.message);
        return null;
    }
}

function epochlink_unixtime(adds) {
    var startGetDt = Date.now();
    var json = epochlink_json(adds);
    var endGetDt = Date.now();

    if (json) {
        if(json["protocol"] == "EpochLink"){
            var roundTripTime = (endGetDt - startGetDt) / 2 / 1000;
            if(json["unix_time"] < 0){
                console.warn("Time is negative.\nEpochLink server may be using 32bit.");
            }
            return Math.round(json["unix_time"] + roundTripTime);
        }else{
            console.error("Failed to check protocol.\nProtocol must be EpochLink.");
            return null;
        }
    } else {
        return null;
    }
}

function epochlink_unixtime_ms(adds) {
    var startGetDt = Date.now();
    var json = epochlink_json(adds);
    var endGetDt = Date.now();

    if (json) {
        if(json["protocol"] == "EpochLink"){
            var roundTripTime = (endGetDt - startGetDt) / 2;
            if(json["unix_time"] < 0){
                console.warn("Time is negative.\nEpochLink server may be using 32bit.");
            }
            return Math.round(json["unix_time_ms"] + roundTripTime);
        }else{
            console.error("Failed to check protocol.\nProtocol must be EpochLink.");
            return null;
        }
    } else {
        return null;
    }
}