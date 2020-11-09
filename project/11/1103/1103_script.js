/* 클래스  */
class FolderPathC {
    arList;

    constructor(obj) {
        this.elem = obj.element; // element가 없을 경우?
        this.checkElem = obj.check; //checkbox element
        this.inputStr = obj.str;
        obj.element.onclick = this.onClick.bind(this);
        this.createList();
    }

    get inputStr() {
        return this.arList.join("\\");
    }

    set inputStr(str) {
        this.arList = str
            ? str.split("\\").filter(function (s) {
                  return s;
              })
            : ["empty path"];
    }

    set color(col) {
        col
            ? this.elem.style.setProperty("background-color", col)
            : this.elem.style.setProperty("background-color", "White");
    }

    createList(list) {
        list = list || this.arList;
        while (this.elem.hasChildNodes()) {
            this.elem.removeChild(this.elem.firstChild);
        }
        let icon,
            li,
            i,
            l = list.length;
        for (i = 0; i < l; i++) {
            li = document.createElement("li");
            li.setAttribute("data-action", "Change");
            li.textContent = list[i];
            if (i != l - 1) {
                icon = document.createElement("i");
                icon.className = `fas fa-angle-right`;
                li.appendChild(icon);
            }
            this.elem.appendChild(li);
        }
    }

    onChange(e) {
        //arguments
        let childNode = e.target, //클릭 노드 -> li
            parentNode = childNode.parentNode; //상위 노드 -> ul
        if (this.checkElem.checked) {
            let idx = Array.from(parentNode.children).indexOf(childNode),
                copyList = this.arList.slice();
            copyList.splice(idx + 1, copyList.length);
            this.createList(copyList);
        } else {
            /* 클릭된 이후의 배열데이터를 모두 제거 */
            let classes;
            Array.from(parentNode.children).forEach(function (obj) {
                classes = obj.classList;
                classes.contains("onActive") && classes.remove("onActive"); // onActive class 제거
            });
            classes = childNode.classList;
            classes.add("onActive"); //onActive class 추가
        }
    }

    onClick(event) {
        /* action검사와 그 메소드가 있는지 확인할 것  */
        let fn,
            action = event.target.dataset.action;
        action && (fn = this["on" + action]);
        if (fn) {
            fn.call(this, event);
        }
    }
}

let obj = {},
    input = document.getElementById("pathinput"),
    btn = document.getElementById("pathbtn"),
    checkbox = document.getElementById("pathcheckbox"),
    path;

btn.addEventListener("click", function () {
    obj.element = w3.getElement(".folderpath1");
    obj.str = input.value;
    obj.check = checkbox;
    path = new FolderPathC(obj);
    w3.show(".fd", "block");
});

document.documentElement.setAttribute("data-theme", localStorage.theme);

/* 프로토타입  */
function FolderPathF(elem) {
    this.arList = [];
    this.elem = elem;
    FolderPathF.prototype.setArList = function (str) {
        this.arList = str ? str.split("\\") : [];
    };

    FolderPathF.prototype.getArList = function () {
        return this.arList.join();
    };

    FolderPathF.prototype.setColor = function (col) {
        col
            ? this.elem.style.setProperty("background-color", col)
            : this.elem.style.setProperty("background-color", "White");
    };

    FolderPathF.prototype.createList = function () {
        while (this.elem.hasChildNodes()) {
            this.elem.removeChild(this.elem.firstChild);
        }
        let li, icon, str;
        for (str of this.arList) {
            (li = document.createElement("li")),
                (icon = document.createElement("i"));
            icon.className = `fas fa-angle-right`;
            li.setAttribute("data-action", "Change");
            li.textContent = str;
            li.appendChild(icon);
            this.elem.appendChild(li);
        }
    };

    FolderPathF.prototype.onChange = function (e) {
        let childNode = e.target, //클릭 노드 -> li
            parentNode = childNode.parentNode, //상위 노드 -> ul
            idx = Array.from(parentNode.children).indexOf(childNode); // children을 array형태로 변경하고 li의 index를 알아낸다.
        this.arList.splice(idx + 1, this.arList.length); // 잘라낸다. -> 배열이 필요하네 -> 이 배열은 외부에서 받은 스트링을 나눈것.
        this.createList();
    };

    FolderPathF.prototype.onClick = function (event) {
        /* action검사와 그 메소드가 있는지 확인할 것  */
        let fn,
            action = event.target.dataset.action;
        action && (fn = this["on" + action]);
        if (fn) {
            fn.call(this, event);
            // fn(event); -> 호출할 경우 onlist의 this가 window로 잡힌다.
        }
    };
    elem.onclick = this.onClick.bind(this);
}

// btn.addEventListener('click',function(e){
//     ar = w3.getElements('.folderpath1');
//     ar.forEach(function(objFp){
//         obj.element = objFp;
//         obj.str = input.value;
//         obj.check = checkbox;
//         path = new FolderPathC(obj);
//         fpList.push(path);
//     });
//     ar = w3.getElements('.folderpath2');
//     ar.forEach(function(objFp){
//         path = new FolderPathF(objFp);
//         path.setArList(input.value);
//         path.createList();
//         fpList.push(path);
//     });
//     w3.show('.fd','block');
// })
