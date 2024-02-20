function getCounter(num = 0) {
  const obj = {
    num: num,

    log() {
      console.log(this.num);
      return this;
    },

    count(term = 0) {
      this.term = term;
      this.num += this.term;
      return this;
    },

    reset() {
      this.num = 0;
      return this;
    },
  };
  return obj;
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
