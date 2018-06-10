'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
//var path = require('path');

var files = {};
var arr = [];
var cont = null;
files.house = [];
files.maps = [];
files.char = [];
files.clue = [];

var walk = require('walk');
var walker = walk.walk('www/img', {
    followLinks: false
});
var walkSaved = walk.walk('docs', {
    followLinks: false
});

findSavedFiles();
assetsArray();

/*
 *Function to create an array with the asset urls
 */
function assetsArray() {
    walker.on('file', function (root, fileStats, next) {
        if (root.indexOf('house') > -1) {
            files.house.push(root + '/' + fileStats.name);
        }
        if (root.indexOf('char') > -1) {
            files.char.push(root + '/' + fileStats.name);
        }
        if (root.indexOf('clue') > -1) {
            files.clue.push(root + '/' + fileStats.name);
        }
        next();
    });
}

function findSavedFiles() {
    walkSaved.on('file', function (root, fileStats, next) {
        var num = fileStats.name.replace(/\D+/g, "");
        files.maps.push(fileStats.name);
        if (num.length !== 0) {

            arr.push(parseInt(num, 10));
        }
        cont = Math.max.apply(Math, arr);
        next();
    });

}


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.text());
app.use(express.static(__dirname + '/www'));

/*
 *Server Init
 */
app.listen(3800, function () {
    console.log('Example app listening at port 3800');
});

/*
 *POST to save the json.
 */
app.post('/save', function (req, res) {
    var body = req.body;
    var data = JSON.parse(body);
    var title = data.title;
    if (!title || title === '') {
        cont++;
        title = 'Untitled_' + cont;
    }
    var mapString = JSON.stringify(data.rawMap, null, 2);

    fs.writeFile('docs/' + title + '.json', mapString, function (err) {
        if (err) throw err;
    });
    res.send('Got a POST request');
    findSavedFiles();
});

app.get('/assets', function (req, res) {
    res.send(JSON.stringify(files));
    console.log(files);
    console.log('Se subieron desde aca');

});
app.get('/loadMaps', function (req, res) {
    res.send(JSON.stringify(files));
});
app.post('/renderMap', function (req, res) {
    var body = req.body;
    console.log(body);
    var data = JSON.parse(body);
    var option = data.optionValue;
    fs.readFile('docs/' + option + '.json', function (err, data) {
        if (err) {
            throw err;
        }
        res.send(data);
        //console.log(data);
    });
});