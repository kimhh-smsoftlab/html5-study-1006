/* 클래스  */
class FolderPathC {
    __viewType = 0;
    __arPath = [];
    __template = `<span class="path-item">
            <span class="path-item-str"></span>
            <i class="fas fa-angle-right"></i>
        </span>`;

    constructor(options) {
        this.__height = options.height || "50px";
    }

    init(element) {
        this.__elem = element;
    }

    set viewType(num) {
        this.__viewType = num;
    }

    set arPath(str) {
        if (!str) {
            alert("잘못된 입력");
            return;
        }
        this.__arPath = str.split("\\").filter(function (s) {
            return s;
        });
    }

    get arPathLength() {
        return this.__arPath.length;
    }

    get activePathEl() {
        return this.__elem.querySelector(".path-item[active]");
    }
    get pathEls() {
        /* 개념 확실히 숙지할것  */
        return Array.prototype.slice.call(
            this.__elem.querySelectorAll(".path-item")
        );
    }

    createPath(str) {
        this.arPath = str;
        this.clearPath();
        for (let i = 0; i < this.arPathLength; i++) {
            this.addPath(this.__arPath[i]);
        }
    }

    createNewPathItemEl() {
        const div = document.createElement("div");
        div.innerHTML = this.__template;
        return div.firstElementChild;
    }

    updatePathItem(pathEl, str) {
        pathEl.querySelector(".path-item-str").textContent = str;
        // this.setupStyle(pathEl); // 아이템 레이아웃 설정
    }
    // setupStyle(pathEl){
    //     pathEl.style.s
    // }

    setPathClickEventListener(pathEl) {
        pathEl.addEventListener("click", (_) => this.selectPath(pathEl));
    }

    selectPath(pathEl) {
        let viewtype = this.__viewType;
        this.removePathActive();
        switch (viewtype) {
            case 0:
                this.addPathActive(pathEl);
                break;
            case 1:
                this.removePath(pathEl);
                break;
            //case 2,3...:
        }
    }

    addPathActive(pathEl) {
        pathEl && pathEl.setAttribute("active", ""); //새로 active 설정
    }

    removePathActive() {
        const activePathEl = this.activePathEl;
        activePathEl && activePathEl.removeAttribute("active");
    }

    removePath(pathEl) {
        while (pathEl.nextElementSibling) {
            pathEl.parentNode.removeChild(pathEl.nextElementSibling);
        }
    }

    addPath(str) {
        const pathEl = this.createNewPathItemEl();
        this.__elem.appendChild(pathEl);
        this.updatePathItem(pathEl, str);
        this.setPathClickEventListener(pathEl);
    }

    clearPath() {
        while (this.__elem.hasChildNodes()) {
            this.__elem.firstChild.remove();
        }
    }
}

/* 실행 코드 */
let viewType = 0;

let el = document.querySelector(".folderpath-content"),
    folderPath = new FolderPathC({ padding: 10 });
folderPath.init(el);

document
    .querySelector("button[data-create-path]")
    .addEventListener("click", function () {
        let input = document.querySelector("input[data-path-input]").value;
        folderPath.createPath(input);
    });

document
    .querySelector("input[data-view-type]")
    .addEventListener("click", function () {
        viewType = viewType == 1 ? 0 : ++viewType;
        folderPath.viewType = viewType;
    });

let html = document.documentElement;
document.documentElement.setAttribute("data-theme", localStorage.theme);
document.addEventListener("click", (e) => {
    let { target } = e,
        newTheme = target.getAttribute("data-set-theme");
    if (newTheme) {
        html.setAttribute("data-theme", newTheme);
        localStorage.theme = newTheme;
    }
});
