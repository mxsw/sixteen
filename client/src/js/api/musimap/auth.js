const unirest = require('unirest');
const request = require('request');
const config  = require('../config');

const keys = config.keys;
const uastring = config.uastring;
const headers = config.headers;

var credentials = {
    grant_type:  "client_credentials",
    client_id: keys.clientID,
    client_secret: keys.clientSecret
};

var authorize = function(successFn) {
    unirest.post(apikeys.baseurl + "/oauth/v1/access_token")
        .headers(headers) // to not get banned
        .send(credentials)
        .end(successFn);
};

module.exports = {
    authorize: authorize
};
