let data = window.mastercode;
// slice 배열원 원하는 길이만큼 자를 수 있다. 
let arr1, arr2, arr3;
console.log(arr1 = data.slice(10));
console.log(arr2 = data.slice(5,15));

// concat 배열을 이어 붙인다.
console.log(arr3 = arr1.concat(arr2));

// find  배열에서 객체 찾기
// find() 함수는 callback 함수에 정의된 조건에 부합하는 배열의 첫 번째 값을 리턴
let result = data.find(element => element.rank === 5);
console.log(result);

function findAXA(str){ 
    console.log(1);
    return str.company === 'AXA';
}

result = data.find(findAXA);
console.log(result);

// filter() 함수는 특정 조건에 부합하는 배열의 모든 값을 배열 형태로 리턴
console.log(arr3);
console.log(arr3.filter(element => element.rank === 11));


//findindex 배열에서 특정 값의 위치 찾기 배열에서 조건에 맞는 값의 첫번째 index를 리턴하는 함수
//파라미터로 사용자가 정의할 수 있는 callback 함수를 받는다. -> object타입
console.log(arr3.findIndex(element => element.rank == 15)) // -> 4

//indexOf() 배열 안에서 찾으려는 값과 정확하게 일치(===)하는  '첫번째' element의 index를 리턴
//파라미터로 primitive type - 기본 타입의 데이터를 받는다. 
const arr = [1,1,'1',1];
console.log(arr.indexOf(1))
console.log(arr.indexOf('1'))
console.log(arr.indexOf(1,2))
console.log(arr.indexOf(0))

//lastIndexOf()배열 안에서 찾으려는 값과 정확하게 일치(===)하는  '마지막' element의 index를 리턴
console.log(arr.lastIndexOf(1));
console.log(arr.lastIndexOf('1'));
console.log(arr.lastIndexOf(1,2));
console.log(arr.lastIndexOf(0));

//3. forEach -> callback함수 사용
data.forEach(element => console.log(element));

// 4. map callback 함수가 return 하는 값으로 새로운 배열을 만들어서 리턴
arr4 = arr3.map(element => element.rank +10);
console.log(arr4);


// 5. splice = 배열의 인덱스를 활용하여 데이터를 추가하거나 삭제한다. 
//배열에서 랭크가 11인 객체를 찾아서 삭제
let del_arr = arr3.splice(arr3.findIndex(element => element.rank === 11),1);
console.log(del_arr);
console.log(arr3);


// 6. pop 배열에서 마지막 요소를 제거하고 그 요소를 반환한다.
console.log(arr3);
console.log(arr3.pop());
console.log(arr3);

// 7. push 배열의 끝에 하나 이상의 요소를 추가하고 배열의 새로운 길이를 반환한다. 
let total = data.push({rank:21, company:'HH', revenues:489743, profits: 54315})
console.log(data)
console.log(total)

// 8. unshift 새로운 요소를 배열의 맨 앞쪽에 추가하고, 새로운 길이를 반환한다.
data.unshift({rank:-1, company:'HH', revenues:489743, profits: 54315})
console.log(data)

// 9. keys 배열의 각 인덱스를 키 값으로 가지는 새루온 배열을 반환

arr5 = ['a','b','c','d'];
let iterator = arr5.keys();
for(let x of arr5){
    console.log(x);
}


