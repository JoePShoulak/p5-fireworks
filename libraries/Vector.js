class Vector {
  static zero(dim = 2) {
    const args = Array(dim).fill(0);
    return new Vector(...args);
  }

  static get random2d() {
    const angle = Math.random() * 2 * Math.PI;
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  constructor(x, y, ...args) {
    this.x = x;
    this.y = y;

    if (args) this.z = args.shift();

    if (args) {
      const alpha = "abcdefghijklmnopqrstuvw";
      args.forEach((arg, i) => {
        this[alpha[i]] = arg;
      });
    }
  }

  add(obj) {
    if (obj instanceof Vector) {
      Object.keys(this).forEach((key) => {
        this[key] += obj[key];
      });
      return this;
    }

    Object.keys(this).forEach((key) => (this[key] += obj));
    return this;
  }

  mult(obj) {
    if (obj instanceof Vector) {
      Object.keys(this).forEach((key) => {
        this[key] *= obj[key];
      });
      return this;
    }

    Object.keys(this).forEach((key) => (this[key] *= obj));
    return this;
  }

  valueOf() {
    return Math.sqrt(Object.values(this).reduce((v) => v ** 2, 0));
  }
}
