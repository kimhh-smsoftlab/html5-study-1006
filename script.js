

inProject('1020');
inProject('1021');
inProject('1022');
inProject('1022');
inProject('1023');
inProject('1026');
inProject('1027');

//날짜를 받고 해당하는 날짜에 링크를 연결한다.
function inProject(day) { // day : string
  let days = document.getElementsByClassName(`day_${day}`);
  Array.from(days).forEach(element => {
    element.className += " in_project";
    element.setAttribute('href', `/project/${day}/${day}_main.html`);
  }); 
}

