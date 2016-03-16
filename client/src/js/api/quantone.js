var request = require('request');

var recommend = function(trackID) {
        var headers = new Headers();
        headers.append("DecibelAppID", "4c300c7b");
        headers.append("DecibelAppKey", "9b88cce860af1dcbbedd909d6114bb1a");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Request-Method", "POST");
        headers.append("Access-Control-Request-Headers", "X-Custom-Header");
        headers.append("Content-Type", "text/plain");

        var init = {
            headers: headers,
            method: "GET",
            mode: "cors",
            cache: "default",
        };

        return fetch("https://recommend.quantonemusic.com/playlist?recordingId=spotify%3Atrack%3A0N3W5peJUQtI4eyR6GJT5O&recordingIdType=spotify", init);
};

module.exports = {
    recommend: recommend,
};
