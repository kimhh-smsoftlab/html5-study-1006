// 변경사항 
// document.addEventListener 등록
// w3lib getElement, getElements 활용
// toggleshow, toggleclass 활용 

let jsondata = window.mastercode, 
//parseFalse -> text로 리턴 ParseTrue -> object로 리턴
filter_data = filterData(jsondata,'pq_',true);

//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);


//체크박스, 버튼, text 등 Element 이벤트 리스너 등록
document.addEventListener('click',function(e){
    let target = e.target,
    text_input;
    if(target.className === 'checkbox'){
        clickCheckbox(target);
    }else{
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
        }
    }
});

//w3 filterHTML 예제 
let table_text = w3.getElement("#table_text");
table_text.addEventListener('keyup', function(){
    w3.filterHTML('#id01', '.item', this.value)
});


//검색버튼 리스너 등록
function clickSearchBtn(){
    console.time("test");
    txt = w3.getElement('#txt');
    if (txt.value == ""){
        alert("검색어를 입력하세요");
    } else {
        let result = searchData(txt.value, getCheck()), //검색어를 search 한다
        arNodes = w3.getElements('div.body_rank');//document.getElementsByClassName('body_rank'),
        setDisplay(arNodes, result);
        txt.value = '';
    console.timeEnd("test");
    }
}

//초기화버튼 리스너 등록 => + input text 초기화
function clickClearbtn(){
    w3.showElements(w3.getElements('div.body_item'),'flex');
    w3.getElement('#txt').value = '';
}

//bytes 단위를 크기게 맞게 단위 변환
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
function createTableHead(objects) {
    let title, tr, td, table = w3.getElement('#table_head')//document.getElementById('table_head');
    tr = document.createElement("div");
    tr.className = "table_header flex_row";
    for (title in objects[0]) {
        td = document.createElement("div");
        td.textContent = title;
        td.className = `item_${title}`;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}

//테이블 바디 생성
function createTableBody(objects) {
    let tr, td, object, table = w3.getElement("#table_body");
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

//JSON.stringify(value[, replacer[, space]])
function filterData(jsondata, text, doParse){
    let srttext = JSON.stringify(jsondata, function(key, value){
        return (key.includes(text) ? undefined : value); //(typeof value === 'number' ? value.toString() : value));
    },3);
    return doParse ? JSON.parse(srttext) : srttext
}

//화면의 checkbox에서 체크된 항목의 value를 받아온다. 
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

function addClassElement(element, name){
    let arr1 = element.className.split(" "), //기존 클래스
    arr2 = name.split(" "); // 추가 클래스
    arr2.foreach(function(obj){ //추가되는 클래스의 갯수 만큼 
        (arr1.indexOf(obj) == -1) && (element.className += " " + obj);
        //arr1에 추가되는 class가 이미 있는지 확인
        //없으면 추가
    });
}

function removeClassElement(element, name){
    let arr1 = element.className.split(" "), //기존 클래스
    arr2 = name.split(" "); // 추가 클래스
    arr2.foreach(function(obj){ //추가되는 클래스의 갯수 만큼 
        while(arr1.indexOf(obj) > -1){
            arr1.splice(arr1.indexOf(obj,1));
        }
    });
}

let myObject = {"firstName" : "John", "lastName" : "Doe"};
w3.displayObject("id02", myObject);
