class 붕어빵 {
  // private 프로퍼티, #을 앞에 붙이면 외부에서 접근할 수 없습니다!
  #속재료 = '';
  #가격 = 0;

  // 생성자
  constructor(ingredient, price) {
    this.#속재료 = ingredient;
    this.#가격 = price;
  }

  // getter, setter
  getIngredient() {
    // get ingredient도 가능합니다
    return this.#속재료;
  }
  setIngredient(value) {
    // set ingredident도 가능합니다
    this.#속재료 = value;
  }

  getPrice() {
    return this.#가격;
  }
  setPrice(value) {
    this.#가격 = value;
  }

  // 메서드
  printInfo() {
    return `이 붕어빵은 ${this.getIngredient()} 붕어빵이고 가격은 ${this.getPrice()}입니다`;
  }
}

const 슈붕 = new 붕어빵('슈크림', 100);
console.log(슈붕.getIngredient(), 슈붕.getPrice());
console.log(슈붕.printInfo());
슈붕.setPrice(500);
console.log(슈붕.getIngredient(), 슈붕.getPrice());
console.log(슈붕.printInfo());

const 팥붕 = new 붕어빵('팥', 300);
console.log(팥붕.getIngredient(), 팥붕.getPrice());
console.log(팥붕.printInfo());
팥붕.setPrice(700);
console.log(팥붕.getIngredient(), 팥붕.getPrice());
console.log(팥붕.printInfo());
