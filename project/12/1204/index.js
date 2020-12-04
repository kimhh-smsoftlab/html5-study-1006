/* 정규식
    1.정규식 리터럴 
    var reg = /ab+c/

    2.정규식 생성자 RegExp 객체
    RegExp(pattern, flags)
    flags에는 g, i, m, s, y, u 문자열을 받을 수 있다.

    1. g: 문자열 전체를 확인한다.
    2. i: 문자열에서 대소문자를 구분하지 않는다.
    3. m: 문자열에서 ' ^ ', ' $ '에서 개행문자를 허용한다.
    4. s: 문자열에서 '.' 에서 개행문자를 허용한다.
    5. y: lastIndex부터 일치하는 문자열을 반환한다.
    6. u: Unicode 코드 포인트의 시퀀스로 처리한다. 

    3. 특수문자 */

//////////////////////////////////////////////////////////
// ' \ '
// 1) 일반 문자가 올 때
//  해당 문자는 특별하고, 문자 그대로 해석되면 안된다

var reg = /t/,
    result = reg.exec("abcdefghijklmnopqrstuvwxyz");
// console.log(result);
// ["t", index: 19, input: "abcdefghijklmnopqrstuvwxyz"]

/* 학습이 더 필요함  */
reg = /\t/;
result = reg.exec("abcdefghijklmnopqrstuvwxyz");
//console.log(result);
// null

/* ' \ ' => 2. 특수 문자가 올 때
    특수 문자를 문자 그대로 해석하도록 
    /a* / 에서 * 는 0개 이상의 ' a ' 문자가 등장함을 나타낸다. 
    /a\* / 에서는 ' a* '와 같은 문자열과 대응 될 수 있다. */
reg = /ca*r/;
result = reg.exec("caaaaar ca*r");
console.log(result);

reg = /ca\*r/;
result = reg.exec("caaaaar ca*r");
console.log(result);

//////////////////////////////////////////////////////
/* ' ^ ' 특수문자 */

/* 3. RegExp 메소드
      1. exec(): 매칭된 문자열을 찾기 위환 메소드
        매칭된 문자열이 있다면 매칭된 값의 배열을 리턴, 없다면 null 리턴 */
debugger;
var myRe = /d(b+)d/g;
var myArray = myRe.exec("cdbbdbsbz");
console.log(myArray);

/*
      2. test(): 매칭된 문자열이 있는지 확인하기 위환 메소드
        매칭된 문자열이 있다면 true 리턴, 없다면 false 리턴
      3. toString(): 문자값을 정규 표현식으로 반환

    String 메소드
      1. replace(): 일치하는 문자열을 찾는 String 메소드. 

      2. match()

    DOT(.)
        정규표현식에서 점(.)은 모든 문자열을 나타냅니다. (단 줄바꿈 \n은 제외)
        a + 모든문자 + b 는 다음과 같이 표현할 수 있다 => (a.b)
            a와 b 사이에는 모든 문자가 포함된 것을 매치시킨다.day-txt
    반복(*), 반복(+), 반복고정({m, n},?)
        ca*r 에서 반복의 의미는 a가 0번부터 무한대 까지 반복하는 모든 문자열을 찾아준다.
            => cr, car, caar, caaar ...
        + 는 최소 1개 이상부터 반복하는 것을 의미
            => car, caar, caaar ...
        {m, n}일 경우 반복횟수가 m부터 n인 것을 매치 시킨다. 둘 중 하나의 값만 사용해도 가능
            ca{2}r일 경우 => caar을 매치
            ca{2,6}r일 경우 caar, caaar, caaaar, caaaaar, caaaaaar 매치
        ?는 {0, 1}과 같아서 문자열이 있거나 없는 것을 찾아준다. 
*/

/* 특수문자
    ' \ '
        1. 뒤에 특수문자가 오는 경우: 
        2. 일반 문자가 오는 경우: 

    ' ^ ': {

    }
*/
debugger;
var reg = new RegExp(/test2/g);
console.log(reg);

debugger;
reg = new RegExp(/test2/g, "i");
console.log(reg);

debugger;
reg = new RegExp("abc", "gimsuy");
console.log(reg);

debugger;
/* console.dir => 객체의 속성을 콘솔에서 확인 가능 */
console.dir(reg);

debugger;
var text = `12
34
56`;
var req = new RegExp(/..../);
console.log(req.exec(text));
// null

debugger;
var dotAll = new RegExp(/..../, "s");
console.log(dotAll.exec(text));
// ["12↵3", index: 0, input: "12↵34↵56", groups: undefined]
