var request = require('request');
var config = require('../config.js');

var playlists = function() {
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

var userID = function() {
    return new Promise(function(res, rej) {
        request({
            url: "https://api.spotify.com/v1/me",
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
            res(JSON.parse(body).id);
        });
    });
};

var initPlaylist = function(userID) {
    return new Promise(function(res, rej) {
        request({
            url: "https://api.spotify.com/v1/users/"+userID+"/playlists",
            method: "POST",
            headers: {
                Authorization: "Bearer " + config.spotify.accessToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Pomodoro playlist" + Math.floor(Math.random()*10),
                public: true,
            })
        }, function(err, _, body) {
            if (err != null) {
                console.error(err);
                rej(err);
            }
            res(JSON.parse(body).id);
        });
    });
};

var addToPlaylist = function(userID, playlist_id, track_ids) {
	var trackStr = track_ids.map(s => "spotify:track:"+s).join(',');
    return new Promise(function(res, rej) {
        request({
            url: "https://api.spotify.com/v1/users/"+userID+"/playlists/"+playlist_id+"/tracks",
            method: "POST",
            headers: {
                Authorization: "Bearer " + config.spotify.accessToken
            },
            qs: {
            	uris:trackStr
            }
        }, function(err, _, body) {
            if (err != null) {
                console.error(err);
                rej(err);
            }
            res();
        });
    });
};

var createPlaylist = function(track_ids) {
    var userid = null;

    userID()
        .then(function(uid) {
            userid = uid;
            return initPlaylist(uid);
        })
        .then(function(pid) {
            return addToPlaylist(userid, pid, track_ids);
        })
        .catch(function(err) {
            console.error(err);
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

var accessToken = function(code) {
    return new Promise(function(res, rej) {
        request({
            url: "https://accounts.spotify.com/api/token",
            method: "POST",
            form: {
                grant_type: "authorization_code",
                code: code,
                redirect_uri: "http://localhost:8080",
                client_id: config.spotify.clientID,
                client_secret: config.spotify.clientSecret
            },
        }, function(err, _, body) {
            if (err != null) {
                console.error(err);
                rej(err)
            }
            b = JSON.parse(body);
            config.spotify.accessToken = b.access_token;
            config.spotify.refreshToken = b.refresh_token;
            res();
        });
    });
};

var refreshToken = function() {
    return new Promise(function(res, rej) {
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
                rej(err);
            }
            var b = JSON.parse(body);
            config.spotify.accessToken = b['access_token'];
            res();
        });
    });
};

module.exports = {
    refreshToken: refreshToken,
    playlists: playlists,
    trackList: trackList,
    accessToken: accessToken,
    addToPlaylist: addToPlaylist,
    createPlaylist: createPlaylist,
    initPlaylist: initPlaylist,
};
