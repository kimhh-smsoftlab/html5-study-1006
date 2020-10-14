"use strict";
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();
let hour = today.getHours();
let min = today.getMinutes();
let now = month + "." + date + " " + hour + ":" + min;

create_header();
create_random_body();
interval();

var car = {
  name: "Volvo",
  age: 50,
  color: "white"
};

//테이블 헤더 생성
function create_header() {
  document.getElementById("table_header").innerHTML =
    '<div class="js_table_tr flex_row">' +
    "<div>체결시간</div>" +
    "<div>체결가격(KRW)</div>" +
    "<div>체결금액(KRW)</div>" +
    "</div>";
}
//100개의 랜덤 데이터 생성
function create_random_body() {
  for (var i = 0; i < 100; i++) {
    document.getElementById("table_body").innerHTML +=
      '<div class="js_table_tr flex_row">' +
      "<div>" +
      now +
      "</div>" +
      "<div>" +
      getRndInteger(12000000, 13000000) +
      "</div>" +
      "<div>" +
      getRndInteger(20000, 40000000) +
      "</div>" +
      "</div>";
  }
}

//랜덤 숫자 생성
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//1초마다 새로운 데이터 생성

function interval() {
  // setInterval(create_random_data, 1000);
  setInterval(function() {
    create_random_data();
  }, 1000);
}

function create_random_data() {
  document.getElementById("table_body").innerHTML +=
    '<div class="js_table_tr flex_row">' +
    "<div>" +
    now +
    "</div>" +
    "<div>" +
    getRndInteger(12000000, 13000000) +
    "</div>" +
    "<div>" +
    getRndInteger(20000, 40000000) +
    "</div>" +
    "</div>";
}

//매수 매도 구분하기
//let buysell = ["buy", "sell"];
//let pick = buysell[Math.floor(Math.random()*2)
//var x = document.getElementsByClassName("js_table_tr");
//for (var i = 0; i < x.length; i++) {
// x[i].className = "js_table_tr flex_row";
//}
