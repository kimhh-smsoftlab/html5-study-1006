/* 클래스  */
class FolderPathC {
    arList = [];

    constructor(elem) {
        // ul
        this.elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    get inputStr() {
        //input
        return this.arList.join("\\");
    }

    set inputStr(str) {
        //input
        this.arList = str ? str.split("\\") : [];
    }

    set color(col) {
        col
            ? this.elem.style.setProperty("background-color", col)
            : this.elem.style.setProperty("background-color", "White");
    }

    createList() {
        while (this.elem.hasChildNodes()) {
            this.elem.removeChild(this.elem.firstChild);
        }
        let li, icon;
        for (let str of this.arList) {
            (li = document.createElement("li")),
                (icon = document.createElement("i"));
            icon.className = `fas fa-angle-right`;
            li.setAttribute("data-action", "list");
            li.textContent = str;
            li.appendChild(icon);
            this.elem.appendChild(li);
        }
    }

    /* li 클릭시 클릭된 이후의 배열데이터를 모두 지운다. */
    onlist(e) {
        //arguments
        let childNode = e.target, //클릭 노드 -> li
            parentNode = childNode.parentNode, //상위 노드 -> ul
            idx = Array.from(parentNode.children).indexOf(childNode); // children을 array형태로 변경하고 li의 index를 알아낸다.
        this.arList.splice(idx + 1, this.arList.length); // 잘라낸다. -> 배열이 필요하네 -> 이 배열은 외부에서 받은 스트링을 나눈것.
        this.createList();
    }

    onClick(event) {
        /* action검사와 그 메소드가 있는지 확인할 것  */
        let fn,
            action = event.target.dataset.action;
        action && (fn = this["on" + action]);
        if (fn) {
            fn.call(this, event);
            // fn.call(this,event)
            // fn.apply(this,[event])
        }
    }
}

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
            li.setAttribute("data-action", "list");
            li.textContent = str;
            li.appendChild(icon);
            this.elem.appendChild(li);
        }
    };

    FolderPathF.prototype.onlist = function (e) {
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

let input = document.getElementById("pathinput"),
    btn = document.getElementById("pathbtn"),
    fpList = [];
btn.addEventListener("click", function (e) {
    ar = w3.getElements(".folderpath1");
    ar.forEach(function (objFp) {
        let path = new FolderPathC(objFp);
        path.inputStr = input.value;
        path.createList();
        fpList.push(path);
    });
    ar = w3.getElements(".folderpath2");
    ar.forEach(function (objFp) {
        let path = new FolderPathF(objFp);
        path.setArList(input.value);
        path.createList();
        fpList.push(path);
    });
});

document.documentElement.setAttribute("data-theme", localStorage.theme);
