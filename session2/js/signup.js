const formEl = document.querySelector('#signupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');

/** @param {string} newUserId */
const isUserExist = (newUserId) => {
  // 여기선 우리가 입력한 정보를 '객체'로 받아서 로직을 짜보겠습니다.
  const users = localStorage.getItem('userList');

  // 등록된 유저가 없다면 바로 리턴
  if (!users) return false;

  const convertedUsers = JSON.parse(users);
  const getExistUser = convertedUsers.find((user) => user.id === newUserId);

  return getExistUser ? true : false;
};

/** @param {{id: string, password: string}} userInfo */
const registerUser = (userInfo) => {
  const currentUsers = JSON.parse(localStorage.getItem('userList'));

  // 등록된 유자가 없다면 새로운 배열을 만들어서 넣기
  if (!currentUsers) {
    const newUserList = [];
    newUserList.push({
      id: userInfo.id,
      password: userInfo.password,
    });

    localStorage.setItem('userList', JSON.stringify(newUserList));
  } else {
    const updatedUsers = currentUsers.concat({
      id: userInfo.id,
      password: userInfo.password,
    });

    localStorage.setItem('userList', JSON.stringify(updatedUsers));
  }
};

const init = () => {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const idValue = idEl.value;
    const passwordValue = passwordEl.value;

    if (isUserExist(idValue)) {
      alert(`${idValue} 유저는 이미 존재합니다!`);
      idEl.value = '';
      passwordEl.value = '';
      return;
    }

    registerUser({ id: idValue, password: passwordValue });
    alert('회원가입 성공!');
    location.href = './signin.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
