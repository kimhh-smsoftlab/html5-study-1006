/* 실행 코드 */

/* 클래스  */
class TableView {
    __data;
    __itemNames = [];
    __bodyItemTemplate = `<div class="table-item"></div>`;
    __headItemTemplate = `<div class="table-item">
    <i class="fas fa-chevron-down"></i>
    <i class="fas fa-chevron-up"></i>
    </div>`;

    constructor(options) {
        this.init(options);
    }

    init(options) {
        this.__elem = options.element;
        this.copydata = options.data;
    }
    /* 테이블 해드*/
    set itemNames(list) {
        this.__itemNames = {
            ...list,
        };
    }

    /* 임의의 속성 삽입 */
    set copydata(data) {
        this.__data = data.slice();
        let i,
            l = this.__data.length;
        for (i = 0; i < l; i++) {
            this.__data[i].pq_index = i;
        }
    }

    createTable() {
        let tr = document.createElement("div");
        tr.className = "table_head";
        for (let key in this.__itemNames) {
            this.addHeadItem(tr, this.__itemNames[key]);
        }
        this.__elem.appendChild(tr);
        this.createBody.call(this, this.__data);
    }
    //scroll 객체
    createBody(data) {
        /* HyperList (virtual scroll) 사용 */
        let container = document.createElement("div"),
            self = this;
        container.className = "table_body";
        HyperList.create(container, {
            height: "80%",
            itemHeight: 25,
            total: data.length,
            generate(index) {
                return self.createBodyRow(data[index]);
            },
        });
        let body = this.__elem.querySelector(".table_body");
        if (body) {
            this.__elem.removeChild(body);
        }
        this.__elem.appendChild(container);
    }

    addHeadItem(tr, key) {
        const itemEl = this.createHeadItem();
        this.updateItem(itemEl, key);
        tr.appendChild(itemEl);
    }

    createHeadItem() {
        const div = document.createElement("div");
        div.innerHTML = this.__headItemTemplate;
        return div.firstElementChild;
    }

    /* 수정이 필요함  */
    createBodyRow(object) {
        const tr = document.createElement("div");
        tr.setAttribute("data-index", object.pq_index);
        for (let key in this.__itemNames) {
            this.addBodyItem(tr, object[key]);
        }
        return tr;
    }
    addBodyItem(tr, key) {
        const itemEl = this.createBodyItem();
        this.updateItem(itemEl, key);
        tr.appendChild(itemEl);
    }
    createBodyItem() {
        const div = document.createElement("div");
        div.innerHTML = this.__bodyItemTemplate;
        return div.firstElementChild;
    }

    updateItem(itemEl, str) {
        itemEl.textContent = str;
    }

    searchData(value) {
        var search = value; // 입력값
        var search1 = Hangul.disassemble(search).join(""); // ㄺ=>ㄹㄱ
        // 대소문자 구별없이 검색
        search = search.toUpperCase();
        search1 = search1.toUpperCase();

        // 문자열 검색 || 초성검색
        let arList = this.__data.filter(function (item) {
            return (
                item.code.indexOf(search) == 0 || // 종목코드 검색
                item.name.toUpperCase().includes(search) || // 실제 데이터 검색
                item.csname.toUpperCase().includes(search1)
            ); // 초성분리에서 검색
        });
        // this.setDisplay(arList);
        this.createBody(arList);
    }
}

let jsondata = window.mastercode;
let el = document.querySelector("#table_div");
let tableview = new TableView({ element: el, data: jsondata });
tableview.itemNames = { name: "이름", code: "고유번호", symbol: "시장항목" };
tableview.createTable();

document
    .querySelector("button[data-search-btn]")
    .addEventListener("click", clickSearchBtn);

function clickSearchBtn() {
    txt = document.querySelector("input[data-input-txt]");
    if (txt.value == "") {
        alert("검색어를 입력하세요");
    } else {
        result_data = tableview.searchData(txt.value); //검색어를 search 한다
        txt.value = "";
    }
}

let html = document.documentElement,
    theme_btn = document.querySelector("button[data-set-theme]"),
    theme = html.getAttribute("data-theme");

theme_btn.textContent = `${theme} Mode`;
theme_btn.setAttribute("data-set-theme", theme);
document
    .querySelector("button[data-set-theme]")
    .addEventListener("click", function (e) {
        let target = e.target,
            newTheme = target.getAttribute("data-set-theme");
        if (newTheme == "Dark") {
            newTheme = "Light";
            target.setAttribute("data-set-theme", "Light");
            target.textContent = "Light Mode";
        } else {
            newTheme = "Dark";
            target.setAttribute("data-set-theme", "Dark");
            target.textContent = "Dark Mode";
        }
        if (newTheme) {
            html.setAttribute("data-theme", newTheme);
            localStorage.theme = newTheme;
        }
    });

document
    .querySelector("[data-set-lang]")
    .addEventListener("click", function (e) {});

document.addEventListener("click", function (e) {
    let target = e.target,
        value = target.dataset["country"];
    if (value) {
        changeCountry(value);
        target.parentElement.classList.toggle("show");
    }
    value = target.dataset["setLang"];
    if (value) {
        document.querySelector(".dropdown-content").classList.toggle("show");
    }
});

let changeCountry = function (country) {
    if (document.webL10n) document.webL10n.setLanguage(country);
    document.querySelector("[data-set-lang] > img").src = `/img/${country}.png`;
};

let setL10nId = function (ar) {
    let a = document.querySelectorAll(".table_head > div");
    let l = a.length,
        i;
    for (i = 0; i < l; i++) {
        a[i].setAttribute("data-l10n-id", ar[i]);
    }
};
setL10nId(["name", "code", "symbol"]);
