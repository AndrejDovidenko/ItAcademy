function getCounter(num = 0) {
  function Obj() {
    this.num = num;

    this.log = function () {
      console.log(`${this.num}`);
      return this;
    };

    this.count = function (term = 0) {
      this.term = term;
      this.num += this.term;
      return this;
    };

    this.reset = function () {
      this.num = 0;
      return this;
    };
    return this;
  }
  return new Obj();
}

const counter = getCounter(5);

counter
  .log() // 5
  .count(4)
  .log() // 9
  .count(3)
  .log() // 12
  .reset()
  .log() // 0
  .count(8)
  .log(); // 8
