// async function f1() {
//     return 1;
//     //return Promise.resolve(1);   //와 같다고 한다.
// }
//
// f1().then(alert); // 1
//
// async function f2() {
//     return Promise.resolve(1);
// }
//
// f2().then(alert); // 1
//
// // await는 async 함수 안에서만 동작합니다.
// let value = await promise;
//
//
//
// async function f() {
//
//     let promise = new Promise((resolve, reject) => {
//         setTimeout(() => resolve("완료!"), 1000)
//     });
//
//     let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)
//
//     alert(result); // "완료!"
// }
//
// f();

// //function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환합니다.
// async function f3() {
//     let promise = new Promise((resolve, reject) =>{
//         resolve("완료");
//     })
//
//     promise.then((result) => {alert(result);})
//     // let result = await promise;
//     // alert(result);
// }
// f3();
//
//
// function fError() {
//     let promise = Promise.resolve(1);
//      // let result = await promise; // Syntax error4
// }
//
// async function showAvatar() {
//
//     // JSON 읽기
//     // let response = await fetch('/article/promise-chaining/user.json');
//     // let user = await response.json();
//
//     let user = {
//         name : 'HankJoo'
//     }
//     // github 사용자 정보 읽기
//     let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
//     let githubUser = await githubResponse.json();
//
//     // 아바타 보여주기
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);
//
//     // 3초 대기
//     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
//
//     img.remove();
//
//     return githubUser;
// }
//
// showAvatar();
//
//
//
// // await을 이제 막 사용하기 시작한 분들은 최상위 레벨 코드(top-level code)에 await을 사용할 수 없다는 사실을 잊곤 합니다. 아래와 같은 코드는 동작하지 않습니다.
// // 무조건 async 함수 내에서만 사용할 수 있기 때문에.......async 함수를 감쌌다.
// (async () => {
//     let response = await fetch('/article/promise-chaining/user.json');
//     let user = await response.json();
// })();


class Thenable {
    constructor(num) {
        this.num = num;
    }
    then(resolve, reject) {
        alert(resolve);
        // 1000밀리초 후에 이행됨(result는 this.num*2)
        setTimeout(() => resolve(this.num * 2), 1000); // (*)
    }
};

async function f5() {
    // 1초 후, 변수 result는 2가 됨
    let result = await new Thenable(1);
    alert(result);
}

f5();
