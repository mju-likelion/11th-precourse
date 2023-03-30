import randomColor from './modules/randomColor.js';
import { appendStickerButton, stickerButtonMoved } from './modules/btnCreater.js';
import { createTodoObject, todoTitleClick, appendTodo } from './modules/todo.js';
import {
  pushStickerItem,
  deleteSticker,
  loadStickers,
  updateStickers,
  clearSticker,
} from './modules/store.js';
import increaseZIndex from './modules/increaseZIndex.js';
import createTitleInputEl from './modules/createTitleInputEl.js';
import getRect from './modules/getRect.js';

const btnStickerCreate = document.querySelector('#btnStickerCreate');
let _stickerPosition = 40; // 스티커 생성 시 left, top 위치

document.addEventListener('DOMContentLoaded', async () => {
  const stickers = await loadStickers();
  initDOM(stickers);
});

document.querySelector('#btnInitSticker').onclick = () => {
  if (confirm('스티커를 초기화합니다.')) {
    clearSticker();
    location.reload();
  }
};

btnStickerCreate.addEventListener('click', () => {
  const newSticker = createStickerObject();
  const stickerElement = createStickerElement(newSticker);
  document.body.append(stickerElement);

  let titleEl = stickerElement.querySelector('#stickerTitle');
  stickerTitleClick(titleEl, newSticker.id); // 스티커 생성시 제목 input 렌더링
});

const createStickerElement = (newSticker) => {
  const stickerEl = document.createElement('div');
  stickerEl.className = 'stickerBox';
  stickerEl.id = newSticker.id;

  stickerEl.style.left = `${newSticker.x}px`;
  stickerEl.style.top = `${newSticker.y}px`;
  stickerEl.style.backgroundColor = newSticker.backgroundColor;
  stickerEl.style.zIndex = newSticker.zIndex;

  stickerEl.append(createStickerTitleElement(newSticker));

  appendStickerButton(stickerEl);
  assignStickerButtonEvent(stickerEl);
  stickerMouseEvent(stickerEl);

  return stickerEl;
};

const createStickerObject = () => {
  const sticker = {
    id: crypto.randomUUID(),
    title: '제목',
    x: _stickerPosition,
    y: _stickerPosition,
    zIndex: 0,
    backgroundColor: randomColor(),
    todos: [],
  };

  _stickerPosition += 10;
  pushStickerItem(sticker);
  return sticker;
};

const assignStickerButtonEvent = (sticker) => {
  // 이벤트 위임
  sticker.addEventListener('click', (e) => {
    if (stickerButtonMoved) {
      // 클릭 or 드래그 판별
      return;
    }

    const btnAction = e.target.dataset.btn;
    if (btnAction === 'delete') {
      sticker.remove();
      deleteSticker(sticker.id);
    }
    if (btnAction === 'create') {
      let newTodoEl = createTodoObject(sticker);
      let todoTitle = newTodoEl.querySelector('#todoTitle');
      todoTitleClick(todoTitle, newTodoEl.id, sticker.id);
    }
  });
};

const stickerMouseEvent = (stickerEl) => {
  stickerEl.onmousedown = (e) => {
    stickerEl.style.zIndex = increaseZIndex();
    const { initX, initY } = getRect(stickerEl, e);

    const dragElement = (e) => {
      stickerEl.style.left = `${e.clientX - initX}px`;
      stickerEl.style.top = `${e.clientY - initY}px`;
    };

    const dropElement = () => {
      document.removeEventListener('mouseup', dragElement);
      document.removeEventListener('mousemove', dragElement);

      let x = parseInt(stickerEl.style.left);
      let y = parseInt(stickerEl.style.top);
      updateStickers(stickerEl.id, { x, y, zIndex: 0 });
    };

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', dropElement);
  };
};

const createStickerTitleElement = (sticker) => {
  const titleEl = document.createElement('p');
  titleEl.id = 'stickerTitle';
  titleEl.textContent = sticker.title || '제목';

  // 마우스 클릭인지 드래그인지 판별
  let mouseMoved = false;
  titleEl.onmousedown = () => (mouseMoved = false);
  titleEl.onmousemove = () => (mouseMoved = true);

  titleEl.onmouseup = () => {
    if (!mouseMoved) {
      stickerTitleClick(titleEl, sticker.id);
    }
  };

  return titleEl;
};

const stickerTitleClick = (titleEl, stickerId) => {
  const inputEl = createTitleInputEl(titleEl);
  inputEl.onblur = () => {
    setTitle(inputEl, titleEl, stickerId);
  };
};

const setTitle = (inputEl, titleEl, stickerId) => {
  if (inputEl.value) {
    titleEl.textContent = inputEl.value;
  }
  titleEl.hidden = false;
  updateStickers(stickerId, { title: titleEl.textContent });
  inputEl.remove();
};

const initDOM = (stickers) => {
  stickers.map((sticker) => {
    const stickerEl = createStickerElement(sticker);

    sticker.todos.map((todo) => {
      appendTodo(stickerEl, todo);
    });

    document.body.append(stickerEl);
  });
};
