console.log(window.mastercode);
var data = window.mastercode;

console.log(data);

console.log(data[0]);
console.log("name : ", data[0].name);
console.clear();

try {
  const ul = document.getElementById(`find`);
  console.log("name : ", data[0].name);
  for (var x of data) {
    var li = document.createElement("li");
    li.innerHTML = x.name + "---<B>" + x.code;
  }
} catch {}
