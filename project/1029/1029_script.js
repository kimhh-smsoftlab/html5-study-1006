// 변경사항 
// sortData 값이 있을 경우 없을 경우, 값이 string으로 들어왔을 때 문자열과 숫자를 구분하여 toLowerCase() 실행
// sortData에서 같은 값을 비교할 때 return 0
// 현재 정렬기준을 th 옆에 표시하도록 기능 추가, 오름, 내림, 초기화 순서
// Summary에 현재 보여지고 있는 데이터들의 합계를 계산하여 표시
// 테이블 열 구분 

let jsondata = window.mastercode, 
//parseFalse -> text로 리턴 ParseTrue -> object로 리턴
filter_data = filterData(jsondata,'pq_',true),
result_data, // 화면에 보여지는 데이터
opt = {sortType : 0, id : ""};
/* opt sortType 변수 */
const UP = 0,
    DOWN = 1,
    RESET = 2;


//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);

/* w3 displayObject */
let myObject = {"firstName" : "John", "lastName" : "Doe"};
w3.displayObject("id02", myObject);

//체크박스, 버튼, text 등 Element 이벤트 리스너 등록
document.addEventListener('click',function(e){
    let target = e.target;
    if(target.className === 'checkbox'){
        clickCheckbox(target);
    }
    else if(target.classList.contains('table_title')){
        clickSort(target);
    }
    else{
        let text_input;
        switch(target.id){ 
            case 'search_btn': //검색버튼
                clickSearchBtn();
                break;
            case 'clear_btn': //초가화버튼
                clickClearbtn();
                break;
            case 'savedata_btn': //데이터파일 다운로드
                clickSavedatabtn(); 
                break;
            case 'savehtml_btn': //html문서 다운로드
                clickSavehtmlbtn();
                break;
            case 'byte_btn': //byte변환 버튼
                clickBytebtn();
                break;
            case 'show_btn': //show 테이블
                w3.show("div.toggleshow",'block');
                break;
            case 'hide_btn': //hide 테이블
                w3.hide("div.toggleshow");
                break;
            case 'toggleshow_btn': // toggle 테이블 
                w3.toggleShow("div.toggleshow");
                break;
            case 'toggleclass_btn': // toggle 클래스
                w3.toggleClass("#table_div","back_col_white round_border margin_20");
                break;
            case 'addclass_btn': // 클래스 추가
                text_input = w3.getElement("#class_input");
                w3.addClass("#table_div",text_input.value);
                break;
            case 'removeclass_btn': // 클래스 제거
                text_input = w3.getElement("#class_input");
                w3.removeClass("#table_div",text_input.value);
                break;
            case 'clearsort_btn': // 클래스 제거
                sortElement(filter_data);
                w3.hide('i')
                opt.sortType = UP; 
                break;
            case 'sum_btn': // 클래스 제거
                clickSum();
                break;
                
        }
    }
});

//w3 filterHTML 예제 
let table_text = w3.getElement("#table_text");
table_text.addEventListener('keyup', function(){
    w3.filterHTML('#id01', '.item', this.value)
});



function clickSearchBtn(){
    txt = w3.getElement('#txt');
    if (txt.value == ""){
        alert("검색어를 입력하세요");
    } else {
        result_data = searchData(txt.value, getCheck()); //검색어를 search 한다
        let arNodes = w3.getElements('div.body_rank');
        setDisplay(arNodes, result_data);
        txt.value = '';
    }
}

//초기화버튼 리스너 등록 => + input text 초기화
function clickClearbtn(){
    w3.showElements(w3.getElements('div.body_item'),'flex');
    w3.getElement('#txt').value = '';
}


//byte변환 함수
function formatBytes(bytes){
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if(bytes == 0) return '0 Byte';
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / 1024 ** i).toFixed(0) + ' ' + sizes[i];
}


// JSON데이터 파일 다운로드
function clickSavedatabtn(){
    // Blob(Binary Large Object) 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용
    let json_filename = w3.getElement("#json_filename"),
    _strText = filterData(jsondata,'pq_',false), // filterData(원본데이터, 필터텍스트, Parse여부 -> false시 text전달)
    blob = new Blob([_strText], { type: "text/plain;charset=utf-8"});
    saveAs(blob, (json_filename.value || json_filename.placeholder) + ".json");
}

// HTML문서 다운로드
function clickSavehtmlbtn(){
    let html_filename = w3.getElement("#html_filename"),
    xmls = new XMLSerializer(),
    str = xmls.serializeToString(document),
    blob = new Blob([str], {type: "text/plain;charset=utf-8"});
    saveAs(blob, (html_filename.value || html_filename.placeholder) + ".html"); 
}

// 체크박스 클릭 이벤트 
function clickCheckbox(element){
    let archeckbox = w3.getElements("input.checkbox"),
    chk_cnt = 0;
    archeckbox.forEach(function(checkbox){
        checkbox.checked && chk_cnt++;
    });
    if(chk_cnt == 0){
        alert("하나 이상 체크하세요")
        element.checked = true;
    }
}

// byte단위 변환 이벤트
function clickBytebtn(){
    let size_view = w3.getElement('#size_view'),
    text = w3.getElement('#byte_txt').value;
    if(text === ""){
        size_view.textContent = "0 Byte";
    } else {
        let result = formatBytes(parseInt(text));
        size_view.textContent = result;
    }
}

//테이블 해드 생성
/* <i class='fas fa-chevron-down'></i> */

function createTableHead(objects) {
    let title, tr, td, table = w3.getElement('#table_head')//document.getElementById('table_head');
    tr = document.createElement("div");
    tr.className = "table_header flex_row";
    for (title in objects[0]) {
        td = document.createElement("div");
        td.textContent = title;
        td.className = `item_${title} table_title`;
        tr.appendChild(td);
        /* 화살표 만드는 기능 */
        let i = document.createElement("i");
        i.className = `fas fa-chevron-down`;
        td.appendChild(i);
        i = document.createElement("i");
        i.className = `fas fa-chevron-up`;
        td.appendChild(i);
        /* class 이름을 매개 변수로 create icon 나중에 함수로 변경 */
    }
    table.appendChild(tr);
}

//테이블 바디 생성
function createTableBody(objects) {
    let tr, td, object, table = w3.getElement("#table_body");
    /* sort데이터를 보여주기위해 사용*/
    while(table.firstChild){ //자식 노드 제거
        table.removeChild(table.firstChild)
    }
    /*  */
    for (object of objects) {  
        tr = document.createElement("div");
        tr.className = `flex_row body_item`;
        for (const [key,value] of Object.entries(object)){
            td = document.createElement("div");
            td.textContent = value;
            td.className = `body_${key} item_${key}`;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

//arr.filter(callback(element[, index[, array]])[, thisArg])
//filter_data에서 검색어 탐색


function searchData(input, checklist){ 
    let arr,success,value,
    arItem = checklist.item;
    input = input.toLowerCase(); //소문자 변환
    arr = filter_data.filter(function(obj){ // filter_data 전역변수
        success = arItem.find(function(checkbox){
            value = obj[checkbox.id]; //checkbox에 체크된 항목의 json데이터 value에 할당
            value = (typeof value === 'string') ? value.toLowerCase() : value +"";
            return (checklist.searchType === 0) ? value.includes(input) : value == input; 
        });
        return success !== undefined; //success에 하나의 값이라도 있다면 return 
    });
    return arr; //최종 검색된 obj배열
}

/**
    * JSON.stringify(value[, replacer[, space]])
    * 원본데이터에서 일부 데이터를 잘라내고 가져온다.
    * @param {object} jsondata 
    * @param {string} text 
    * @param {boolean} doParse 
  */
function filterData(jsondata, text, doParse){
    let srttext = JSON.stringify(jsondata, function(key, value){
        return (key.includes(text) ? undefined : value); //(typeof value === 'number' ? value.toString() : value));
    },3);
    return doParse ? JSON.parse(srttext) : srttext
}

//화면의 checkbox에서 체크된 항목의 value를 받아온다. 
/**
    * JSON.stringify(value[, replacer[, space]])
  */
function getCheck(){
    let objChecklist = {searchType : 0, item : []},
    objects = w3.getElement('#search_type');
    objChecklist.searchType = objects.checked ? 0 : 1;
    //children[0] 이외의 값이 올 경우 예외 처리
    arCheckbox = w3.getElements('input.checkbox');
    arCheckbox.forEach(function(obj){
        obj.checked && objChecklist.item.push({id: obj.value});
    });
    return objChecklist ;
}

//테이블의 tr요소와 searchData의 result를 비교하여 tr의 display를 설장한다.
function setDisplay(arElement, arObj){
    Array.from(arElement).forEach(function(Element){
        let node = Element.parentNode,
        findObj = arObj.find(function(object){
            return Element.textContent == object.rank;
        });
        (findObj !== undefined) ? w3.showElement(node,'flex') : w3.hideElement(node)
    });
}


/**
 * 클릭된 th의 text값을 opt.id에 저장하고 정렬함수, Element위치변환, icon변경 함수를 호출한다.
 * @param {Object} e 클릭된 th
 */
function clickSort(e){
    opt.id = e.textContent;
    let sortdata = sortData(filter_data,opt);
    sortElement(sortdata);
    changeSortIcon(e);
}

/**
 * 클릭된 th의 아이콘 display를 조절한다.
 * @param {Object} e 클릭된 th
 */
function changeSortIcon(e){
    w3.hide('i')
    if(opt.sortType === UP){
        w3.showElement(e.lastElementChild,'inline');
        opt.sortType = DOWN;
    }
    else if(opt.sortType === DOWN){
        w3.showElement(e.firstElementChild,'inline');
        opt.sortType = RESET;
    }else{
    opt.sortType = UP;    
    }
    
}

/* 수정 전 함수 
function sortData(data, opt){ // opb {id : "rank, company ...", sortType : 1,0}  // 0-> 내림 1-> 오름
    if(opt.sortType === RESET){
        return data
    }
    let copydata = data.slice();
    return copydata.sort(function(a,b){
        let par_a = parseInt(a[opt.id]),
            par_b = parseInt(b[opt.id]),
            aa = isNaN(par_a) ? a[opt.id].toLowerCase() : par_a,
            bb = isNaN(par_b) ? b[opt.id].toLowerCase() : par_b;
        // let aa = (typeof a[opt.id] === 'string') ? a[opt.id].toLowerCase() : a[opt.id],
        //     bb = (typeof b[opt.id] === 'string') ? b[opt.id].toLowerCase() : b[opt.id];
        if(aa < bb){
            return (opt.sortType == UP) ? -1 : 1
        }  
        else if(aa > bb){
            return (opt.sortType == UP)? 1 : -1
        }
        else{
            return 0;
        }
    });
}
 */
/**
 * 데이터를 옵션을 기준으로 정렬한다.
 * @param {object} data 정렬되지 않은 search 데이터
 * @param {object} opt 정렬 기준을 포함한 오프젝트 => { id : "rank, ...", sortType : UP, DOWN ...} 
 * @return {object} 정렬이 완료된 데이터
 */
function sortData(data, opt){ 
    if(opt.sortType === RESET){
        return data
    }
    let copydata = data.slice();
    return copydata.sort(function(a,b){
        /* 비어있는 값 하단으로 -> 항상 가장 높은 인덱스를 가지도록 한다. */
        let value_a = a[opt.id],
            value_b = b[opt.id];
        if(value_a === "" || value_a === null ){return 1;} 
        if(value_b === "" || value_b === null ){return -1;}
        let par_a = parseFloat(value_a),
            par_b = parseFloat(value_b),
            aa = isNaN(par_a) ? value_a.toLowerCase() : par_a,
            bb = isNaN(par_b) ? value_b.toLowerCase() : par_b;
        // let aa = (typeof a[opt.id] === 'string') ? a[opt.id].toLowerCase() : a[opt.id],
        //     bb = (typeof b[opt.id] === 'string') ? b[opt.id].toLowerCase() : b[opt.id];
        if(aa < bb){
            return (opt.sortType == UP) ? -1 : 1
        }  
        else if(aa > bb){
            return (opt.sortType == UP)? 1 : -1
        }
        else{
            return 0;
        }
    });
}

//
/**
 * 정렬된 데이터에 해당하는 각각의 tr(행)을 순서대로 찾고 부모노드의 마지막으로 이동시킨다.
 * @param {object} data 정렬된 데이터
 */
function sortElement(data){
    data.forEach(function(obj){
        let table,
            tr,
            list = w3.getElements('div.body_rank'),
            searTd = Array.from(list).find(function(td){
                return ""+obj.rank == td.textContent;
            });
        tr = searTd.parentNode;
        table = tr.parentNode;
        table.insertBefore(tr,null);
    }); 
}

/**
 * 전달 받은 values의 키에 해당하는 search_data의 값들을 더해 values에 저장한다.
 * @param {object} search_data 현재 화면에 보여지는 테이블 데이터
 * @param {object} values {revenues : 0, profits : 0}
 * @return {object} 계산된 values
 */
function sumValue(search_data, values){ 
    if(search_data === undefined) {search_data = filter_data;}
    for(key in values){
        search_data.forEach(function(obj){
            values[key] += (obj[key] === "" || obj[key] === null)? 0 : parseFloat(obj[key]);
        });
    }
    return values;
}

/**
 * values 값을 화면에 표시한다.
 * @param {object} values { revenues : 0, profits : 0 }
 */
function insertValue(values){ // values = {revenues : 0, profits : 0}
    w3.getElement('.sum_div :nth-child(2)').textContent = values.revenues.toFixed(1);
    w3.getElement('.sum_div :nth-child(3)').textContent = values.profits.toFixed(1);
}

/**
 * 합계 구하기 버튼 클릭 시 
 */
function clickSum(){
    let sum_list = {revenues : 0, profits : 0},
    sum_objects = sumValue(result_data, sum_list);
    insertValue(sum_objects);
}

/* 빈 데이터 뒤로 가기 예제 */
// function(array){
//     array.sort(function(a, b){
//         !a ? 1 
//         : (!b ? -1 
//         : (a.localeCompare(b)))
//     });
// }

