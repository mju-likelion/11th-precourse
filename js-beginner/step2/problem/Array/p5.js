// 괄호 검사를 판별하는 함수를 작성하세요
// 괄호는 '(', ')' 밖에 없습니다.
// 함수명은 isBraketCorrect로 작성합니다.
// 힌트: array, stack, 문자열 나누기, 반복문

// 여기에 코드를 작성하세요

// 이하 전부 true가 리턴되어야합니다. 아래 코드 조작 금지
console.log(isBraketCorrect('()') === true);
console.log(isBraketCorrect('(())') === true);
console.log(isBraketCorrect('(hello)(bye)') === true);
console.log(isBraketCorrect('(10+20)*(100+100)/(1000-500)') === true);
console.log(isBraketCorrect('(hi(20))') === true);
console.log(isBraketCorrect('') === true);
console.log(isBraketCorrect('qwe') === true);

console.log(isBraketCorrect(')') === false);
console.log(isBraketCorrect('(') === false);
console.log(isBraketCorrect('())') === false);
console.log(isBraketCorrect(')(') === false);
console.log(isBraketCorrect(')))') === false);
console.log(isBraketCorrect('(((') === false);
