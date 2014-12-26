var combine = require('stream-combiner');
var through = require('through');
var split = require('split')
var zlib = require('zlib');

module.exports = function () {

    var current;
    return combine(split(), through(function (row) {
        if (row.length == 0) return;
        var jrow = JSON.parse(row);
        if (jrow.type == 'genre') {
            if (current) {
                this.queue(JSON.stringify(current) + '\n');
            }
            current = { name: jrow.name, books: [] };

        } else if (jrow.type == 'book') {
            current.books.push(jrow.name);
        }
        //increment gcount if we find a new genre

    }, function () {
        //stream ending so if we have any current genre open send it out
        //write the last genre with the end of stream
        if (current) {
            this.queue(JSON.stringify(current) + '\n');
        }
        this.queue(null);
    }), zlib.createGzip());

}