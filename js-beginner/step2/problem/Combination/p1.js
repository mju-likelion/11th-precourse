// users 배열을 만드세요.
// users 배열 안에는 user 객체가 있습니다.
// user 객체는 { id: string, pw: string, postCount: number, signupDate: string } 으로 되어있습니다.

/*
    다음의 user 객체를 users에 추가하세요.
    
    unique: 1,
    id: 'imFirst',
    pw: '1234',
    postCount: 100,
    signupDate: '2022-01-01'

    unique: 2,
    id: 'test2',
    pw '12345',
    postCount: 177,
    signupDate: '2023-05-05',

    unique: 3,
    id: 'hello3',
    pw: 'hello@',
    postCount: 0,
    signupDate: '2023-02-03',

    unique: 4,
    id: 'grizz',
    pw: '1q2w3e4r'
    postCount: 3,
    signupDate: '2021-12-05',
*/

// id가 'imFirst'인 객체를 찾아서 출력하세요
// find 함수를 이용하세요

// postCount가 100개 이상인 유저의 id를 배열에 담아 출력하세요
// filter를 이용하세요.

// 가입일이 2022년 이하인 유저의 id와 signupDate를 객체로 만들어 배열에 담아 출력하세요
// map을 이용하세요.
// ex)
// [
//     {id: ~, signupDate: ~}
//     {id: ~, signupDate: ~}
// ]

// id가 'grizz'인 유저의 postCount를 5로 변경하세요.
// forEach를 이용하세요.

// id가 'grizz'인 유저를 삭제한 새로운 newUser 배열을 만드세요.
// 이때, user 배열에는 'grizz' 유저는 그대로 있어야합니다.

// pw는 숫자와 문자가 혼합되어야합니다. pw가 숫자만으로 되어있거나 문자만으로 되어있는 유저 리스트를 배열로 만드세요
// 특수문자는 문자로 취급합니다.

// 모든 유저에 scores 프로퍼티를 추가하세요.
// scores의 배열의 내용은 첫 번째 유저라면 [1]을, 두 번째 유저라면 [1,2]를 세 번째 유저라면 [1,2,3]을 추가하세요
