// 1초 후 최초 프라미스가 이행됩니다. – (*)
// 이후 첫번째 .then 핸들러가 호출됩니다. –(**)
// 2에서 반환한 값은 다음 .then 핸들러에 전달됩니다. – (***)
// 이런 과정이 계속 이어집니다.

// 초보자는 프라미스 하나에 .then을 여러 개 추가한 후, ************
// 이를 체이닝이라고 착각하는 경우가 있습니다.
// 하지만 이는 체이닝이 아닙니다.

// new Promise(function(resolve, reject) {
//
//     setTimeout(() => resolve(1), 1000); // (*)
//
// }).then(function(result) { // (**)
//
//     alert(result); // 1
//     return result * 2;
//
// }).then(function(result) { // (***)
//
//     alert(result); // 2
//     return result * 2;
//
// }).then(function(result) {
//
//     alert(result); // 4
//     return result * 2;
//
// });



// let promise = new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(1), 1000);
// });
//
// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });
//
// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });
//
// promise.then(function(result) {
//     alert(result); // 1
//     return result * 2;
// });


// new Promise(function(resolve, reject) {
//     setTimeout(() => resolve(1), 1000);
// }).then(function(result) {
//     alert(result); // 1
//     return new Promise((resolve, reject) => { // (*)
//         setTimeout(() => resolve(result * 2), 1000);
//     });
//
// }).then(function(result) { // (**)
//     alert(result); // 2
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(result * 2), 1000);
//     });
//
// }).then(function(result) {
//
//     alert(result); // 4
//
// });


// fetch와 체이닝 함께 응용하기//
// fetch('/article/promise-chaining/user.json')
//     // 원격 서버가 응답하면 .then 아래 코드가 실행됩니다.
//     .then(function(response) {
//         // response.text()는 응답 텍스트 전체가 다운로드되면
//         // 응답 텍스트를 새로운 이행 프라미스를 만들고, 이를 반환합니다.
//         return response.text();
//     })
//     .then(function(text) {
//         // 원격에서 받아온 파일의 내용
//         alert(text); // {"name": "Violet-Bora-Lee", "isAdmin": true}
//     });
//
// // 위 코드와 동일한 기능을 하지만, response.json()은 원격 서버에서 불러온 내용을 JSON으로 변경해줍니다.
// fetch('/article/promise-chaining/user.json')
//     .then(response => response.json())
//     .then(user => alert(user.name)); // Violet-Bora-Lee, 이름만 성공적으로 가져옴

// fetch('zzzz')
// .then(response => response.json())

//함수 정리..
// function loadJson(url) {
//     return fetch(url)
//         .then(response => response.json());
// }
//
// function loadGithubUser(name) {
//     return fetch(`https://api.github.com/users/${name}`)
//         .then(response => response.json());
// }
//
// function showAvatar(githubUser) {
//     return new Promise(function(resolve, reject) {
//         let img = document.createElement('img');
//         img.src = githubUser.avatar_url;
//         img.className = "promise-avatar-example";
//         document.body.append(img);
//
//         setTimeout(() => {
//             img.remove();
//             resolve(githubUser);
//         }, 3000);
//     });
// }
//
// // 함수를 이용하여 다시 동일 작업 수행
// loadJson('/article/promise-chaining/user.json')
//     .then(user => loadGithubUser(user.name))
//     .then(showAvatar)
//     .then(githubUser => alert(`Finished showing ${githubUser.name}`));
// // ...
//
//
// fetch('https://no-such-server.blabla') // 거부
//     .then(response => response.json())
//     .catch(err => alert(err)) // TypeError: failed to fetch (출력되는 내용은 다를 수 있음)

// // 실행 순서: catch -> then
// new Promise((resolve, reject) => {
//
//     throw new Error("에러 발생!");
//
// }).catch(function(error) {
//
//     alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
//
// }).then(() => alert("다음 핸들러가 실행됩니다."));


// 실행 순서: catch -> catch
new Promise((resolve, reject) => {
    throw new URIError("에러 발생!");
}).catch(function(error) { // (*)
    if (error instanceof URIError) {
        // 에러 처리
         console.log(error);
    } else {
        console.log(error);
        alert("처리할 수 없는 에러");
        throw error; // 에러 다시 던지기
    }

}).then(function() {
    /* 여기는 실행되지 않습니다. */
}).catch(error => { // (**)

    alert(`알 수 없는 에러가 발생함: ${error}`);
    // 반환값이 없음 => 실행이 계속됨

});