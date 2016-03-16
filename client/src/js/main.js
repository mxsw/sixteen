var spotify = require('./api/spotify');
var config = require('./config');
var lodash = require('lodash');
var algo = require('./closest');

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
    return tracks;
};

var doAlgorithm = (tracks, minutes) => {
    var shuffled = lodash.shuffle(tracks).slice(0, 400);
    var obj = algo.closestSum(shuffled.map(s => Math.floor(s.duration_ms/1000)), minutes*60);

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

var main = () => {
    spotify.playlists()
        .then(trackURLs)
        .then(songs)
        .then(tracks)
        .then(tracks => doAlgorithm(tracks, 2))
        .then(function(obj) {
            if (!obj.possible) {
                return Promise.reject("Not possible with margin and delta");
            }
            obj.matches.forEach(m => console.log(m.name, m.duration_ms/1000))
            return obj.matches;
        })
        .catch((err) => {
            console.error(err);
        });
    };

spotify.refreshToken(main);
