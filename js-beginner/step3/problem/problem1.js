// 사칙연산 함수를 만드세요
/*
  필요 함수
  - calc
    - 사칙연산을 받으면 필요한 함수를 호출합니다.
  - add, minus, multiply, divide
    - 두 수를 받아 결과를 반환합니다.
*/

/**
 * @Test 이하 테스트 코드가 전부 true를 반환해야합니다.
 */
console.log(calc(100, 50, '+') === 150);
console.log(calc(100, 123, '-') === -23);
console.log(calc(12, 10, '*') === 120);
console.log(calc(100, 5, '/') === 20);
console.log(calc(1, 0, '/') === Infinity);
