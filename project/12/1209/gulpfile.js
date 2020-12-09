// const { series } = require("gulp");
// const { parallel } = require("gulp");

// function hello() {
//     console.log("Hello");
// }

// function world() {
//     console.log("World!");
// }

// function javascript(cb) {
//     cb();
// }

// function css(cb) {
//     cb();
// }

// function jsMinify(cb) {
//     cb();
// }

// function cssMinify(cb) {
//     cb();
// }

// // exports.build = series(
// //     hello,
// //     parallel(world, series(javascript, css)),
// //     parallel(jsMinify, cssMinify)
// // );
// const clean = function (cb) {
//     cb();
// };

// const css1 = series(clean, function (cb) {
//     cb();
// });

// const javascript1 = series(clean, function (cb) {
//     cb();
// });

// exports.build = parallel(css1, javascript1);

function hello() {
    console.log("hello");
}

exports.default = hello;
