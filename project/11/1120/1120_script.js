class Calendar {
    _config = {};
    _date;
    constructor(elem) {
        this._elem = this.element;
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
        this.setEventListener();
        this.showCalendar();
    }
    /* 기본 달력 템플릿 */
    get element() {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div id="calendar">
                                <div class="calendar-head">
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

    showCalendar() {
        let first = this._date,
            cnt = 1,
            i,
            j,
            pageYear = this.pageYear;
        /* 6개 행 */
        for (i = 0; i < 6; i++) {
            let tr = document.createElement("div");
            /* 7개 열 */
            for (j = 0; j < 7; j++) {
                /* 비어있는 셀 삽입 */
                if (
                    (i === 0 && j < first.getDay()) ||
                    cnt > pageYear[first.getMonth()]
                ) {
                    let td = document.createElement("div");
                    tr.appendChild(td);
                } else {
                    /* 날짜 삽입 */
                    let td = document.createElement("div");
                    td.textContent = cnt;
                    td.setAttribute("id", cnt);
                    tr.appendChild(td);
                    cnt++;
                }
            }
            this._$contentBody.append(tr);
        }
        this.setTitle();
    }
    removeCalendar() {
        this._$contentBody.empty();
    }
    /* 이전 달로 이동*/
    changeMonth(target) {
        let year = this._date.getFullYear(),
            month = this._date.getMonth(),
            value = target.id === "prev" ? -1 : 1;
        /* prev => 이전, next => 다음  */
        this._date = new Date(year, month + value, 1);
        this.removeCalendar();
        this.showCalendar();
    }

    setEventListener() {
        $("#prev").on("click", (e) => this.changeMonth(e.target));
        $("#next").on("click", (e) => this.changeMonth(e.target));
    }

    setTitle() {
        let month = this._date.getMonth(),
            year = this._date.getFullYear(),
            title = year + "년 " + this._config.monthList[month];
        this._$contentTitle.text(title);
    }
}

/* 실행 */
let a = new Calendar($(".main"));
