var fs = require("fs");
var path = require("path");
module.exports = function(dir, callback) {

    var aret = Array();
    console.log(__dirname);
    fs.readdirSync(dir).forEach(function (library) {
 
        var isLibrary = library.split(".").length > 0 && library.split(".")[1] === 'js',
 
        libName = library.split(".")[0].toLowerCase();
 
        if (isLibrary) {
 
            aret[libName] = require(path.join(dir, library));
 
        }
 
    });
 
    if(callback) process.nextTick(function() {
 
        callback(null, aret);
 
    });
 
    return  aret;
 
}