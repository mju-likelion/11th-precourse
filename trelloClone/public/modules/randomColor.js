const randomColor = () => {
  let value = new Array(3);
  for (let i = 0; i < value.length; i++) {
    value[i] = Math.floor(Math.random() * (200 - 150 + 1)) + 150;
  }
  return `rgb(${value[0]},${value[1]},${value[2]})`;
};

export default randomColor;
