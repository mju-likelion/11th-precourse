// const todos = [
//   {
//     id: number타입,
//     content: string타입,
//     complete: boolean타입,
//     user: string타입,
//   },
// ];
// test todo
// const todos = [
//   {
//     id: 0,
//     complete: true,
//     content: '테스트입니당',
//     user: 'test',
//   },
//   {
//     id: 1,
//     complete: false,
//     content: '하이하이',
//     user: 'test',
//   },
//   {
//     id: 2,
//     complete: false,
//     content: '다른유저',
//     user: 'hanjo',
//   },
// ];
// localStorage.setItem('todos', JSON.stringify(todos));

const todoContainerEl = document.querySelector('#todoContainer');

/** 로그인 되었는지 판별합니다. */
const isLogin = () => {
  const loginedUser = localStorage.getItem('login');
  if (!loginedUser) {
    // 이외에도 location.replace도 가능합니다. 해당 api는 히스토리가 남지 않습니다
    location.href = './signin.html';
  }
};

/** 개별 유저를 가져오기엔 난이도가 높아 모든 유저를 가져옵니다. 로그인된 유저의 todo만 가져오도록 변경해보세요! */
const readTodo = () => {
  const todos = JSON.parse(localStorage.getItem('todos'));

  todos.forEach((todo) => {
    const divEl = document.createElement('div');
    const idEl = document.createElement('p');
    const completeEl = document.createElement('input');
    const contentEl = document.createElement('p');
    const userEl = document.createElement('p');

    completeEl.type = 'checkbox';

    idEl.textContent = todo.id;
    completeEl.checked = todo.complete;
    contentEl.textContent = todo.content;
    userEl.textContent = todo.user;

    divEl.append(idEl, completeEl, contentEl, userEl);
    todoContainerEl.append(divEl);
  });
};

const init = () => {
  isLogin();
  readTodo();
};

document.addEventListener('DOMContentLoaded', init);
