// prompt와 alert 사용 방법 기초입니다! 아래 코드를 꼭 따라할 필요는 없어요
while (true) {
  const a = prompt('첫 번째 값을 입력하세요');
  const b = prompt('두 번째 값을 입력하세요');
  alert(
    `입력한 값은 ${a}, ${b}입니다! \n ${a}+${b}=${
      a + b
    }인데, 과연 이게 맞을까요??`
  );

  if (a === 'break') break;
}
