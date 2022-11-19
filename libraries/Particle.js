class Particle {
  static colors = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

  static ageRate = 3;
  static decc = 0.985;
  static fallLimit = 2;

  static updateCallback() {}

  constructor(x, y, color, age) {
    this.pos = new Vector(x, y);
    this.vel = Vector.zero;
    this.acc = Vector.zero;
    this.color = color ?? hexToRgb(randomFrom(Particle.colors));
    this.age = age ?? null;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.vel.y > Particle.fallLimit) {
      this.vel.mult(Particle.decc);
    }

    if (this.age) {
      this.color[3] = 255 - this.age;
      this.age += Particle.ageRate;
    }

    Particle.updateCallback(this);
  }
}
