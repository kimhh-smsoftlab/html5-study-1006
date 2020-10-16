"use strict";
var data = window.mastercode;
var table;
var head_title = ["이름", "코드", "symbol", "초성", "mktgbcd", "upcode"];
ini();

//함수 설정
function createTable() {
  table = document.getElementById("find");
  createTableHead(table);
  createTableBody(table);
}

function createTableHead(table) {
  var tr = document.createElement("div");
  tr.className = "table_header";
  for (var title of head_title) {
    var td = document.createElement("div");
    td.textContent = title;
    td.className = `flex_item item${head_title.indexOf(title)}`;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

function createTableBody(table) {
  for (var row_data of data) {
    var tr = document.createElement("div");
    var i = 0;
    for (var key in row_data) {
      var td = document.createElement("div");
      td.textContent = row_data[key];
      td.className = `flex_item item${i}`;
      tr.appendChild(td);
      i++;
    }
    table.appendChild(tr);
  }
}

function viewAll() {
  table = document.getElementById("find");
  table.style.display = "blok";
  var target0 = document.getElementsByClassName("item0");
  for (var x of target0) {
    x.style.display = "block";
  }
  var target1 = document.getElementsByClassName("item1");
  for (var x of target1) {
    x.style.display = "block";
  }
  var target2 = document.getElementsByClassName("item2");
  for (var x of target2) {
    x.style.display = "block";
  }
  var target3 = document.getElementsByClassName("item3");
  for (var x of target3) {
    x.style.display = "block";
  }
  var target4 = document.getElementsByClassName("item4");
  for (var x of target4) {
    x.style.display = "block";
  }
  var target5 = document.getElementsByClassName("item5");
  for (var x of target5) {
    x.style.display = "block";
  }
}

function viewCode() {
  table = document.getElementById("find");
  table.style.display = "blok";
  var target0 = document.getElementsByClassName("item0");
  for (var x of target0) {
    x.style.display = "block";
  }
  var target1 = document.getElementsByClassName("item1");
  for (var x of target1) {
    x.style.display = "block";
  }
  var target2 = document.getElementsByClassName("item2");
  for (var x of target2) {
    x.style.display = "none";
  }
  var target3 = document.getElementsByClassName("item3");
  for (var x of target3) {
    x.style.display = "none";
  }
  var target4 = document.getElementsByClassName("item4");
  for (var x of target4) {
    x.style.display = "none";
  }
  var target5 = document.getElementsByClassName("item5");
  for (var x of target5) {
    x.style.display = "none";
  }
}

function viewCsname() {
  table = document.getElementById("find");
  table.style.display = "blok";
  var target0 = document.getElementsByClassName("item0");
  for (var x of target0) {
    x.style.display = "none";
  }
  var target1 = document.getElementsByClassName("item1");
  for (var x of target1) {
    x.style.display = "none";
  }
  var target2 = document.getElementsByClassName("item2");
  for (var x of target2) {
    x.style.display = "none";
  }
  var target3 = document.getElementsByClassName("item3");
  for (var x of target3) {
    x.style.display = "block";
  }
  var target4 = document.getElementsByClassName("item4");
  for (var x of target4) {
    x.style.display = "none";
  }
  var target5 = document.getElementsByClassName("item5");
  for (var x of target5) {
    x.style.display = "none";
  }
}

function allClear() {
  table = document.getElementById("find");
  table.style.display = "none";
}

//버튼 element 설정
function ini() {
  var btn1 = document.getElementById("btn1");
  btn1.textContent = "모든 항목보기";
  btn1.onclick = viewAll;

  var btn2 = document.getElementById("btn2");
  btn2.textContent = "코드 항목보기";
  btn2.onclick = viewCode;

  var btn3 = document.getElementById("btn3");
  btn3.textContent = "초성 항목보기";
  btn3.onclick = viewCsname;

  var btn4 = document.getElementById("btn4");
  btn4.textContent = "모든 지우기";
  btn4.onclick = allClear;
}
