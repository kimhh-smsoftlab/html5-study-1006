var data = window.mastercode;

console.log(data[0]);
console.log("name : ", data[0].name);

//li항목을 생성하여 ul에 append
const ul = document.getElementById(`find`);
for (var x of data) {
  var li = document.createElement("li");
  li.innerHTML = x.name + "---<B>" + x.code;
  ul.appendChild(li);
}

var a = data[0].code;
var b = data[1].code;

console.log("a ===>", a); // '000020'
console.log("b ===>", b); // '000040'

var c = a + b;
console.log("c = a+b ===> ", c); //a와 b가 string타입으로 000020000040' 으로 출력된다.
console.log("a.length ===>", a.length);
console.log("c.length ===>", c.length);

var d = "abc";
var e = new String("abc");

console.log("d ===>", d);
console.log("e ===>", e);
//d, e 타입 출력
console.log("typeof d ===>", typeof d);
console.log("typeof e ===>", typeof e);

console.log("d == e ===>", d == e); //타입이 다르지만 내용이 같으므로 true 반환
console.log("d === e ===>", d === e); //타입이 string 과 object이므로 false 반환

var f = new String("abc"); //두 개의 오브젝트
var g = new String("abc");

console.log("f ===>", f);
console.log("g ===>", g);

console.log("typeof f ===>", typeof f);
console.log("typeof g ===>", typeof g);

console.log("f == g ===>", f == g); //서로 다른 레퍼런스를 가리키고 있기 때문에 false 반환
console.log("f === g ===>", f === g);

var h = f;
console.log("h = f ===>", f);

console.log("f == h ===>", f == h); //서로 같은 레퍼런스를 가리키고 있기 때문에 true 반환
console.log("f === h ===>", f === h);

//String 타입 메소드
//indexOf(), lastIndexOf
var str = "abc def ghi jkl mno pqr stu vwx yzj";
var pos = str.indexOf("j"); //j의 인덱스
var pos2 = str.lastIndexOf("j"); //마지막 j 인덱스
console.log("str ===>", str);
console.log("str.length ===>", str.length);
console.log("indexOf('j') ===> ", pos);
console.log("lastIndexOf('j') ===> ", pos2);

//search()
var str = "abc def ghi jkl mno pqr stu vwx yzj";
var pos = str.search("j");
console.log("search('j') ===> ", pos);

//Number 타입
var x = 999999999999999;
var y = 9999999999999999; //정수는 최대 15자리까지 정확

console.log("x ===> ", x);
console.log("y ===> ", y);

var x = 10;
var y = 20;
var z = x + y;
console.log("x ===>", x);
console.log("y ===>", y);
console.log("z ===>", z);

var x = "10";
var y = "20";
var z = x + y;
console.log("x ===>", x);
console.log("y ===>", y);
console.log("z ===>", z);

var x = 10;
var y = 20;
var z = "30";
result = x + y + z;

console.log("x ===>", x, typeof x);
console.log("y ===>", y, typeof y);
console.log("z ===>", z, typeof z);
console.log("result ===>", result);

var x = 500; //Number
var y = "500"; //String
var z = new Number(500); //Object

console.log("x ===>", x, typeof x);
console.log("y ===>", y, typeof y);
console.log("z ===>", z, typeof z);
//true 반환
console.log("x==y ===>", x == y);
console.log("y==z ===>", y == z);
console.log("x==z ===>", x == z);
//flase 반환
console.log("x===y ===>", x === y);
console.log("y===z ===>", y === z);
console.log("x===z ===>", x === z);
//toString()

var x = 123;
console.log("x ===>", x, typeof x);
var y = x.toString();
console.log("y ===>", y, typeof y);
var z = (123).toString();
console.log("z ===>", z, typeof z);

//Number()
console.log("Number(true) ===>", Number(true));
console.log("Number(false) ===>", Number(false));
console.log("Number('10') ===>", Number("10"));
console.log("Number('10 11') ===>", Number("10 11"));
console.log("Number('    10') ===>", Number("    10"));
console.log("Number('10.33') ===>", Number("10.33"));
console.log("Number('a') ===>", Number("a"));
//parseFloat() parseInt()
console.log("parseInt(true) ===>", parseInt(true));
console.log("parseInt('10') ===>", parseInt("10"));
console.log("parseInt('10.33') ===>", parseInt("10.33"));
console.log("parseInt('10 20 30') ===>", parseInt("10 20 30"));
console.log("parseInt('10 year') ===>", parseInt("10 year"));
console.log("parseInt('year 10') ===>", parseInt("year 10"));
//MIN_VALUE, MAX_VALUE
console.log("Number.MAX_VALUE ===>", Number.MAX_VALUE);
console.log("Number.MIN_VALUE ===>", Number.MIN_VALUE);

//배열
var arr1 = ["a", "b", "c"];
console.log("arr1 ===>", arr1);
console.log("arr1[0] ===>", arr1[0]);
console.log("arr1[1] ===>", arr1[1]);
console.log("arr1[2] ===>", arr1[2]);
console.log("arr1[3] ===>", arr1[3]);
arr1[0] = "z";
console.log("change arr1[0] ===>", arr1[0]);

//배열에 object 넣기
var arr2 = [];
var item = data[0];
arr2 = [item.name, item.code, item.csname, item.mktgbcd];
console.log("arr2 ===>", arr2);

//배열 메소드
