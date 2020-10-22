let jsondata = window.mastercode;
let filter_data = filterData(jsondata);
let table, tr, td, new_objects, btn;


//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);

//검색 버튼 => textbox에서 value를 가져온다. 
//value값을 searchData함수로 넘겨준다.
btn = document.getElementById('btn1');
btn.addEventListener("click", function(){
    let txt, result;
    txt = document.getElementById('txt');
    result = searchData(txt.value, getCheck()); //검색어를 search 한다
    createTableBody(result); // search 결과를 통해 테이블 재생성
})


 //검색 초기화
btn = document.getElementById('btn3');
btn.addEventListener("click", function(){
    createTableBody(filter_data);
})

function createTableHead(objects) {
    table = document.getElementById('div1_head')
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

function searchData(inputtext, checklist){ 
    inputtext = inputtext.toLowerCase(); //대소문자 구분을 없애기 위해 소문자로 변환
    let arr,success,value,
    arItem = checklist.item;
    arr = filter_data.filter(function(obj){
        success = arItem.find(function(checkbox){
            value = obj[checkbox.id].toLowerCase();
            return (checklist.searchType === 0) ? value.includes(inputtext) : value == inputtext;
        });
        return success !== undefined;
    });
    return arr;
}

//arr.map(callback(currentValue[, index[, array]])[, thisArg])
//JSON.stringify(value[, replacer[, space]])
//
function filterData(jsondata){
    let check_pq,
    ardata = jsondata.map(function(obj){
        filter_obj = JSON.stringify(obj, function(key, value){
            check_pq = (key.includes("pq_") ? undefined : (typeof value === 'number' ? value.toString() : value));//;
            return check_pq;
        });
        return JSON.parse(filter_obj);
        //JSON.parse(filter_obj, function(key, value){
            //typeof value === 'number' ? value.toString() : value ;
        //});
    });
    return ardata;
}

function getCheck(){
    let objChecklist = {searchType : 0, item : []},
    objects = document.getElementById('search_type');
    objects.children[0].checked ? objChecklist.searchType = 0 : objChecklist.searchType = 1;

    objects = document.getElementById('items');
    for(let child of objects.children){
        child.checked ? objChecklist.item.push({id: child.value}) : "";
    }    
    return objChecklist ;
}

//callback함수를 각각의 요소에 대해 한번씩 순서대로 불러 그 함수의 반환값으로 새로운 배열을 만든다. 
//원본 데이터를 복사하여 화면에 보이지 않을 프로퍼티를 제거한 후 배열을 리턴한다. 
// function filterData(jsondata){
//     let copydata, filterdata;
//     copydata = JSON.parse(JSON.stringify(jsondata)); //데이터복사
//     filterdata = copydata.map(function(object){ // copydata의 요소들이 function에 정의된 내용을 수행 후
//         delete object.pq_index; // 반환하는 객체들이 새로운 배열에 담기게 된다.
//         delete object.pq_order;
//         object.rank = object.rank.toString();
//         object.revenues = object.revenues.toString();
//         object.profits = object.profits.toString();
//         return object;
//     })
//     return filterdata;
// }


//arr.filter(callback(element[, index[, array]])[, thisArg])
// callback 함수를 호출하고 true값을 반환하는 값만 포함된 새로운 배열을 생성한다.
//string타입의 txt value 값을 받아와 object의 value값에 포함된 데이터를 찾고 배열로 리턴
// function searchData(text, checklist){ 
//     debugger;
//     text = text.toLowerCase(); //대소문자 구분을 없애기 위해 소문자로 변환
//     let arr,success,
//     arItem = checklist.item;
//     arr = filter_data.filter(function(obj){
//         success = arItem.filter(function(checkbox){
//             let value = obj[checkbox.id],
//             find = (checklist.searchType === 0 )? value.includes(text) : value == text;
//             return find;  
//         })
//         return success.length > 0;
//     });
//     return arr;
// }



