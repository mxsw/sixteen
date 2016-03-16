var api = require('./api/spotify/playlist');
var config = require('./config');

var trackURLs = function() {
    var p = new Promise(function(resolve, reject) {
        api.playlists(function(playlists) {
            var hrefs = playlists.map(function(p) {
                return p.tracks.href;
            });

            resolve(hrefs);
        });
    });
    
    return p;
};

var songIDs = function(urls) {
    console.log(urls)
    promises = urls.map(function(url) {
        return api.getTrackList(url);
    });

    return Promise.all(promises);
};

trackURLs()
    .then(songIDs)
    .then(function(arr) {
        var songs = [];
        arr.forEach(function(o) {
            o.items.forEach(function(s) {
                songs.push(s);
            })
        });

        console.log(songs[0])

        var ids = songs.map(function(s) {
            return s.track.id;
        });

        console.log(ids);
    });

