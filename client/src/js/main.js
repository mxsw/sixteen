var index = require('./index.js');
var login = require('./login.js');

// act as a router
if (window.location.pathname == "/login") {
    login();
} else {
    index();
}
