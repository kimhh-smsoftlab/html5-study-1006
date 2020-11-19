$(document).ready(function () {
    /* 기본 화면 초기화 */
    let themeBtn = $("button[data-set-theme]"),
        theme = $(this.documentElement).attr("data-theme");
    themeBtn.text(theme + " Mode").attr("data-set-theme", theme);

    /* select2 기능 구현 */
    let data = window.mastercode,
        /* json데이터 중 목록에 들어갈 데이터만 추출 */
        replaceArr = function (data, key) {
            return Array.from(data).map(function (obj, idx) {
                return { id: idx, text: obj[key] };
            });
        };
    $(".test-select").select2({
        placeholder: "Select an option",
        width: "100%",
        data: replaceArr(data, "name"),
    });
});

$(document).on("click", function (e) {
    let target = $(e.target);
    if (target.dataset["setTheme"]) {
        let newTheme = target.dataset["setTheme"];
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
            $(this.documentElement).attr("data-theme", newTheme);
            localStorage.theme = newTheme;
        }
    } else if (target.dataset["setLang"]) {
        $(".dropdown-content").toggle();
    } else if (target.dataset["country"]) {
        let value = target.dataset["country"];
        if (document.webL10n) document.webL10n.setLanguage(value);
        $("[data-set-lang]>img").attr("src", `/img/${value}.png`);
        $(".dropdown-content").toggle();
    }
});
