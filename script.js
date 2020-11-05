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

//날짜를 받고 해당하는 날짜에 링크를 연결한다.
function inProject(month, day) {
    // day : string
    let today = month + day,
        days = document.getElementsByClassName(`day_${today}`);

    Array.from(days).forEach((element) => {
        element.className += " in_project";
        element.setAttribute(
            "href",
            `/project/${month}/${today}/${today}_main.html`
        );
    });
}
