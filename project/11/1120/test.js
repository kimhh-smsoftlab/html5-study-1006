let users = [
    { id: 1, name: "John", age: 25, occupation: "gardener" },
    { id: 2, name: "Lenny", age: 51, occupation: "programmer" },
    { id: 3, name: "Andrew", age: 43, occupation: "teacher" },
    { id: 4, name: "Peter", age: 52, occupation: "gardener" },
    { id: 5, name: "Anna", age: 43, occupation: "teacher" },
    { id: 6, name: "Albert", age: 46, occupation: "programmer" },
    { id: 7, name: "Adam", age: 47, occupation: "teacher" },
    { id: 8, name: "Robert", age: 32, occupation: "driver" },
];

function aa(arr) {
    let a = {},
        temp;
    arr.forEach(function (obj) {
        temp = obj.id;
        delete obj.id;
        a[temp] = obj;
    });
    return a;
}

/**
 * @param {object []} arObjects users 데이터
 * @param {string} prop object의 키 값으로 사용할 속성
 * @return {object} 변환된 object 객체
 */
function changeObj(arObjects, prop) {
    prop = prop || "id";
    let key;
    return copyObjs.reduce(function (newObj, nextObj) {
        key = nextObj[prop];
        delete nextObj[prop];
        newObj[key] = nextObj;
        return newObj;
    }, {}); // 빈 객체 초기화
}

/**
 * @param {object []} arObjects users 데이터
 * @param {string} prop object의 키 값으로 사용할 속성
 * @return {object} 변환된 object 객체
 */
function changeObj2(arObjects, prop) {
    prop = prop || "id";
    let key;
    return arObjects.reduce(function (newObj, { id, ...nextObj }) {
        return { ...newObj, [id]: nextObj };
    }, {}); // 빈 객체 초기화
}

function ab(a, { pq_dd }) {
    console.log(a, pq_dd);
}

ab({ a: "1" }, { pq_dd: "dd", pq_cc: "cc" });

let users = [
    { name: "John", age: 25, occupation: "gardener" },
    { name: "Lenny", age: 51, occupation: "programmer" },
    { name: "Andrew", age: 43, occupation: "teacher" },
    { name: "Peter", age: 52, occupation: "gardener" },
    { name: "Anna", age: 43, occupation: "teacher" },
    { name: "Albert", age: 46, occupation: "programmer" },
    { name: "Adam", age: 47, occupation: "teacher" },
    { name: "Robert", age: 32, occupation: "driver" },
];

/**
 * @param {object []} arObjects users 데이터
 * @param {string} prop 분류할 속성
 * @return {object} 변환된 object 객체
 */
function changeObj(arObjects, prop) {
    return arObjects.reduce(function (newObj, nextObj) {
        let key = nextObj[prop];
        !newObj[key] && (newObj[key] = []);
        newObj[key].push(nextObj);
        return newObj;
    }, {});
}

let result = changeObj(users, "occupation");
