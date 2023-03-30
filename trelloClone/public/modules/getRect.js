const getRect = (clickedEl, mousePointer) => {
  const getRect = clickedEl.getBoundingClientRect();
  const initX = mousePointer.clientX - getRect.x;
  const initY = mousePointer.clientY - getRect.y;
  return { initX, initY };
};

export default getRect;
