var through = require('through');
var http = require('http');
var server = http.createServer(function (req, res) {
        if (req.method === 'POST') {
            req.pipe(through(function (buf) {
                this.queue(buf.toString().toUpperCase());
            })).pipe(res);
        }
        else res.end('send me a POST\n');
});

server.listen(+process.argv[2]);



