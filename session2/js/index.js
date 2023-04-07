// const todos = [
//   {
//     id: number타입,
//     content: string타입,
//     complete: boolean타입,
//     user: string타입,
//   },
// ];

const todoContainerEl = document.querySelector('#todoContainer');
const todoInputEl = document.querySelector('#todoInput');
const todoButtonEl = document.querySelector('#todoButton');
const logoutButtonEl = document.querySelector('#logoutButton');

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
  todoContainerEl.innerHTML = '';

  // 가장 최근 todo를 처음에 보여주기 위해 배열을 불러오면서 뒤집어줍니다
  const todos = JSON.parse(localStorage.getItem('todos')).reverse();

  // todo를 보여줄 DOM을 그립니다.
  todos.forEach((todo) => {
    const divEl = document.createElement('div');
    // const idEl = document.createElement('p');
    const completeEl = document.createElement('input');
    const contentEl = document.createElement('label');
    const userEl = document.createElement('p');
    const deleteEl = document.createElement('button');

    divEl.className = 'todoItem';

    completeEl.type = 'checkbox';
    completeEl.className = 'checkbox';
    completeEl.id = todo.id;
    completeEl.addEventListener('click', () =>
      updateComplete(todo.id, completeEl.checked)
    );

    deleteEl.type = 'button';
    deleteEl.textContent = 'X';
    deleteEl.className = 'deleteButton';
    deleteEl.addEventListener('click', () => deleteTodo(todo.id));

    completeEl.checked = todo.complete;

    contentEl.textContent = todo.content;
    contentEl.htmlFor = todo.id;

    userEl.textContent = todo.user;

    divEl.append(/*idEl*/ completeEl, contentEl, userEl, deleteEl);
    todoContainerEl.append(divEl);
  });
};

const createTodo = () => {
  const todoText = todoInputEl.value;

  const todos = JSON.parse(localStorage.getItem('todos'));
  const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    id: newId,
    complete: false,
    content: todoText,
    user: JSON.parse(localStorage.getItem('login')),
  };

  // push는 뒤에 추가, unshift는 앞에서 추가 그럼 뒤에서 제거, 추가는??
  todos.push(newTodo);

  localStorage.setItem('todos', JSON.stringify(todos));
  todoInputEl.value = '';

  // todo 등록 후 다시 todo를 그립니다.
  readTodo();
};

const deleteTodo = (deleteId) => {
  const todos = JSON.parse(localStorage.getItem('todos'));
  const filterdTodos = todos.filter((todo) => todo.id !== deleteId);

  // 삭제하고 나머지 todos를 다시 로컬 스토리지에 저장합니다. 그후 다시 todo를 그립니다.
  localStorage.setItem('todos', JSON.stringify(filterdTodos));
  readTodo();
};

const updateComplete = (updateId, isComplete) => {
  // 체크 변경할 때마다 필터링해서 저장하고 다시 그립니다.
  const todos = JSON.parse(localStorage.getItem('todos'));

  // 업데이트할 todo를 찾아서 해당 todo의 complete를 바꾼다. 그게 아니라면 그대로 전달합니다.
  const changedTodos = todos.map((todo) =>
    todo.id === updateId ? { ...todo, complete: isComplete } : todo
  );

  localStorage.setItem('todos', JSON.stringify(changedTodos));
  readTodo();
};

const logout = () => {
  alert('로그아웃!');
  localStorage.removeItem('login');
  location.href = './signin.html';
};

const init = () => {
  isLogin();

  // 로컬스토리지에 todos가 없다면 빈 배열을 추가해줍니다.
  if (!localStorage.getItem('todos')) {
    localStorage.setItem('todos', JSON.stringify([]));
  }

  readTodo();

  todoButtonEl.addEventListener('click', createTodo);
  logoutButtonEl.addEventListener('click', logout);
};

document.addEventListener('DOMContentLoaded', init);
