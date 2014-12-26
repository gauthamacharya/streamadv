var crypto = require('crypto');
var cstream = crypto.createDecipher('aes256', process.argv[2]);
process.stdin.pipe(cstream).pipe(process.stdout);