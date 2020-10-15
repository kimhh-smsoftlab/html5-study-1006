"use strict";
//json 파일 불러오기//
let requestURL = "/project/1015/test.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

// request.onload = function() {
//   let data = request.response;
// };
