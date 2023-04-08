const formEl = document.querySelector('#signupForm');
const idEl = document.querySelector('#signupId');
const passwordEl = document.querySelector('#signupPassword');


const isUserExist = (newUserId) => {
    const users = localStorage.getItem('userList');

    if (!users) return false;

    const convertedUsers = JSON.parse(users); //users에서 받아온 객체를 JSON 형태로 뱉어줘
    const getExistUsers = convertedUsers.find((user) => user.id === newUserId);
    
    return getExistUsers ? true : false
};

const registerUser = (userInfo) => {
    //유저가 존재하는지 파악하고 싶고, 그러려면 유저들의 정보를 가져와야 함
    const currentUsers = JSON.parse(localStorage.getItem('userList'));
    if (!currentUsers) {
        const newUserList = [];
        newUserList.push({
          id: userInfo.id,
          password: userInfo.password,
        });

        localStorage.setItem('userList', JSON.stringify(newUserList));
    }   else {
        const updatedUsers = currentUsers.concat({
          id: userInfo.id,
          password: userInfo.password,
        });

        localStorage.setItem('userList', JSON.stringify(updatedUsers));
        
        //concat은 객체에 push를 해도, 원래 객체의 배열과 새로운 배열이 같이 생김

    };
  };

  // 코드가 복잡해질수록 어디서부터 코드가 시작하고, 해석해야아는지 보기 어렵기 때문에 initialize로 알아보기
  const init = () => {
    //일급객체
    formEl.addEventListener('submit', (e) => {
      e.preventDefault();

      const idValue = idEl.value;
      const passwordValue = passwordEl.value;

      if (isUserExist(idValue)) {
        alert(`${idValue} 유저는 이미 존재합니다!`);
        idEl.value = '';
        passwordEl.value = '';
        return;
      };

      //회원가입이 가능하다면 이후 코드
      registerUser({ id : idValue, password: passwordValue});
      alert(' 회원가입 완료!');
      location.href = './signin.html';


    });
  }; 


  document.addEventListener('DOMContentLoaded', init) ; 