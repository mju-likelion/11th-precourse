const createPlaceholder = (todoEl) => {
  const placeholder = document.createElement('div');
  placeholder.classList.add('placeholder');
  placeholder.classList.add('todo');

  placeholder.style.width = `${todoEl.offsetWidth}px`;
  placeholder.style.height = `${todoEl.offsetHeight}px`;

  return placeholder;
};

export default createPlaceholder;
