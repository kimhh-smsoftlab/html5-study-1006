console.log(window.mastercode);
var data = window.mastercode;
const ul;
console.log(data);

console.log(data[0]);
console.log("name : ", data[0].name);
console.clear();

ul = document.getElementById(`find`);
console.log("name : ", data[0].name);
for (var x of data) {
  var li = document.createElement("li");
  li.textContent = x.name + "---<B>" + x.code;
}
