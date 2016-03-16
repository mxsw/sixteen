var request = require('request');

module.exports = function() {
    // Listen for click events and simply set URL instead
    // of making a GET request.
    document.addEventListener('DOMContentLoaded', function() {
        var spotifyButton = document.querySelector('#spotify-login');
        if (!spotifyButton) return;

        spotifyButton.addEventListener('click', function(e) {
            window.location = "https://accounts.spotify.com/authorize/?client_id=8ae7f61cce1a449b913fbe16f2898a10&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20playlist-modify-private%20streaming%20";

            e.preventDefault();
            return false;
        });
    });
};
