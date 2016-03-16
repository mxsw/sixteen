var request = require('request');
var config = require('../../config.js');

var playlists = function(success) {
    request({
        url: "https://api.spotify.com/v1/me/playlists",
        method: "GET",
        headers: {
            Authorization: "Bearer " + config.spotify.accessToken
        },
        qs: {
            limit: 50,
            offset: 0,
        }
    }, function(err, _, body) {
        if (err != null) {
            console.error(err);
            return;
        }
        success(JSON.parse(body).items);
    });
};

var getTrackList = function(url) {
    return new Promise(function(res, rej) {
        request({
            url: url,
            method: "GET",
            headers: {
                Authorization: "Bearer " + config.spotify.accessToken
            },
        }, function(err, _, body) {
            if (err != null) {
                console.log(err);
                rej(err);
            }
            res(JSON.parse(body));
        });
    });
};

module.exports = {
    playlists: playlists,
    getTrackList: getTrackList,
};
