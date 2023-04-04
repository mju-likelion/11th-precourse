/** 변수나 데이터에 담을 수 있다. */
let printHello = function () {
  console.log('안녕하세요!!');
};

printHello();

/**  함수의 파라미터로 전달할 수 있습니다. */
function hello() {
  console.log('저는 11기 아기사자입니다!');
}

function printFunction(someFunction) {
  someFunction(); // someFunction이라는 파라미터를 받아 실행합니다
}

printFunction(hello); // printFunction에 hello 함수를 파라미터로 전달합니다.

/** 함수의 리턴값으로 사용할 수 있습니다. */
function returnFunction() {
  console.log('1. 저는 returnFunction이 할당 될 때 실행돼요!!');

  // 함수를 리턴하고 있습니다.
  return function () {
    console.log('2. 저는 저를 할당한 곳에서 실행될 때마다 실행돼요!!');
  };
}

const closure = returnFunction();
closure();
closure();
