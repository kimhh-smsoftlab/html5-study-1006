"use strict";
let data = window.mastercode;
let table, btn, titles, tr, td, target, item;

//버튼 초기화
ini();
//테이블 초기화
createTable();

//테이블을 만들기위해 Head,Body 함수 호출
function createTable() {
  table = document.getElementById("table");
  createTableHead(table);
  createTableBody(table);
}

//부모 객체를 받아 tablehead를 만들고 자식으로 추가
function createTableHead(table) {
  titles = Object.keys(data[0]);
  tr = document.createElement("div");
  tr.className = "table_header";
  for (let title of titles) {
    td = document.createElement("div");
    td.textContent = title;
    td.className = `flex_item item_${title}`;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

//테이블 body 생성
function createTableBody(table) {
  let row_data, key;
  for(row_data of data) {
    tr = document.createElement("div");
    for(key in row_data) {
      td = document.createElement("div");
      td.textContent = row_data[key];
      td.className = `flex_item item_${key}`;
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

//모든 항목 보이기
function viewAll() {
  table = document.getElementById("table");
  table.style.display = "block"; 
  target = document.getElementsByClassName("item_name");
  for (item of target) { //모든 item0 class 요소들의 display를 block으로 한다.
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_code");
  target
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_symbol");
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_csname");
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_mktgbcd");
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_upcode");
  for (item of target) {
    item.style.display = "block";
  }
}

//code항목 보이기
function viewCode() {
  table = document.getElementById("table");
  table.style.display = "block"; 
  target = document.getElementsByClassName("item_name");
  for (item of target) { 
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_code");
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_symbol");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_csname");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_mktgbcd");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_upcode");
  for (item of target) {
    item.style.display = "none";
  }
}

//csname 항목 보이기
function viewCsname() {
  table = document.getElementById("table");
  table.style.display = "block"; 
  target = document.getElementsByClassName("item_name");
  for (item of target) { 
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_code");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_symbol");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_csname");
  for (item of target) {
    item.style.display = "block";
  }
  target = document.getElementsByClassName("item_mktgbcd");
  for (item of target) {
    item.style.display = "none";
  }
  target = document.getElementsByClassName("item_upcode");
  for (item of target) {
    item.style.display = "none";
  }
}

//모든 항목 숨기기
function allClear() {
  table = document.getElementById("table");
  table.style.display = "none";
}

//버튼 element 설정
function ini() {
  btn = document.getElementById("btn1");
  btn.textContent = "모든 항목보기";
  btn.onclick = viewAll;

  btn = document.getElementById("btn2");
  btn.textContent = "코드 항목보기";
  btn.onclick = viewCode;

  btn = document.getElementById("btn3");
  btn.textContent = "초성 항목보기";
  btn.onclick = viewCsname;

  btn = document.getElementById("btn4");
  btn.textContent = "모든 항목지우기";
  btn.onclick = allClear;
}
