var days;

inProject(20);
//달력에 프로젝트를 삽입
function inProject(day) {
  // 해당 일자에 해당되는 숫자
  days = document.getElementsByClassName(`day_${day}`);
  days.forEach(element => console.log(element));
}
