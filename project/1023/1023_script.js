let jsondata = window.mastercode,
table, tr, td, el_btn, blob, el_filesize,result;

//parseFalse -> text로 리턴 ParseTrue -> object로 리턴
let _strText = filterData(jsondata,'pq_',false), // filterData(원본데이터, 필터텍스트, Parse여부 -> false시 text전달)
filter_data = filterData(jsondata,'pq_',true);
iniElement();
//초기 테이블 생성
createTableHead(filter_data)
createTableBody(filter_data);

//file사이즈 표시
function iniElement() {
    let el_byte_txt = document.getElementById('byte_txt');
    el_byte_txt.addEventListener('change',function(){
    if(el_byte_txt.value !== ""){
        let result = formatBytes(parseInt(this.value));
        el_size_view = document.getElementById('size_view');
        el_size_view.textContent = result;
    }
    else{
        el_size_view.textContent = "0 Byte";
    }
});
}

//bytes 단위를 크기게 맞게 단위 변환
function formatBytes(bytes){
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if(bytes == 0) return '0 Byte';
    let i = Math.floor(Math.log(bytes) / Math.log(1000));
    return (bytes / 1000 ** i).toFixed(2) + ' ' + sizes[i];
}



//검색 버튼 
el_btn = document.getElementById('search_btn');
el_btn.addEventListener("click", function(){
    let txt = document.getElementById('txt');
    if (txt.value == ""){
        alert("검색어를 입력하세요");
    }
    else{
        result = searchData(txt.value, getCheck()); //검색어를 search 한다
        createTableBody(result); // result를 통해 테이블 재생성
        txt.value = '';
    }
})

 //검색 초기화 => + input text 초기화
el_btn = document.getElementById('clear_btn');
el_btn.addEventListener("click", function(){
    createTableBody(filter_data);
    document.getElementById('txt').value = '';
})

// JSON데이터 파일 다운로드
el_btn = document.getElementById("save_btn");
el_btn.addEventListener("click", function() {
    // Blob(Binary Large Object) 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용
    blob = new Blob([_strText], { type: "text/plain;charset=utf-8"});
    saveAs(blob, "text.json"); //2211byte
});

// 체크박스 이벤트 리스너 등록
let chkbox = document.getElementsByName("checkbox");
chkbox.forEach(function(obj){
    obj.addEventListener('click',function(){
        
        let chk_cnt = 0, i = 0,
        l = chkbox.length;
        for(i; i < l; i++){
            chkbox[i].checked && chk_cnt++;
        }
        if(chk_cnt == 0){
            alert("하나 이상 체크하세요")
            this.checked = true;
        }
    });
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
//filter_data에서 검색어 탐색
function searchData(input, checklist){ 
    input = input.toLowerCase(); //소문자 변환
    let arr,success,value,
    arItem = checklist.item;
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



