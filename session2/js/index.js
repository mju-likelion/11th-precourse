/** 로그인 되었는지 판별합니다. */
const isLogin = () => {
  const loginedUser = localStorage.getItem('login');
  if (!loginedUser) {
    // 이외에도 location.replace도 가능합니다. 해당 api는 히스토리가 남지 않습니다
    location.href = './signin.html';
  }
};

const init = () => {
  isLogin();
};

document.addEventListener('DOMContentLoaded', init);
