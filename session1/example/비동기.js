const 비동기세탁 = () => {
  console.log('세탁을 시작합니다!');
  setTimeout(() => console.log('세탁이 끝났습니다!!', 1500));
  console.log('세탁물을 널어요');
};

// 비동기세탁();

const 동기세탁 = () => {
  console.log('세탁을 시작합니다!');

  new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log('세탁이 끝났습니다!!'), 1500));
  }).then((res) => console.log('세탁물을 널어요'));
};

// 동기세탁();
