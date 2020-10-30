// let inputEl = w3.getElement("#pathinput"),
//     listEl = w3.getElement("#pathList"),
//     btnEl = w3.getElement('#pathbtn'),
//     path = w3.getElement('#pathview'),
//     arInputList;

// btnEl.addEventListener('click', createList);


// function selectList(e){
//     let childNode = e.target,
//         parentNode = childNode.parentNode,
//         idx = Array.from(parentNode.children).indexOf(childNode);
//         arInputList.splice(idx+1,arInputList.length);
//     createList(e);
// }

// function createList(e){
//     arInputList = (e.target.id === 'pathbtn') ? inputEl.value.split("\\") : arInputList || inputEl.value.split("\\");
//     let str,
//         li;
//     /* 기존 항목 삭제 */
//     while(listEl.hasChildNodes()){
//         debugger;
//         listEl.removeChild(listEl.firstChild)
//     }
//     /* 리스트에 항목 추가 */
//     for(str of arInputList){
//         li = document.createElement('li');
//         li.textContent = str;
//         li.addEventListener('click', selectList);
//         listEl.appendChild(li);
//     }
//     /* 현재 path 표시 */
//     path.textContent = arInputList.join('\\');
// }

class FolderPath{
    inputEl;
    listEl;
    btnEl;
    path;
    arInputList;

    constructor(elem){
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    submit(e){
        this.arInputList = (e.target.id === 'pathbtn') ? this.inputEl.value.split("\\") : this.arInputList || this.inputEl.value.split("\\");
        let str,
            li;
        /* 기존 항목 삭제 */
        while(this.listEl.hasChildNodes()){
        
            this.listEl.removeChild(this.listEl.firstChild)
        }
        /* 리스트에 항목 추가 */
        for(str of this.arInputList){
            li = document.createElement('li');
            li.textContent = str;
            li.setAttribute("data-action",'list');
            //li.addEventListener('click', selectList);
            this.listEl.appendChild(li);
        }
        /* 현재 path 표시 */
        this.path.textContent = this.arInputList.join('\\');
    }
    onlist(e){
        //arguments
        
        let childNode = e.target,
            parentNode = childNode.parentNode,
            idx = Array.from(parentNode.children).indexOf(childNode);
            this.arInputList.splice(idx+1,this.arInputList.length);
        this.submit(e);
    }
    
    onClick(event){
        let action = event.target.dataset.action;
            if(action){
                this[action](event);
            }
        // action && (fn = this["on"+action]);
        // if(fn ){
            //fn.call( this, action, "a");
            //fn.apply(this,"1". {a:5}, "5")
            //fn ();
        
    };

}

    objFolder = new FolderPath(folderpath);
    objFolder.inputEl = w3.getElement("#pathinput"),
    objFolder.listEl = w3.getElement("#pathList"),
    objFolder.btnEl = w3.getElement('#pathbtn'), 
    objFolder.path = w3.getElement('#pathview');
