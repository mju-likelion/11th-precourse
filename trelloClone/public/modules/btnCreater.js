export let stickerButtonMoved = false;

export const appendStickerButton = (stickerEl) => {
  const btnBox = document.createElement('div');
  const btnAppendTodo = document.createElement('button');
  const btnDeleteSticker = document.createElement('button');

  btnBox.classList.add('btnBox');
  btnAppendTodo.textContent = '항목 추가';
  btnDeleteSticker.textContent = '스티커 삭제';

  btnAppendTodo.onmousedown = () => (stickerButtonMoved = false);
  btnAppendTodo.onmousemove = () => (stickerButtonMoved = true);

  btnDeleteSticker.onmousedown = () => (stickerButtonMoved = false);
  btnDeleteSticker.onmousemove = () => (stickerButtonMoved = true);

  btnDeleteSticker.setAttribute('data-btn', 'delete');
  btnAppendTodo.setAttribute('data-btn', 'create');

  btnBox.append(btnAppendTodo);
  btnBox.append(btnDeleteSticker);

  stickerEl.append(btnBox);
};

export const appendTodoButton = (newTodo) => {
  const btnDeleteTodo = document.createElement('button');
  btnDeleteTodo.textContent = 'Del';
  btnDeleteTodo.setAttribute('data-todoId', newTodo.id);
  newTodo.append(btnDeleteTodo);
};
