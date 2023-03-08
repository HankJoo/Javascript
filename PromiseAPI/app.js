// Promise.all([
//     new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
//     new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
//     new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
// ]).then(alert); // 프라미스 전체가 처리되면 1, 2, 3이 반환됩니다. 각 프라미스는 배열을 구성하는 요소가 됩니다.
//
//
// let urls = [
//     'https://api.github.com/users/iliakan',
//     'https://api.github.com/users/Violet-Bora-Lee',
//     'https://api.github.com/users/jeresig'
// ];
//
// // fetch를 사용해 url을 프라미스로 매핑합니다.
// let requests = urls.map(url => fetch(url));
//
// // Promise.all은 모든 작업이 이행될 때까지 기다립니다.
// Promise.all(requests)
//     .then(responses => responses.forEach(
//         response => alert(`${response.url}: ${response.status}`)
//     ));


// let names = ['iliakan', 'Violet-Bora-Lee', 'jeresig'];
//
// let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));
//
// Promise.all(requests)
//     .then(responses => {
//         // 모든 응답이 성공적으로 이행되었습니다.
//         for(let response of responses) {
//             alert(`${response.url}: ${response.status}`); // 모든 url의 응답코드가 200입니다.
//         }
//         return responses;
//     })
//     // 응답 메시지가 담긴 배열을 response.json()로 매핑해, 내용을 읽습니다.
//     .then(responses => Promise.all(responses.map(r => r.json())))
//     // JSON 형태의 응답 메시지는 파싱 되어 배열 'users'에 저장됩니다.
//     .then(users => users.forEach(user => alert(user.name)));


// Promise.all([
//     new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
//     new Promise((resolve, reject) => setTimeout(() => reject(new Error("에러 발생!")), 2000)),
//     new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
// ]).catch(alert); // Error: 에러 발생!

let urls = [
    'https://api.github.com/users/iliakan',
    'https://api.github.com/users/Violet-Bora-Lee',
    'https://no-such-url'
];

Promise.allSettled(urls.map(url => fetch(url)))
    .then(results => { // (*)
        results.forEach((result, num) => {
            if (result.status == "fulfilled") {
                alert(`${urls[num]}: ${result.value.status}`);
            }
            if (result.status == "rejected") {
                alert(`${urls[num]}: ${result.reason}`);
            }
        });
    });


if(!Promise.allSettled) {
    Promise.allSettled = function(promises) {
        return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
            status: 'fulfilled',
            value
        }), reason => ({
            status: 'rejected',
            reason
        }))));
    };
}