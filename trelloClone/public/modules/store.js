let stickers = [];

// STICKER
export const loadStickers = async () => {
  const res = await fetch('api/stickers');
  stickers = await res.json();
  return stickers;
};

const saveStickers = async () => {
  await fetch('/api/stickers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stickers),
  });
};

export const pushStickerItem = (sticker) => {
  stickers.push(sticker);
  saveStickers();
};

export const updateStickers = (stickerId, property) => {
  const sticker = findSticker(stickerId);
  if (!sticker) {
    return;
  }
  Object.assign(sticker, property);
  saveStickers();
};

export const deleteSticker = (id) => {
  stickers = stickers.filter((item) => item.id !== id);
  saveStickers();
};

export const clearSticker = () => {
  stickers = [];
  saveStickers();
};

// TODO
export const storeTodo = (stickerId, todo) => {
  let stickerTodo = findSticker(stickerId).todos;
  stickerTodo.push(todo);
  saveStickers();
};

export const storeAllTodo = (stickerId, todoList) => {
  let stickerTodo = findSticker(stickerId).todos;
  for (let todo of todoList) {
    let newTodo = {
      id: todo.id,
      title: todo.querySelector('#todoTitle').textContent,
    };
    stickerTodo.push(newTodo);
  }

  saveStickers();
  return stickerTodo;
};

export const deleteTodo = (stickerId, todoId) => {
  const sticker = findSticker(stickerId);
  sticker.todos = sticker.todos.filter((item) => item.id !== todoId);
  saveStickers();
};

export const deleteAllTodo = (stickerId) => {
  const sticker = findSticker(stickerId);
  sticker.todos = [];
  saveStickers();
};

export const updateTodo = (todoId, stickerId, property) => {
  const sticker = findSticker(stickerId);
  if (!sticker) {
    return;
  }
  const todo = sticker.todos.find((item) => item.id === todoId);
  if (!todo) {
    return;
  }
  Object.assign(todo, property);
  saveStickers();
};

const findSticker = (id) => {
  return stickers.find((item) => item.id === id);
};
