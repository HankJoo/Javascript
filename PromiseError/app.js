// fetch('https://no-such-server.blabla') // 거부
//     .then(response => response.json())
//     .catch(err => alert(err)) // TypeError: failed to fetch (출력되는 내용은 다를 수 있음)


// fetch('/article/promise-chaining/user.json')
//     .then(response => response.json())
//     .then(user => fetch(`https://api.github.com/users/${user.name}`))
//     .then(response => response.json())
//     .then(githubUser => new Promise((resolve, reject) => {
//         let img = document.createElement('img');
//         img.src = githubUser.avatar_url;
//         img.className = "promise-avatar-example";
//         document.body.append(img);
//
//         setTimeout(() => {
//             img.remove();
//             resolve(githubUser);
//         }, 3000);
//     }))
//     .catch(error => alert(error.message));

// let name = 'HankJoo';
// fetch(`https://api.github.com/users/${name}`)
//     .then(response => response.json())
//     .then(githubUser => new Promise((resolve, reject) => {
//         let img = document.createElement('img');
//         img.src = githubUser.avatar_url;
//         console.log(img.src);
//         img.className = "promise-avatar-example";
//         document.body.append(img);
//
//         setTimeout(() => {
//             img.remove();
//             resolve(githubUser);
//         }, 5000);
//     }))
//     .catch(error => alert(error.message));

// new Promise((resolve, reject) => {
//     // throw new Error("에러 발생!");    //서로 동일하다고 생각하면 된다.
//     reject(new Error("에러 발생!"));     //동일
// }).catch(alert); // Error: 에러 발생!

// new Promise((resolve, reject) => {
//     resolve("OK");
// }).then((result) => {
//     console.log(result);
//     console.log('but');
//     throw new Error("에러 발생!"); // 프라미스가 거부됨
// }).catch(alert); // Error: 에러 발생!


// // 실행 순서: catch -> then
// new Promise((resolve, reject) => {
//     throw new Error("에러 발생!"); //강제 reject
// }).catch((error) => {
//     alert("에러가 잘 처리되었습니다. 정상적으로 실행이 이어집니다.");
// }).then(() => alert("다음 핸들러가 실행됩니다."));


// 실행 순서: catch -> catch
new Promise((resolve, reject) => {
    throw new Error("에러 발생!");
}).catch(function(error) { // (*)
    if (error instanceof URIError) {
        // 에러 처리
    } else {
        alert("처리할 수 없는 에러");
        throw error; // 에러 다시 던지기
    }
}).then(function() {
    /* 여기는 실행되지 않습니다. */
}).catch(error => { // (**)
    alert(`알 수 없는 에러가 발생함: ${error}`);
    // 반환값이 없음 => 실행이 계속됨
});