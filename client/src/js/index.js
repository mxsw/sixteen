var spotify = require('./api/spotify');
var request = require('request');
var config = require('./config');
var lodash = require('lodash');
var algo = require('./closest');
var querystring = require('querystring');

var songs = function(urls) {
    promises = urls.map(function(url) {
        return spotify.trackList(url);
    });
    return Promise.all(promises);
};

var trackURLs = function(playlists) {
    return playlists.map(function(p) {
        return p.tracks.href;
    });
};

var tracks = function(songs) {
    var tracks = [];
    songs.forEach(function(obj) {
        [].push.apply(tracks, obj.items.map(s => s.track));
    });

    return tracks.map(t => {
        return { id: t.id, name: t.name, duration: t.duration_ms/1000 };
    })
};

var doAlgorithm = (tracks, minutes) => {
    var shuffled = lodash.shuffle(tracks).slice(0, 400);
    var obj = algo.closestSum(shuffled.map(s => Math.floor(s.duration)), minutes*60);

    if (!obj.possible) {
        return {matches: null, delta: null, possible: obj.possible};
    }

    var idxs = obj.list;

    if (idxs != null) {
        var matches = idxs.map(function(idx) {
            return shuffled[idx];
        });
        return {matches: matches, delta: obj.delta, possible: obj.possible};
    }
};

var start = () => {
    spotify.playlists()
        .then(trackURLs)
        .then(songs)
        .then(tracks)
        .then(tracks => doAlgorithm(tracks, 2))
        .then(function(obj) {
            if (!obj.possible) {
                return Promise.reject("Not possible with margin and delta");
            }
            obj.matches.forEach(m => console.log(m.name, m.duration))
            return obj.matches;
        })
        .then(function(matches) {
            return matches.map(m => m.id);
        })
        .then(function(track_ids) {
            console.log(track_ids);
            return spotify.createPlaylist(track_ids);
        })
        .catch((err) => {
            console.error(err);
        });
    };


module.exports = function() {
    var qs = querystring.parse(window.location.search.substr(1, window.location.search.length));
    var code = qs.code;
    console.log(code);

    spotify.accessToken(code)
        .then(function() {
            return spotify.refreshToken();
        })
        .then(start)
        .catch(function(err) {
            console.error(err);
        });
};
