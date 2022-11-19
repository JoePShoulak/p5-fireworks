class Vector {
  static get zero() {
    return new Vector(0, 0);
  }

  static get random() {
    const angle = Math.random() * 2 * Math.PI;
    return new Vector(Math.cos(angle), Math.sin(angle));
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(obj) {
    if (obj instanceof Vector) {
      this.x += obj.x;
      this.y += obj.y;
      return this;
    }

    this.x += obj;
    this.y += obj;
    return this;
  }

  mult(obj) {
    if (obj instanceof Vector) {
      this.x *= obj.x;
      this.y *= obj.y;
      return this;
    }

    this.x *= obj;
    this.y *= obj;
    return this;
  }

  valueOf() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
}
