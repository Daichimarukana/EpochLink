//EpochLink.js | Made by daichimarukana | License: NYSL
function epochlink_json(adds) {
    var request = new XMLHttpRequest();
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
        var roundTripTime = (endGetDt - startGetDt) / 2 / 1000;
        return json["unix_time"] + roundTripTime;
    } else {
        return null;
    }
}

function epochlink_unixtime_ms(adds) {
    var startGetDt = Date.now();
    var json = epochlink_json(adds);
    var endGetDt = Date.now();

    if (json) {
        var roundTripTime = (endGetDt - startGetDt) / 2;
        return json["unix_time_ms"] + roundTripTime;
    } else {
        return null;
    }
}