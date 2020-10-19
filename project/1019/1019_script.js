let jsondata = window.xx;
let table;
let head_title = ["매도잔량","가격", "매수잔량"];
let chart_5;
let chart_10;
createTable();
interval();

function createTable(){
    table = document.getElementById('table');
    createTableHead(table);
    createTableBody(table);
}

function createTableHead(table) {
  let tr = document.createElement("tr");
  tr.className = "table_header";
  for (let title of head_title) {
    let td = document.createElement("th");
    td.textContent = title;
    td.className = `flex_item item${head_title.indexOf(title)}`;
    tr.appendChild(td);
  }
  table.appendChild(tr);
}

function createTableBody(table) {
    let body = document.createElement('tbody');
    body.className = 'table_body'
    for(row_data of jsondata){
        let tr = document.createElement("tr");
        if(row_data.type == 'sell'){
            tr.className = `down `;
            for(var i=0; i<3; i++){
                let td = document.createElement("td");
                td.className = "item"+i;
                tr.appendChild(td);
            }
        }
        else{
            tr.className = `up`;
            for(var i=0; i<3; i++){
                let td = document.createElement("td");
                td.className = "item"+i;
                tr.appendChild(td);
            }
        }
        body.appendChild(tr);
    }
    table.appendChild(body);
}

function insertData(){
    var tr_group = document.getElementsByClassName('')
}
function interval() {
    setInterval(function() {
      change_data(jsondata);
    }, 2000);
  }

function change_data(data){
    for(row_data of data){
        row_data.Quantity = Math.floor(Math.random() * 10000) + 1;
    }
}

function updatd(){

}