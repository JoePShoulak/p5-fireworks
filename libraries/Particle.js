class Particle {
  static colors = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

  static updateCallback() {}

  constructor(x, y, color) {
    this.pos = new Vector(x, y);
    this.vel = Vector.zero;
    this.acc = Vector.zero;
    this.color = color ?? randomFrom(Particle.colors);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    Particle.updateCallback(this);
  }
}
