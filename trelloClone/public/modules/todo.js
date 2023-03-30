import { appendTodoButton } from './btnCreater.js';
import { storeTodo, storeAllTodo, deleteTodo, deleteAllTodo, updateTodo } from './store.js';
import increaseZIndex from './increaseZIndex.js';
import createTitleInputEl from './createTitleInputEl.js';
import createPlaceholder from './createPlaceholder.js';
import getRect from './getRect.js';

export const createTodoObject = (container) => {
  const id = crypto.randomUUID();
  const todo = {
    id: id,
    title: 'todo 제목',
  };
  storeTodo(container.id, todo);
  let todoEl = appendTodo(container, todo);

  return todoEl;
};

export const appendTodo = (container, todo) => {
  const newTodo = createTodoElement(todo);
  todoMouseDownEvent(container, newTodo);
  appendTodoButton(newTodo);
  container.append(newTodo);

  return newTodo;
};

export const todoTitleClick = (titleEl, todoId, stickerId) => {
  const inputEl = createTitleInputEl(titleEl);
  inputEl.onblur = () => {
    setTodoTitle(inputEl, titleEl, todoId, stickerId);
  };
};

const todoMouseDownEvent = (sticker, todo) => {
  todo.onmousedown = (cursor) => {
    cursor.stopPropagation();
    sticker.style.zIndex = increaseZIndex();

    if (cursor.target.tagName === 'INPUT') {
      return;
    }

    let mouseMoved = false; // 드래그, 클릭 구분
    let dropOtherArea = null;

    const { initX, initY } = getRect(todo, cursor);
    const todoPlaceholder = createPlaceholder(todo);

    todo.after(todoPlaceholder);
    todo.style.zIndex = 1;
    todo.style.left = `${cursor.clientX - initX}px`;
    todo.style.top = `${cursor.clientY - initY}px`;
    todo.style.transform = 'rotate(0.005turn)';
    todo.style.position = 'fixed';

    // todo drag
    const dragTodo = (cursor) => {
      todo.after(todoPlaceholder);
      todo.style.left = `${cursor.clientX - initX}px`;
      todo.style.top = `${cursor.clientY - initY}px`;
      mouseMoved = true;

      // 현재 마우스 포인터 기준으로 가장 자식인 노드 반환
      todo.style.display = 'none';
      let eleBelow = document.elementFromPoint(cursor.clientX, cursor.clientY);
      todo.style.display = 'flex';

      if (!eleBelow) {
        return;
      }

      // 현재 위치가 스티커 바깥이라면 드롭위치 초기화
      if (eleBelow instanceof HTMLElement) {
        dropOtherArea = null;
      }

      // 다른 영역인지 동일 영역인지 판별
      let dropArea = eleBelow.closest('.stickerBox');
      if (!dropArea) {
        return;
      }

      // 다른 영역
      if (sticker !== dropArea) {
        if (eleBelow.className === 'stickerBox') {
          dropArea.append(todoPlaceholder);
        }
        if (isClassNameIncludeTodo(eleBelow.className)) {
          positionDropTodo(eleBelow, dropArea, todo, todoPlaceholder, cursor);
        }

        dropOtherArea = dropArea; // todo의 부모를 새로운 부모로 갱신
      } else if (isClassNameIncludeTodo(eleBelow.className)) {
        positionDropTodo(eleBelow, sticker, todo, todoPlaceholder, cursor);
      }
    };

    // todo drop
    const dropTodo = () => {
      document.removeEventListener('mousemove', dragTodo);
      document.removeEventListener('mouseup', dropTodo);

      if (dropOtherArea) {
        deleteTodo(sticker.id, todo.id);
        todoPlaceholder.after(todo);
        changeTodoOrder(dropOtherArea);

        // todo의 부모를 새로운 부모로 변경
        sticker = dropOtherArea;
      } else {
        todoPlaceholder.after(todo);
        let todoElements = [...sticker.children].filter((item) => item.className === 'todo');
        deleteAllTodo(sticker.id);
        storeAllTodo(sticker.id, todoElements);
      }

      todoPlaceholder.remove();
    };

    document.onmouseup = (cursor) => {
      todo.style.transform = 'rotate(0turn)';
      todo.style.position = 'static';
      dropTodo();
      if (mouseMoved) {
        return;
      }

      if (cursor.target.id === 'todoTitle') {
        todoTitleClick(cursor.target, todo.id, sticker.id);
      }

      if (cursor.target.dataset.todoid) {
        deleteTodoElement(cursor, todo, sticker);
      }
    };

    // document에 이벤트를 할당해 마우스가 todo에 벗어나도 멈추지 않게 설정
    document.addEventListener('mousemove', dragTodo);
  };
};

const createTodoElement = (todo) => {
  const newTodo = document.createElement('div');
  newTodo.className = 'todo';
  newTodo.append(createTodoTitleElement(todo.title));
  newTodo.id = todo.id;

  return newTodo;
};

const createTodoTitleElement = (title) => {
  const p = document.createElement('p');
  p.id = 'todoTitle';
  p.textContent = title;

  return p;
};

const changeTodoOrder = (dropArea) => {
  // 기존 저장소에 있는 todo를 전부 삭제하고 화면에 보이는 순서로 다시 저장소에 저장
  let orderedTodoList = [...dropArea.children].filter((item) => item.className === 'todo');
  deleteAllTodo(dropArea.id);
  storeAllTodo(dropArea.id, orderedTodoList);
};

const isClassNameIncludeTodo = (className) => {
  const splitedWord = className.split(' ');
  return splitedWord.includes('todo');
};

const deleteTodoElement = (cursor, todo, sticker) => {
  // 삭제 버튼 상속
  const todoId = cursor.target.dataset.todoid;
  if (cursor.target.dataset.todoid) {
    todo.remove();
    deleteTodo(sticker.id, todoId);
  }
};

const setTodoTitle = (inputEl, titleEl, todoId, stickerId) => {
  if (inputEl.value) {
    titleEl.textContent = inputEl.value;
  }
  titleEl.hidden = false;
  updateTodo(todoId, stickerId, { title: inputEl.value });
  inputEl.remove();
};

// todo item의 절반 이하 => 위로 붙이기 / 이상 => 아래로 붙이기, 파라미터가 너무 많은 것 같다
const positionDropTodo = (currCursorItem, sticker, pickedTodo, plcaeholder, cursor) => {
  const insertPosition = currCursorItem.offsetTop + sticker.offsetTop + pickedTodo.offsetHeight / 2;
  if (insertPosition > cursor.clientY) {
    currCursorItem.before(plcaeholder);
  } else {
    currCursorItem.after(plcaeholder);
  }
};
