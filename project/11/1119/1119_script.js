$(document).ready(function () {
    let data = window.mastercode,
        /* 기본 화면 초기화 */
        $themeBtn = $("button[data-set-theme]"),
        theme = $(this.documentElement).attr("data-theme");
    $themeBtn.text(theme + " Mode").attr("data-set-theme", theme);

    /* select2 기능 구현 */
    $(".test-select").select2({
        placeholder: "Select an option",
        width: "80%",
        data: replaceArr(data, ["name", "code", "csname"]),
        matcher: matchCustom,
        templateResult: formatState,
    });

    /* json데이터 중 목록에 들어갈 데이터만 추출 */
    function replaceArr(data, config) {
        return Array.from(data).map(function (obj, idx) {
            let a = {};
            a.id = idx;
            a.text = obj.name;
            config.forEach(function (option) {
                a[option] = obj[option];
            });
            return a;
        });
    }
    /* 초성 검색기능 추가 */
    function matchCustom(params, data) {
        // 검색어가 없을 경우 전부 표시
        if ($.trim(params.term) === "") {
            return data;
        }
        // data.text가 없으면 표시 안함
        if (typeof data.name === "undefined") {
            return null;
        }
        /* 초성 검색 및 검색어 비교 */
        let search = params.term.toUpperCase(),
            Dsearch = Hangul.disassemble(search).join(""),
            original = data.name.toUpperCase();
        code = data.code;
        if (
            data.csname.includes(Dsearch) ||
            original.includes(search) ||
            code.includes(search)
        ) {
            //return시 데이터의 text를 변형시켜 표현 가능
            return data;
        }
        // null을 리턴할 경우 표시되지 않는다.
        return null;
    }

    function formatState(state) {
        if (!state.id) {
            return state.text;
        }
        let $state = $(
            `<div class="flex_row">
                <div>${state.name}</div>
                <div>${state.code}</div>
            </div>`
        );
        return $state;
    }
});

/* 클릭 이벤트 */
$(document).on("click", function (e) {
    let $target = $(e.target);
    if ((newTheme = $target.attr("data-set-theme"))) {
        newTheme = newTheme == "Dark" ? "Light" : "Dark";
        $target.attr("data-set-theme", newTheme).text(`${newTheme} Mode`);
        $(this.documentElement).attr("data-theme", newTheme);
        localStorage.theme = newTheme;
    } else if ($target.attr("data-set-lang")) {
        $(".dropdown-content").slideToggle(500);
    } else if ((country = $target.attr("data-country"))) {
        if (document.webL10n) document.webL10n.setLanguage(country);
        $("[data-set-lang]>img").attr("src", `/img/${country}.png`);
        $(".dropdown-content").slideToggle(500);
    }
});
