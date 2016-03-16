var request = require('request');

var recommend = function(trackID) {
    return new Promise(function(res, rej) {
        request({
            url: "https://recommend.quantonemusic.com/playlist",
            method: "GET",
            headers: {
                DecibelAppID: "4c300c7b",
                DecibelAppKey: "9b88cce860af1dcbbedd909d6114bb1a",
            },
            qs: {
                recordingId: "spotify:track:"+trackID,
                recordingIdType: "spotify",
            },
        }, function(err, _, body) {
            if (err != null) {
                rej(err);
            }
            res(body);
        })
    });
};

module.exports = {
    recommend: recommend,
};
