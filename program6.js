concat = require('concat-stream')

process.stdin.pipe(concat(function (body) {
    if (null == body)
        body = ""
    process.stdout.write(body.toString().split('').reverse().join(''))
}));

