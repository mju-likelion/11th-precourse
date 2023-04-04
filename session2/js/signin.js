const formEl = document.querySelector('#loginForm');
const idEl = document.querySelector('#idInput');
const passwordEl = document.querySelector('#passwordInput');

/**
 * @param {string} id
 * @param {string} password
 */
const checkLogin = (id, password) => {
  // localStorage는 반드시 string으로 저장해야합니다.
  // 따라서 localStorage에 있는 값을 받아오면 string형식으로 받아오게되므로 이를 JSON 형태로 바꿔주어야합니다.
  const userList = localStorage.getItem('userList');
  const convertToJson = JSON.parse(userList);

  // includes로 하면 정보가 일치하는 유저를 찾을 수 없습니다. 왜일까요?
  // includes를 꼭 쓰고싶다면 어떤 방법을 써서 비교해야할까요 ?
  const coinciedUser = convertToJson.find(
    (user) => user.id === id && user.password === password
  );

  return coinciedUser ? true : false;
};

const isLogined = () => {
  return localStorage.getItem('login') ? true : false;
};

// init이라는 함수를 작성한 이유는?
const init = () => {
  if (isLogined()) {
    alert('이미 로그인되어있습니다!');
    location.href = './index.html';
    return;
  }

  // JS의 일급 객체 특성을 이용해 파라미터에 함수를 전달할 수 있습니다!
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const isSuccess = checkLogin(idEl.value, passwordEl.value);

    if (isSuccess) {
      alert('성공!');
      localStorage.setItem('login', JSON.stringify(idEl.value));
      location.href = './index.html';
    } else {
      alert('실패!');
      idEl.value = '';
      passwordEl.value = '';
    }
  });
};

document.addEventListener('DOMContentLoaded', init);
