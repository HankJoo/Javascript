// let promise = new Promise(function(resolve,reject) {
//     //excutoer (제작코드, '가수')
// });

// resolve(value) — 일이 성공적으로 끝난 경우 그 결과를 나타내는 value와 함께 호출
// reject(error) — 에러 발생 시 에러 객체를 나타내는 error와 함께 호출

// let promise = new Promise(function(resolve, reject) {
//     // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.
//
//     // 1초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 '완료'가 됩니다.
//     //setTimeout(() => resolve("완료"), 1000);
//     setTimeout(() => resolve(alert('3초 후 완료되었습니다.')), 3000);
// });

// let promise = new Promise(function(resolve, reject) {
//     // 1초 뒤에 에러와 함께 실행이 종료되었다는 신호를 보냅니다.
//     setTimeout(() => reject(new Error("에러 발생!")), 1000);
// });


// let promise = new Promise(function(resolve, reject) {
//     resolve("완료");
//
//     reject(new Error("…")); // 무시됨
//     setTimeout(() => resolve("…")); // 무시됨
// });


// let promise = new Promise(function(resolve, reject) {
//     // setTimeout(() => resolve("완료!"), 1000);
//     setTimeout(() => reject(new Error("에러 발생!")), 1000);
// });
//
// // resolve 함수는 .then의 첫 번째 함수(인수)를 실행합니다.
// // promise.then(
// //     result => alert(result), // 1초 후 "완료!"를 출력
// //     error => alert(error) // 실행되지 않음
// // );
//
// // .catch(f)는 promise.then(null, f)과 동일하게 작동합니다
// promise.catch(alert); // 1초 뒤 "Error: 에러 발생!" 출력

new Promise((resolve, reject) => {
    setTimeout(() => resolve("결과"), 2000)
})
    .finally(() => alert("프라미스가 준비되었습니다."))
    .then(result => alert(result)); // <-- .then에서 result를 다룰 수 있음