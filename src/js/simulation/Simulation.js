const randomChance = 0.3;
const multiplyRules = [2, 3];
const starveRules = [0, 1, 4];


export class Simulation {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.reset();
  }

  getData() { return this.data; }

  update() {
    const oldData = Simulation.copyData(this.data);
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let count = 0;
        if (x > 0 && oldData[x-1][y] === 1) { count ++; }
        if (y > 0 && oldData[x][y-1] === 1) { count ++; }
        if (x < this.width - 1 && oldData[x+1][y] === 1) { count ++; }
        if (y < this.height - 1 && oldData[x][y+1] === 1) { count ++; }
        if (multiplyRules.includes(count)) {
          this.data[x][y] = 1;
        }
        if (starveRules.includes(count)) {
          this.data[x][y] = 0;
        }
      }
    }
  }

  reset() {
    this.data = Simulation.initEmptyData(this.width, this.height);
    Simulation.randomlyPopulate(this.data, randomChance);
  }

  static initEmptyData(width, height) {
    let data = [];
    for (let x = 0; x < width; x++) {
      let row = [];
      for (let y = 0; y < height; y++) {
        row.push(0);
      }
      data.push(row);
    }
    return data;
  }

  static randomlyPopulate(data, chance) {
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < data[0].length; y++) {
        if (Math.random() < chance) {
          data[x][y] = 1;
        }
      }
    }
  }

  static copyData(oldData) {
    let newData = [];
    for (let x = 0; x < oldData.length; x++) {
      let row = [];
      for (let y = 0; y < oldData[0].length; y++) {
        row.push(oldData[x][y]);
      }
      newData.push(row);
    }
    return newData;
  }
}
