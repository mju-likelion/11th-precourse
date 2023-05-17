// 스택을 컨트롤하는 함수를 만드세요.
/*
  필요 함수
  - stackExecuter (옵션 파라미터를 받아 push, pop, shift, print 동작을 하는 함수를 호출합니다.)
  - push, pop, shift, print
    - stack이 비어있을 때 pop 실행시 '값이 비어있습니다'를 출력하세요
    - print는 반드시 배열 형태로 출력하세요 ([5], [1,2,3], [{name: hanjo}, {name: gildong},...])

  option 파라미터
  - 스택을 컨트롤하기 위한 옵션들이 객체 형태로 되어있습니다.
  - method: 스택을 컨트롤하기 위한 명령어로 구성됩니다. 필수값입니다.
    - push, pop, shift, print 명령어가 있습니다.
  - value: 스택에 값을 넣을 때 필요한 값입니다. 데이터형식에는 제한이 없습니다.
  - printCondition: print 명령어 실행 시 print 방법을 '함수'로 받습니다.
    - all(stack): stack에 있는 값을 전부 출력합니다.
    - condition(stack, filter): stack에 있는 값 중 조건에 일치하는 값만 출력합니다. filter 파라미터는 함수입니다.
    - index(stack, index): stack[index]의 값을 반환합니다.
    - bottom(stack): stack의 bottom을 출력합니다.
    - top(stack): stack의 top을 출력합니다.
*/

const stackExecuter = (option) => {
  const stack = [];

  // option에서 push, pop, shift, print 등 동작을 읽고 알맞은 함수를 실행해 stack에 값을 넣으세요.
};

/** @Test 다음 조건들을 해석해 함수를 실행하세요 */
/*
  - push 1 // [1]
  - push 2 // [1,2]
  - push 3 // [1,2,3]
  - pop // [1,2]
  - print index 1 // 2
  - print index 0 // 1
  - print index 2 // error
  - pop // [1]
  - pop // []
  - pop // error
  - push -2 // [-2]
  - push 2 // [-2, 2]
  - push 5 // [-2, 2, 5]
  - push 10 // [-2, 2, 5, 10]
  - push 999 // [-2, 2, 5, 10, 999]
  - shift // [2, 5, 10, 999]
  - print top // 999
  - print bottom // 2
  - print all // [2, 5, 10, 999]
  - print condition 짝수만 출력 // [2, 10]
  - print condition 10 이상 값만 출력 // [10, 999]
*/
