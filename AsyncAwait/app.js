async function f1() {
    return 1;    //return Promise.resolve(1);
}

f1().then(alert); // 1

async function f2() {
    return Promise.resolve(1);
}

f2().then(alert); // 1

// await는 async 함수 안에서만 동작합니다.
let value = await promise;


async function f() {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("완료!"), 1000)
    });

    let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

    alert(result); // "완료!"
}

f();