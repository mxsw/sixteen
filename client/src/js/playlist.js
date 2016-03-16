var querystring = require('querystring');

module.exports = function() {
    var str = window.location.search.substring(1, window.location.search.length);
    qs = querystring.parse(str);
    var uri = qs.uri;

    document.addEventListener('DOMContentLoaded', () => {
        var iframe = document.querySelector('iframe');
        iframe.setAttribute('src', "https://embed.spotify.com/?uri="+uri);
    });
};
