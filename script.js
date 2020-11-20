/* 함수 */
//날짜를 받고 해당하는 날짜에 링크를 연결한다.
function inProject(month, day) {
    // day : string
    let today = month + day;
    let days = document.querySelector(".day_" + today); //`.day_${today}`
    days.className += " in_project";
    days.setAttribute(
        "href",
        "/project/" + month + "/" + today + "/" + today + "_main.html"
    ); //`/project/${month}/${today}/${today}_main.html`
}

/* 실행 */
inProject("10", "20");
inProject("10", "21");
inProject("10", "22");
inProject("10", "22");
inProject("10", "23");
inProject("10", "26");
inProject("10", "27");
inProject("10", "28");
inProject("10", "29");
inProject("10", "30");
inProject("11", "02");
inProject("11", "03");
inProject("11", "04");
inProject("11", "05");
inProject("11", "06");
inProject("11", "09");
inProject("11", "10");
inProject("11", "11");
inProject("11", "13");
inProject("11", "16");
inProject("11", "17");
inProject("11", "18");
inProject("11", "19");
inProject("11", "20");

let calendar = new Calendar($("#calendar-content"));
