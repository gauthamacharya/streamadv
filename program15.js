var crypto = require('crypto');
var tar = require('tar');
var zlib = require('zlib');
var through = require('through');

var cstream = crypto.createDecipher(process.argv[2], process.argv[3]);
var tar = require('tar');
var parser = tar.Parse();
parser.on('entry', function (e) {

    var fname = e.path;
    var block = e.block;
    var hash;

    var md5sum = crypto.createHash('md5');
    if(e.type =='File'){
        e.on('data', function (d) {
            md5sum.update(d);
        });
        e.on('end', function (d) {
            hash = md5sum.digest('hex');
            console.log(hash + " " + fname);
        });
    }
});

process.stdin.pipe(cstream).pipe(zlib.createGunzip()).pipe(parser);

//process.stdin.pipe(cstream).pipe(process.stdout);