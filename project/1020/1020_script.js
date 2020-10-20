let jsondata = window.mastercode;
let table, tr, td, new_objects, btn, txt;


//테이블 생성함수 호출
createTableBody(jsondata);

//이름검색 버튼
btn = document.getElementById('btn1');
btn.addEventListener("click", function(){
    txt = prompt('이름을 정확히 입력하세요')
    createTableBody(searchData(txt));
})

//랭크 ~이상 버튼
btn = document.getElementById('btn2');
btn.addEventListener("click", function(){
    txt = prompt('몇 이상의 랭크를 검색하시겠습니까?')
    createTableBody(searchData_Rank(txt));
})

//검색 초기화
btn = document.getElementById('btn3');
btn.addEventListener("click", function(){
    createTableBody(jsondata);
})

//테이블 객체를 받아와 자식으로 셀들을 추가한다.
function createTableBody(objects) {
    table = document.getElementById("div1");
    //테이블 객체 초기화
    while(table.firstChild){
        table.removeChild(table.firstChild)
    }
    for (let object of objects) {  
        tr = document.createElement("div");
        tr.className = `flex_row`;
        for (const [key,value] of Object.entries(object)){
            td = document.createElement("div");
            td.textContent = value;
            td.className = `flex_item item_${key}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

//string타입의 company값을 받아와 동일한 값의 데이터를 찾고 배열로 리턴
function searchData(text){
    let ar = jsondata.filter(function(element, index, obj){
       
        return element.company == text;
   });
   return ar;

    // return jsondata.filter(element => element.company == text);
}

//랭크가 파라미터 이상인 데이터 검색
function searchData_Rank(number){//string타입
    return jsondata.filter(element => element.rank >= parseInt(number));
}

// 
