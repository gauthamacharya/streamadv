    var duplex = require('duplexer');
    var through = require('through');
    module.exports = function (counter) {
        var counts = {};
        return duplex(through(function (obj) {
            var cc = counts[obj.country] || 0;
            counts[obj.country] = cc + 1;
        }, function (val) {
            counter.setCounts(counts);
        }),counter);
    };
