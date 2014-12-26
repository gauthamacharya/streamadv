    var cp = require('child_process');
    var duplex = require('duplexer');

    module.exports = function (cmd, args) {
        var ps = cp.spawn(cmd, args);
        return duplex(ps.stdin, ps.stdout);
    };
