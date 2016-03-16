var request = require('request');
var config = require('../config.js');

var playlists = function(success) {
    return new Promise(function(res, rej) {
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
                rej(err);
            }
            res(JSON.parse(body).items);
        });
    });
};

var trackList = function(url) {
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

var refreshToken = function() {
    request({
        url: "https://accounts.spotify.com/api/token",
        method: "POST",
        form: {
            refresh_token: config.spotify.refreshToken,
            grant_type: "refresh_token",
            client_id: config.spotify.clientID,
            client_secret: config.spotify.clientSecret
        },
    }, function(err, _, body) {
        if (err != null) {
            console.error(err);
            return;
        }
        var b = JSON.parse(body);
        config.spotify.accessToken = b['access_token'];
    });
};

module.exports = {
    refreshToken: refreshToken,
    playlists: playlists,
    trackList: trackList,
};
