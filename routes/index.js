var express = require('express');
var http = require('https');
var _ = require('underscore-node');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index', { title: 'Book App' });
});

router.get('/find/:ids', function(req, res){
    var arrayOfIds = req.params.ids.split(',');

    for(var i = 0; i < arrayOfIds.length; i++) {
        if(arrayOfIds[i].length < 10) {
            arrayOfIds[i] = 'LCCN:' + arrayOfIds[i] + ','
        } else {
            arrayOfIds[i] = 'ISBN:' + arrayOfIds[i] + ','
        }
    }

    var newRequest = '';

    for(i = 0; i < arrayOfIds.length; i++){
        newRequest += arrayOfIds[i]
    }

    var options = {
        host: 'openlibrary.org',
        path: '/api/books?bibkeys=' + newRequest + '&format=json&jscmd=data'
    };

    var callback = function(response) {
        var str = '';

        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function () {
            var jsonData = JSON.parse(str);

            res.json(_.values(jsonData).map(function(book) {
                return _.pick(book, 'title', 'subtitle', 'url', 'number_of_pages');
            }));
        });

    };
    http.get(options, callback).end();
});


module.exports = router;


