let jsondata = window.xx;
let table,tr, chart_5, chart_10, format_data, head_title;



format_data = formatData();
head_title = ["매도잔량", "가격", "매수잔량"];
createTable();
insertData(format_data);
interval();
new_btn();

function createTable() {
  table = document.getElementById("table");
  createTableHead(table);
  createTableBody(table);
}

function createTableHead(table) {
  tr = document.createElement("tr");
  tr.className = "table_header";
  for (let title of head_title) {
    td = document.createElement("th");
    td.textContent = title;
    td.className = `flex_item item${head_title.indexOf(title)}`;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

function createTableBody(table) {
  body = document.getElementById("tbody");

  for (let i = 0; i < 20; i++) {
    tr = document.createElement("tr");
    if (i < 10) {
      if (i < 5) {
        tr.className = `down top5`;
      } else {
        tr.className = `down`;
      }
      for (j = 0; j < 3; j++) {
        td = document.createElement("td");
        td.className = "item" + j;
        tr.appendChild(td);
      }
    } else {
      if (i < 15) {
        tr.className = `up`;
      } else {
        tr.className = `up top5`;
      }
      for (let j = 0; j < 3; j++) {
        let td = document.createElement("td");
        td.className = "item" + j;
        tr.appendChild(td);
      }
    }
    body.appendChild(tr);
  }
  table.appendChild(body);
}

function insertData(data) {
  let tr_group_down = document.getElementsByClassName("down");
  let tr_group_up = document.getElementsByClassName("up");
  for (let i = 0; i < tr_group_down.length; i++) {
    for (let j = 0; j < tr_group_down[i].childNodes.length; j++) {
      tr_group_down[i].childNodes[j].textContent = data[i][j];
    }
  }
  for (let i = 0; i < tr_group_up.length; i++) {
    for (let j = 0; j < tr_group_up[9 - i].childNodes.length; j++) {
      tr_group_up[9 - i].childNodes[j].textContent = data[19 - i][j];
    }
  }
}

function formatData() {
  let arr = [];
  for (row_data of jsondata) {
    if (row_data.type == "sell") {
      arr.push([row_data.quantity, row_data.price, ""]);
    } else {
      arr.push(["", row_data.price, row_data.quantity]);
    }
  }
  return arr;
}

function interval() {
  setInterval(function() {
    changeData();
    new_data = formatData();
    insertData(new_data);
  }, 2000);
}

function changeData() {
  for (row_data of jsondata) {
    row_data.quantity = Math.floor(Math.random() * 10000) + 1;
  }
}

function new_btn() {
  chart_5 = document.getElementById("chart_5");

  chart_5.addEventListener("click", function() {
    changeView(chart_5);
  });
  // chart_10 = document.getElementById('chart_10');
  // chart_10.addEventListener("click", function(){
  //     changeView(chart_10)
  // });
}

function changeView(v) {
  let x = document.getElementsByClassName("top5");
  if (v.textContent == "5호가") {
    for (y of x) {
      console.log(y);
      y.style.display = "none";
      v.textContent = "10호가";
    }
  } else {
    for (y of x) {
      y.style.display = "table-row";
    }
    v.textContent = "5호가";
  }
}
