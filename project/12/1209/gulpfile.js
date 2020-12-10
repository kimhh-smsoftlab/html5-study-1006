const gulp = require("gulp");

function hello(done) {
    done();
    console.log("hello");
}

function world(done) {
    done();
    console.log("world!!");
}
exports.default = gulp.series(hello, world);
