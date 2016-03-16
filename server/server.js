var connect = require('connect');
var quantone = require('./quantone');
var http = require('http');
var url = require('url');
var Router = require('router')

var router = Router();

// GET :9001/?id=0N3W5peJUQtI4eyR6GJT5O
router.get('/', function(req, res) {
    var query = url.parse(req.url, true).query;
    var id = query.id;
    quantone.recommend(id)
        .then(function(body) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify(body));
        })
        .catch(function(err) {
            res.statusCode = 500;
            res.end();
        });
});

var server = connect();
server.use(router);
var port = 9001;
server = http.createServer(server).listen(port);
console.log('-> Listening for incoming connection on: ' + port + "...");
