class ButtonC {
    constructor(element) {
        this.elem = element;
        this.value = "button";
        element.onclick = this.onClick.bind(this);
        this.ini();
    }

    ini() {
        this.elem.textContent = this.value;
        this.elem.style.setProperty("display", "inline-block");
        this.elem.style.setProperty("padding", "1px 6px");
        this.elem.style.setProperty("background-color", "#dfdfdf");
        this.elem.style.setProperty("cursor", "default");
        this.elem.style.setProperty("text-align", "center");
    }

    onClick(event) {
        /*  */
    }
}
let btn = new ButtonC(btn_div);

/* 클래스  */
class FolderPathC {
    arList = [];
    iconClassName; //기본 아이콘
    viewType = false; //0 또는 1
    selectListClass = "onActive";
    background_color = "#8fbce031";
    selectList_color = "#2196F3";

    /**
     * 초기 생성자
     * 매개변수로 오브젝트를 받는다. options
     * @param {object} element FolderPath가 될 Element
     */
    constructor(element) {
        this.elem = element; // element가 없을 경우?
        element.onclick = this.onClick.bind(this);
    }

    /**
     * @return {string} arList값을 string으로 반환
     */
    get path() {
        return this.arList.join("\\");
    }

    /**
     * @param {string} str path 문자열
     */
    set path(str) {
        if (!str) {
            alert("잘못된 입력");
            return;
        }
        this.arList = str.split("\\").filter(function (s) {
            return s;
        });
        this.render();
        // this.render(this.removeChild, this.elem); // render를 통해 변화된 리스트를 초기화 한다.
        // this.render(this.createList, this.arLi);
    }

    /**
     * @param {string} str icon className 문자열
     */
    set icon(str) {
        this.iconClassName = str;
    }

    /**
     * @param {boolean} bool true, false 값으로 viewType 설정
     */
    set view(bool) {
        this.viewType = bool;
    }

    /**
     * list와 icon 데이터를 받고 항목을 생성한다.
     * @param {string[]} list 항목으로 추가될 string 배열
     * @param {string} iconClass 항목에 들어갈 icon className
     */
    createList(list, iconClass) {
        // 리스트를 생성해주는 메소드
        list = list || []; //기본 값
        iconClass = iconClass || "fas fa-angle-right"; //기본 값
        let i,
            l = list.length,
            li,
            icon;
        for (i = 0; i < l; i++) {
            li = document.createElement("span");
            li.textContent = list[i];
            li.setAttribute("data-action", "ClickList"); // 클래스의 onClickList를 실행하기 위해
            icon = this.createIcon(iconClass);
            li.appendChild(icon);
            this.elem.appendChild(li);
        }
    }
    /**
     * set path 사용 시 화면 초기화 용도
     */
    // render(function1, a) {
    //     debugger;
    //     function1 && function1(a);
    // }

    render() {
        this.removeChild(this.elem);
        this.createList(this.arList);
    }

    /**
     * element의 모든 자식 노드들을 삭제한다.
     * @param {object} element 자식노드를 없앨 부모노드
     */
    removeChild(element) {
        while (element.hasChildNodes()) {
            element.removeChild(element.firstChild);
        }
    }
    /**
     * className을 받아 icon을 생성하여 리턴한다.
     * @param {string} className 클래스 이름 문자열
     */
    createIcon(className) {
        let icon = document.createElement("i");
        icon.className = className;
        return icon;
    }

    /**
     * target과 className을 받고 target의 형제노드들의 className 값을 모두 지운 후 target의 calss만 추가하는 기능
     * @param {object} target 선택된 노드
     * @param {string} className target에 부여할 className
     */
    addClass(target, className) {
        let classes;
        Array.from(target.parentNode.children).forEach(function (node) {
            classes = node.classList;
            classes.contains(className) && classes.remove(className);
        });
        classes = target.classList;
        classes.add(className);
    }
    /**
     * target의 형제노드들의 색상을 초기화 한 target의 색만 추가하는 기능
     * @param {object} target 선택된 노드
     * @param {string} className target에 부여할 className
     */
    changeColor(target, bColor, sColor) {
        Array.from(target.parentNode.children).forEach(function (node) {
            node.style.setProperty("background-color", bColor);
        });
        target.style.setProperty("background-color", sColor);
    }
    /**
     * target의 index를 알아내고 list의 index까지만 데이터가 존재하는 배열을 반환하는 기능
     * @param {object} target 선택된 노드
     * @param {[]} list 데이터를 잘라낼 배열
     */
    removeArr(target, list) {
        let idx = Array.from(target.parentNode.children).indexOf(target),
            copyList = list.slice(); // 복사
        copyList.splice(idx + 1, copyList.length); //잘라내기
        return copyList;
    }

    /**
     * 선택된 항목을 class의 viewType에 따라 다르게 처리한다.
     * @param {*} event
     */
    onClickList(event) {
        if (this.viewType) {
            let newList = this.removeArr(event.target, this.arList);
            this.createList(newList);
        } else {
            //this.addClass(event.target, this.selectListClass);
            this.changeColor(
                event.target,
                this.background_color,
                this.selectList_color
            );
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

function clickbtn(event) {
    switch (event.target.id) {
        case "pathbtn":
            path.path = getValue("pathinput");
    }
}

function getValue(id) {
    return document.getElementById(id).value;
}

/* 실행부분 */
let path = new FolderPathC(folderpath_div);
document.getElementById("pathbtn").addEventListener("click", clickbtn);
document.getElementById("pathcheckbox").addEventListener("click", clickbtn);

document.documentElement.setAttribute("data-theme", localStorage.theme);
