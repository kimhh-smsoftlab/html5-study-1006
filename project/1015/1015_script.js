// json 파일 불러오기

var requestURL = "/project/1015/test.json";
var request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function() {
  let data = request.response;
  createTable(data);
};

function createTable(jsonObj) {
  var data = jsonObj.data;
  var tbody = document.getElementById("table1");

  for (x of data) {
    tbody.innerHTML += `<tr>
    <td>${x.time}</td>
    <td>${x.price}</td>
    <td>${x.buy_price}</td>
    </tr>`;
  }
}
