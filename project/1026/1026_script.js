// 변경사항 
// 1. el_byte_txt변수 지역으로 할당, _strText 변수 지역으로 할당, 전역변수 최소화
// 2. 리스너 등록 하나로 몰아주기
// 3. formatBytes 소수점 제거
// 4. 62Line XMLSerializer() 
// 5. css 스타일 변경
// 6. 테이블 display 변경
// 7. 다운로드 이름 입력받는 기능 추가

let jsondata = window.mastercode, 
//parseFalse -> text로 리턴 ParseTrue -> object로 리턴
filter_data = filterData(jsondata,'pq_',true);

//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);
iniElement();

//bytes 단위를 크기게 맞게 단위 변환
function formatBytes(bytes){
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if(bytes == 0) return '0 Byte';
    let i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / 1024 ** i).toFixed(0) + ' ' + sizes[i];
}

//체크박스, 버튼, text 등 Element 이벤트 리스너 등록
function iniElement(){
    //검색버튼 리스너 등록
    let element, json_filename, html_filename, txt;
    element = document.getElementById('search_btn');
    element.addEventListener("click", function(){
        txt = document.getElementById('txt');
        if (txt.value == ""){
            alert("검색어를 입력하세요");
        }
        else{
            let result = searchData(txt.value, getCheck()), //검색어를 search 한다
            collections = document.getElementsByClassName('body_rank'),
            arcollection = Array.from(collections);
            setDisplay(arcollection, result);
            txt.value = '';
            //createTableBody(result); // result를 통해 테이블 재생성
        }
    });

    //초기화버튼 리스너 등록 => + input text 초기화
    element = document.getElementById('clear_btn');
    element.addEventListener("click", function(){
        //createTableBody(filter_data);
        //테이블의 모든 tr에 대해 showElement를 실행한다.
        showElements(document.getElementsByClassName('body_item'));
        document.getElementById('txt').value = '';
    });

    // JSON데이터 파일 다운로드 리스너 등록
    element = document.getElementById("savedata_btn");
    json_filename = document.getElementById("json_filename");
    element.addEventListener("click", function() {
        let _strText = filterData(jsondata,'pq_',false), // filterData(원본데이터, 필터텍스트, Parse여부 -> false시 text전달)
        // Blob(Binary Large Object) 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용
        blob = new Blob([_strText], { type: "text/plain;charset=utf-8"});
        saveAs(blob, (json_filename.value || json_filename.placeholder) + ".json");
    });
    
    // HTML문서 다운로드 리스너 등록
    element = document.getElementById("savehtml_btn"),
    html_filename = document.getElementById("html_filename");
    element.addEventListener("click", function() {
        let xmls = new XMLSerializer(),
        str = xmls.serializeToString(document),
        blob = new Blob([str], {type: "text/plain;charset=utf-8"});
        saveAs(blob, (html_filename.value || html_filename.placeholder) + ".html"); 
    });

    // 체크박스 이벤트 리스너 등록
    let archeckbox = document.getElementsByName("checkbox");
    archeckbox.forEach(function(box){
        box.addEventListener('click',function(){
            let chk_cnt = 0, i = 0,
            l = archeckbox.length;
            for(i; i < l; i++){
                archeckbox[i].checked && chk_cnt++;
            }
            if(chk_cnt == 0){
                alert("하나 이상 체크하세요")
                this.checked = true;
            }
        });
    });

    // byte단위 변환 텍스트 변화 시 이벤트 리스너 등록
    let byte_btn = document.getElementById('byte_btn'),
    byte_txt = document.getElementById('byte_txt'),
    byte_p = document.getElementById('size_view');
    byte_btn.addEventListener('click',function(){
        text = byte_txt.value;
        if(text === ""){
            byte_p.textContent = "0 Byte";
        }
        else{
            let result = formatBytes(parseInt(text));
            byte_p.textContent = result;
        }
    });
}

//테이블 해드 생성
function createTableHead(objects) {
    let title, tr, td, table = document.getElementById('table_head');
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
    let tr, td, object, table = document.getElementById("table_body");
    // while(table.firstChild){ //자식 노드 제거
    //     table.removeChild(table.firstChild)
    // }
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
    objects = document.getElementById('search_type');
    objChecklist.searchType = objects.children[0].checked ? 0 : 1;
    //children[0] 이외의 값이 올 경우 예외 처리
    objects = document.getElementById('checkboxs');
    for(let child of objects.children){
        child.checked && objChecklist.item.push({id: child.value});
    }    
    return objChecklist ;
}

//테이블의 tr요소와 searchData의 result를 비교하여 tr의 display를 설장한다.
function setDisplay(arElement, arObj){
    Array.from(arElement).forEach(function(Element){
        let node = Element.parentNode,
        findObj = arObj.find(function(object){
            return Element.textContent == object.rank;
        });
        (findObj !== undefined) ? showElement(node) : hideElement(node)
    });
}
//Element의 display를 none으로 설정한다.
function hideElement(element) {
    element.style.setProperty('display', 'none');
}

function showElements(elements){
    var i,
    l = elements.length;
    for (i = 0; i < l; i++) {
        showElement(elements[i]);
    };
}

//Element의 display를 flex로 설정한다. -> tr이 flex box이기 때문.
function showElement(element) {
    element.style.setProperty('display', 'flex');
}


