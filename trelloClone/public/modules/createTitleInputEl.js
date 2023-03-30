const createTitleInputEl = (titleEl) => {
  titleEl.hidden = true;
  const inputEl = document.createElement('input');
  inputEl.style.width = '97%';

  inputEl.onkeyup = (key) => {
    if (key.code === 'Enter') {
      inputEl.blur();
    }
  };

  titleEl.after(inputEl);
  inputEl.value = titleEl.textContent;
  inputEl.focus();
  inputEl.select();

  return inputEl;
};

export default createTitleInputEl;
