const unirest = require('unirest');
const request = require('request');
const config = require('../config');
const lodash = require('lodash');

const headers = config.headers;

var genre = function(name, propertyUID, offset, limit, success) {
    var q = {
        access_token: config.accessToken,
        name: name,
        property_uid: propertyUID,
        offset: offset,
        limit: limit,
    };

    request({
        url: "https://api.musimap.net/search/v1/genres",
        method: "GET",
        headers: headers,
        qs: q
    }, function(err, _, body) {
        if (err) {
            console.error(err);
            return;
        }
        success(body);
    });
};

// https://developers.musimap.net/documentation/search-v1-tracks
var tracks = function(params, success) {
    lodash.merge(params, {
        access_token: config.accessToken
    });

    request({
        url: "https://api.musimap.net/search/v1/tracks",
        method: "GET",
        headers: headers,
        qs: params,
    }, function(err, _, body) {
        if (err) {
            console.error(err);
            return;
        }
        success(body);
    })
};

module.exports = {
    genre: genre,
    tracks: tracks,
};
