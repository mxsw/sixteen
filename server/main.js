var spotify = require('./api/spotify');
var config = require('./config');

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

spotify.refreshToken();
spotify.playlists()
    .then(trackURLs)
    .then(songs)
    .then(tracks)
    .then((tracks) => {
        console.log(tracks);
    })
    .catch((err) => {
        console.error(err);
    });
