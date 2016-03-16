var index = require('./index.js');
var login = require('./login.js');
var playlist = require('./playlist');

// act as a router
if (window.location.pathname == "/login") {
    login();
} else if (window.location.pathname == "/playlist") {
    playlist();
} else {
    index();
}
