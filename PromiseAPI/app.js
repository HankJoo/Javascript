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

// Promise 클래스에는 5가지 정적 메서드가 있습니다.
// Promise.all(promises) – 모든 프라미스가 이행될 때까지 기다렸다가 그 결과값을 담은 배열을 반환합니다.
// 주어진 프라미스 중 하나라도 실패하면 Promise.all는 거부되고, 나머지 프라미스의 결과는 무시됩니다.
// Promise.allSettled(promises) – 최근에 추가된 메서드로 모든 프라미스가 처리될 때까지 기다렸다가
// 그 결과(객체)를 담은 배열을 반환합니다.
// 객체엔 다음과 같은 정보가 담깁니다.   ****status: "fulfilled" 또는 "rejected"******
// value(프라미스가 성공한 경우) 또는 reason(프라미스가 실패한 경우)

// 응답이 성공할 경우 – {status:"fulfilled", value:result}
// 에러가 발생한 경우 – {status:"rejected",  reason:error}

// Promise.race(promises) – 가장 먼저 처리된 프라미스의 결과 또는 에러를 담은 프라미스를 반환합니다.
// Promise.resolve(value) – 주어진 값을 사용해 이행 상태의 프라미스를 만듭니다.
// Promise.reject(error) – 주어진 에러를 사용해 거부 상태의 프라미스를 만듭니다.


function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`${src}를 불러오는 도중에 에러가 발생함`));

    document.head.append(script);
}

// 사용법:
//  loadScript('path/script.js', (err, script) => {...})


let loadScriptPromise = function(src) {
    return new Promise((resolve, reject) => {
        loadScript(src, (err, script) => {
            if (err) reject(err)
            else resolve(script);
        });
    })
}

// 사용법:
// loadScriptPromise('path/script.js').then(...)

function promisify(f) {
    return function (...args) { // 래퍼 함수를 반환함
        return new Promise((resolve, reject) => {
            function callback(err, result) { // f에 사용할 커스텀 콜백
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }

            args.push(callback); // 위에서 만든 커스텀 콜백을 함수 f의 인수 끝에 추가합니다.

            f.call(this, ...args); // 기존 함수를 호출합니다.
        });
    };
};

// 사용법:
let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);


// 콜백의 성공 결과를 담은 배열을 얻게 해주는 promisify(f, true)
function promisify(f, manyArgs = false) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            function callback(err, ...results) { // f에 사용할 커스텀 콜백
                if (err) {
                    reject(err);
                } else {
                    // manyArgs가 구체적으로 명시되었다면, 콜백의 성공 케이스와 함께 이행 상태가 됩니다.
                    resolve(manyArgs ? results : results[0]);
                }
            }

            args.push(callback);

            f.call(this, ...args);
        });
    };
};

// 사용법:
f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...)