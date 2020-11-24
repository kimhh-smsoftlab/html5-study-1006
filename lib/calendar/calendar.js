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
        config.solarHolidays = [
            { day: "1.1", value: "새해" },
            { day: "3.1", value: "삼일절" },
            { day: "4.30", value: "부처님 오신 날" },
            { day: "5.5", value: "어린이날" },
            { day: "6.6", value: "현충일" },
            { day: "8.15", value: "광복절" },
            { day: "10.3", value: "개천절" },
            { day: "10.9", value: "한글날" },
            { day: "12.25", value: "크리스마스" },
        ];

        this.setEventListener();
        this.createCalendar();
        this.initSelect();
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
                                            <button id="reset">새로고침</button>
                                        </div>
                                    <div>
                                        
                                        <div class="txt-rt">
                                            <label id="prev"> < </label>
                                        </div>
                                        <div id="current-year-month">Title</div>
                                        <div class="txt-lt">
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

    get item() {
        let newElem = document.createElement("div");
        newElem.innerHTML = `<div>
            <div class="day-txt"></div>
            <ul class='content-list'></ul>
        </div>`;
        return newElem.firstElementChild;
    }

    get pageYear() {
        return this._date.getFullYear() % 4 === 0
            ? this._config.leapYear
            : this._config.notLeapYear;
    }

    get year() {
        return this._date.getFullYear();
    }

    get month() {
        return this._date.getMonth();
    }

    //////초기화/////
    /* calendar 뼈대 생성 */
    createCalendar() {
        let i, j, tr, td;
        for (i = 0; i < 6; i++) {
            tr = document.createElement("div");
            tr.setAttribute("class", `tr-${i}`);
            /* 7개 열 */
            for (j = 0; j < 7; j++) {
                td = this.item;
                td.setAttribute("class", `td-${j}`);
                tr.appendChild(td);
            }
            this._$contentBody.append(tr);
        }
    }
    /* select init */
    initSelect() {
        let yearEl = this._elem.querySelector("#year"),
            monthEl = this._elem.querySelector("#month"),
            i;

        for (i = 1980; i <= 2040; i++) {
            yearEl.options[i - 1980] = new Option(i + " 년", i);
        }

        for (i = 0; i < 12; i++) {
            monthEl.options[i] = new Option(i + 1 + " 월", i);
        }
    }

    ////// 날짜 삽입 //////
    /* 화면에 날짜 및 리스트 그리기 */
    setText() {
        let row,
            column,
            day = this._date.getDay(),
            cnt = 1,
            pageYear = this.pageYear,
            holiday,
            src,
            id;
        for (row = 0; row < 6; row++) {
            for (column = 0; column < 7; column++) {
                let $dayEl = $(`.tr-${row} .td-${column}`);

                /* 비어있는 셀 설정 */
                if ((row === 0 && column < day) || cnt > pageYear[this.month]) {
                    this.emptyItem($dayEl);
                } else {
                    /* 날짜 설정 */
                    this.insertNumber($dayEl, cnt);

                    /* 공휴일 설정 */
                    holiday = this.checkHoliday(
                        this.month + 1,
                        cnt,
                        this._config.solarHolidays
                    );

                    /* 프로젝트 src 유무 확인 */
                    id = `${this.year}-${this.month + 1}-${cnt}`;
                    src = this.checkSrc(id, srcData);
                    this.updateItem($dayEl, holiday, src);
                    cnt++;
                }
            }
        }
        this.setTitle();
        this.setSelect();
    }

    emptyItem($item) {
        $item.removeAttr("data-item").removeAttr("data-project");
        $item.find(".day-txt").text("");
        $item.find(".content-list").text("");
    }

    insertNumber($item, number) {
        $item.attr("data-item", "");
        $item.find(".day-txt").text(number);
    }

    updateItem($item, holiday, src) {
        //기본적으로 업데이트를 할 때 기존의 내용들을 다 없애야 한다.
        let $ul = $item.find(".content-list");
        $ul.empty();
        $item.removeAttr("data-holiday");
        if (src) {
            let srcEl = document.createElement("li");
            srcEl.textContent = "project";
            this.setClickListener($item, srcEl);
            $ul.attr("data-project", "");
            $ul.append(srcEl);
        }

        if (holiday) {
            let holidayEl = document.createElement("li");
            holidayEl.textContent = holiday.value;
            $item.attr("data-holiday", "");
            $ul.append(holidayEl);
        }
    }

    /* 데이터 목록에 id값이 있는지 체크 */
    checkSrc(id, data) {
        return data.find((obj) => obj.id === id);
    }

    checkHoliday(month, day, data) {
        let holiday = `${month}.${day}`;
        return data.find((obj) => obj.day === holiday);
    }

    setTitle() {
        let title = this.year + "년 " + this._config.monthList[this.month];
        this._$contentTitle.text(title);
    }
    /* setSelect */
    setSelect() {
        let yearEl = this._elem.querySelector("#year"),
            monthEl = this._elem.querySelector("#month");
        yearEl.options[this.year - 1980].selected = "selected";
        monthEl.options[this.month].selected = "selected";
    }

    ////// 리스너 설정 //////
    /* src 클릭 */
    setClickListener($item, srcEl) {
        srcEl.addEventListener("click", this.onItemClick.bind(this, $item));
    }

    setEventListener() {
        $("#prev").on("click", (e) => this.changeMonth(e.target));
        $("#next").on("click", (e) => this.changeMonth(e.target));
        $("#year").on("change", (e) => this.onSelectChange(e.target));
        $("#month").on("change", (e) => this.onSelectChange(e.target));
        $("#reset").on("click", (e) => this.onReset());
    }

    /////이벤트///////
    /* 이전,다음 달로 이동*/
    changeMonth(target) {
        let value = target.id === "prev" ? -1 : 1;
        /* prev => 이전, next => 다음  */
        this._date = new Date(this.year, this.month + value, 1);
        this.setText();
    }

    /* 아이템 클릭  */
    onItemClick($item, e) {
        let day = $item.find(".day-txt").text(),
            srcdata = this._srcData.find(function (obj) {
                return obj.id == `${this.year}-${this.month + 1}-${day}`;
            }, this);
        window.location.href = srcdata.src;
    }

    /* select 변경 */
    onSelectChange(target) {
        let year = this.year,
            month = this.month;
        if (target.id == "year") {
            year = target.value;
        } else {
            month = target.value;
        }
        this._date = new Date(year, month, 1);
        this.setText();
    }

    /* 리셋 */
    onReset() {
        let today = new Date();
        this._date = new Date(today.getFullYear(), today.getMonth(), 1);
        this.setText();
    }
}

lunaHolidays = [];
