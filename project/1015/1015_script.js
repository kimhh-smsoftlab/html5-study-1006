// json 파일 불러오기

var requestURL = "/project/1015/test.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
//request.send();

request.onload = function() {
  let data = request.response;
};
