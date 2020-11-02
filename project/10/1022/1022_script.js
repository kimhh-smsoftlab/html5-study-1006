let jsondata = window.mastercode,
table, tr, td, new_objects, btn;
const ParseTrue = true,
ParseFalse = false;

//parseFalse -> text로 리턴 ParseTrue -> object로 리턴
let _strText = filterData(jsondata,'pq_',false), // filterData(원본데이터, 필터텍스트, Parse여부 -> false시 text전달)
filter_data = filterData(jsondata,'pq_',true);

//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);

//검색 버튼 
btn = document.getElementById('btn1');
btn.addEventListener("click", function(){
    let txt, result;
    txt = document.getElementById('txt');
    result = searchData(txt.value, getCheck()); //검색어를 search 한다
    createTableBody(result); // search 결과를 통해 테이블 재생성
})

 //검색 초기화 => + input text 초기화
btn = document.getElementById('btn3');
btn.addEventListener("click", function(){
    createTableBody(filter_data);
})

//테이블 해드 생성
function createTableHead(objects) {
    table = document.getElementById('table_head')
    tr = document.createElement("div");
    tr.className = "table_header flex_row";
    for (let title in objects[0]) {
        td = document.createElement("div");
        td.textContent = title;
        td.className = `flex_item item_${title}`;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

//테이블 바디 생성
function createTableBody(objects) {
    table = document.getElementById("table_body");
    while(table.firstChild){ //자식 노드 제거
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

//arr.filter(callback(element[, index[, array]])[, thisArg])
//JSON데이터에서 검색어 탐색
function searchData(input, checklist){ 
    input = input.toLowerCase(); //소문자 변환
    let arr,success,value,
    arItem = checklist.item;
    arr = filter_data.filter(function(obj){ // filter_data 전역변수
        success = arItem.find(function(checkbox){
            value = obj[checkbox.id].toLowerCase(); //checkbox에 체크된 항목의 json데이터 value에 할당
            return (checklist.searchType === 0) ? value.includes(input) : value == input; 
        });
        return success !== undefined; //success에 하나의 값이라도 있다면 return 
    });
    return arr; //최종 검색된 obj배열
}

//JSON.stringify(value[, replacer[, space]])
function filterData(jsondata, text, doParse){
    let srttext = JSON.stringify(jsondata, function(key, value){
        return (key.includes(text) ? undefined : (typeof value === 'number' ? value.toString() : value));
    },3);
    return doParse ? JSON.parse(srttext) : srttext
}

//화면의 checkbox에서 체크된 항목의 value를 받아온다. 
function getCheck(){
    let objChecklist = {searchType : 0, item : []},
    objects = document.getElementById('search_type');
    //objects.children[0].checked ? objChecklist.searchType = 0 : objChecklist.searchType = 1; 아래와 같이 변경
    objChecklist.searchType = objects.children[0].checked ? 0 : 1;
    //children[0] 이외의 값이 올 경우 예외 처리
    objects = document.getElementById('items');
    for(let child of objects.children){
        child.checked && objChecklist.item.push({id: child.value});
        //child.checked ? objChecklist.item.push({id: child.value}) : ""; 아래와 같이 변경
    }    
    return objChecklist ;
}

/*
- filterData() 수정 전
function filterData(jsondata){
    let copydata, filterdata;
    copydata = JSON.parse(JSON.stringify(jsondata)); //데이터복사
    filterdata = copydata.map(function(object){ // copydata의 요소들이 function에 정의된 내용을 수행 후
        delete object.pq_index; // 반환하는 객체들이 새로운 배열에 담기게 된다.
        delete object.pq_order;
        object.rank = object.rank.toString();
        object.revenues = object.revenues.toString();
        object.profits = object.profits.toString();
        return object;
    })
    return filterdata;
}

- searchData() 수정 전
function searchData(text, checklist){ 
    text = text.toLowerCase();
    let arr,success,
    arItem = checklist.item;
    arr = filter_data.filter(function(obj){
        success = arItem.filter(function(checkbox){
            let value = obj[checkbox.id],
            find = (checklist.searchType === 0 )? value.includes(text) : value == text;
            return find;  
        })
        return success.length > 0;
    });
    return arr;
}

// 수정 전 
// function filterData(jsondata){
//     let check_pq,
//     ardata = jsondata.map(function(obj){
//         filter_obj = JSON.stringify(obj, function(key, value){
//             check_pq = (key.includes("pq_") ? undefined : (typeof value === 'number' ? value.toString() : value));//;
//             return check_pq;
//         });
//         return JSON.parse(filter_obj);
//         //JSON.parse(filter_obj, function(key, value){ //reciver 매개변수를 이용하여 toString() 진행
//             //typeof value === 'number' ? value.toString() : value ;
//         //});
//     });
//     return ardata;
// }

*/ 


