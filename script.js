"use strict";
let today = new Date();
let month = today.getMonth() + 1;
let date = today.getDate();
let hour = today.getHours();
let min = today.getMinutes();
let now = month + "." + date + " " + hour + ":" + min;

{
  document.getElementById("table_header").innerHTML =
    '<div class="js_table_tr flex_row">' +
    "<div>체결시간</div>" +
    "<div>체결가격(KRW)</div>" +
    "<div>체결금액(KRW)</div>" +
    "</div>";
}

{
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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

{
  setInterval(function() {
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

      var objDiv = document.getElementById("table_body");
      objDiv.scrollTop = objDiv.scrollHeight;
  }, 1000);
}



var x = document.getElementsByClassName("js_table_tr");
for (var i = 0; i < x.length; i++) {
  x[i].className = "js_table_tr flex_row";
}
