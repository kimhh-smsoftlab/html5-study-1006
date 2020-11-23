class Calendar {
    _config = {};
    _date;
    constructor(elem, data) {
        this._elem = this.element;
        this._srcData = data || [];
        elem.append(this._elem);
        this._$contentTitle = $("#current-year-month");
        this._$contentBody = $("#calendar-body");
        this.init();
    }

    init() {
        let today = new Date(),
            config = this._config;
        this._date = new Date(today.getFullYear(), today.getMonth(), 1);
        config.monthList = [
            "1월",
            "2월",
            "3월",
            "4월",
            "5월",
            "6월",
            "7월",
            "8월",
            "9월",
            "10월",
            "11월",
            "12월",
        ];
        config.leapYear = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        config.notLeapYear = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.createCalendar();
        this.setText();
    }
    /* 기본 달력 템플릿 */
    get element() {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div id="calendar">
                                <div class="calendar-head">
                                <div>
                                            <select name="year" id="year"></select>
                                            <select name="month" id="month"></select>
                                        </div>
                                    <div>
                                        
                                        <div>
                                            <label id="prev"> < </label>
                                        </div>
                                        <div id="current-year-month">Title</div>
                                        <div>
                                            <label id="next"> > </label>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="sun">Sun</div>
                                        <div>Mon</div>
                                        <div>Tue</div>
                                        <div>Wed</div>
                                        <div>Thu</div>
                                        <div>Fri</div>
                                        <div class="sat">Sat</div>
                                    </div>
                                </div>
                                <div id="calendar-body" class="calendar-body"></div>
                            </div>`;
        return newElem.firstElementChild;
    }

    get pageYear() {
        return this._date.getFullYear() % 4 === 0
            ? this._config.leapYear
            : this._config.notLeapYear;
    }

    createCalendar() {
        let i, j;
        for (i = 0; i < 6; i++) {
            let tr = document.createElement("div");
            tr.setAttribute("class", `tr-${i}`);
            /* 7개 열 */
            for (j = 0; j < 7; j++) {
                let td = document.createElement("div");
                td.setAttribute("class", `td-${j}`);
                tr.appendChild(td);
            }
            this._$contentBody.append(tr);
        }
        this.setEventListener();
    }
    setText() {
        let row,
            column,
            year = this._date.getFullYear(),
            day = this._date.getDay(),
            month = this._date.getMonth(),
            cnt = 1,
            pageYear = this.pageYear;
        for (row = 0; row < 6; row++) {
            for (column = 0; column < 7; column++) {
                let $dayEl = $(`.tr-${row} .td-${column}`);
                if ((row === 0 && column < day) || cnt > pageYear[month]) {
                    $dayEl
                        .removeAttr("data-item")
                        .removeAttr("data-project")
                        .text("");
                } else {
                    $dayEl.text(cnt).attr("data-item", "");
                    this.checkSrc(`${year}-${month + 1}-${cnt}`)
                        ? $dayEl.attr("data-project", "")
                        : $dayEl.removeAttr("data-project");
                    cnt++;
                }
            }
        }
        this.setTitle();
        this.setSelect();
    }
    checkSrc(str) {
        let srcdata = this._srcData.find(function (obj) {
            return obj.id == str;
        });
        return srcdata ? true : false;
    }

    /* 이전 달로 이동*/
    changeMonth(target) {
        let year = this._date.getFullYear(),
            month = this._date.getMonth(),
            value = target.id === "prev" ? -1 : 1;
        /* prev => 이전, next => 다음  */
        this._date = new Date(year, month + value, 1);
        this.setText();
    }

    setEventListener() {
        $("#prev").on("click", (e) => this.changeMonth(e.target));
        $("#next").on("click", (e) => this.changeMonth(e.target));
        $("#calendar-body").on("click", (e) => this.onItemClick(e.target));
        $("#year").on("change", (e) => this.onSelectChange(e.target));
        $("#month").on("change", (e) => this.onSelectChange(e.target));
    }

    onItemClick(target) {
        if (target.dataset.hasOwnProperty("project")) {
            let year = this._date.getFullYear(),
                month = this._date.getMonth() + 1,
                day = target.textContent;
            let srcdata = this._srcData.find(function (obj) {
                return obj.id == `${year}-${month}-${day}`;
            });
            window.location.href = srcdata.src;
        }
    }
    onSelectChange(target) {
        let year = this._date.getFullYear(),
            month = this._date.getMonth();
        if (target.id == "year") {
            year = target.value;
        } else {
            month = target.value;
        }
        this._date = new Date(year, month, 1);
        this.setText();
    }
    setTitle() {
        let month = this._date.getMonth(),
            year = this._date.getFullYear(),
            title = year + "년 " + this._config.monthList[month];
        this._$contentTitle.text(title);
    }
    setSelect() {
        let yearEl = $("#year")[0],
            monthEl = $("#month")[0],
            year = this._date.getFullYear(),
            month = this._date.getMonth();

        for (let i = 1980; i <= 2040; i++) {
            yearEl.options[i - 1980] = new Option(i + " 년", i);
        }

        for (let i = 0; i < 12; i++) {
            monthEl.options[i] = new Option(i + 1 + " 월", i);
        }
        yearEl.options[year - 1980].selected = "selected";
        monthEl.options[month].selected = "selected";
    }
}
