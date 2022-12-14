class Vector {
  static zero(dim = 2) {
    const args = Array(dim).fill(0);
    return new Vector(...args);
  }

  static get random2d() {
    const angle = Math.random() * 2 * Math.PI;
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(obj) {
    if (obj instanceof Vector) {
      Object.keys(this).forEach((key) => (this[key] += obj[key]));
      return this;
    }

    Object.keys(this).forEach((key) => (this[key] += obj));
    return this;
  }

  mult(obj) {
    if (obj instanceof Vector) {
      Object.keys(this).forEach((key) => (this[key] *= obj[key]));
      return this;
    }

    Object.keys(this).forEach((key) => (this[key] *= obj));
    return this;
  }

  valueOf() {
    const sum = Object.values(this).reduce((acc, cur) => {
      return acc + cur ** 2;
    }, 0);
    return Math.sqrt(sum);
  }
}
