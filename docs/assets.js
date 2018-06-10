/*var houseArray = [];
//exports.houseArray = houseArray;
var dir = "img/house/";
houseArray.push(dir + 'cabinet.png', dir + 'table.png', dir + 'wall.png', dir + 'green.png', dir + 'pink.png', dir + 'violeta.png', dir + 'lightblue.png', dir + 'fuccia.png', dir + 'black.png', dir + 'gray.png', dir + 'orange.png', dir + 'bed.png');
*/
var walk = require('walk');
var fs = require('fs');
var path = require('path');
var files = {};
files.house = [];

var walker = walk.walk('www/img', {
    followLinks: false
});
function assetJson () {
walker.on('file', function(root, fileStats, next) {
    if(!(root.indexOf('New folder') > -1)){
        if(root.indexOf('house') > -1) {
        files.house.push(root + '/'+fileStats.name);
        }
    }
    next();
});
/*walker.on('end', function () {
    fs.writeFile('./www/js/assets.json', JSON.stringify(files,null,2), function (err) {
    if (err) throw err;
    console.log('It\'s saved! Stringify: '+JSON.stringify(files));
    //console.log('Stringify: '+JSON.stringify(files));
    });
    //console.log(files);
});*/
}

exports.assetJson = assetJson;
exports.sendArray = function () {
    return files;
};
