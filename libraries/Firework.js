class Particle {
  static colors = ["#3288F0", "#34FA99", "#B1E33B", "#FABF34", "#F04C22"];

  static ageRate = 3;
  static decc = 0.985;
  static fallLimit = 2;

  static updateCallback() {}

  constructor(x, y, color, age) {
    this.pos = new Vector(x, y);
    this.vel = Vector.zero();
    this.acc = Vector.zero();
    this.color = color ?? hexToRgb(randomFrom(Particle.colors));
    this.age = age ?? null;
  }

  get alive() {
    return this.age ? this.age < 255 : true;
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
    } else {
      this.color[3] = (this.vel * 5) ** 1.5;
    }

    Particle.updateCallback(this);
  }
}

class Firework {
  static vStartMax = -15;
  static gravity = new Vector(0, 0.2);
  static burstCount = 100;
  static burstVel = 3;

  static updateCallback() {}

  static setVStartMax(height) {
    Firework.vStartMax = -Math.sqrt(2 * Firework.gravity.y * height);
  }

  constructor() {
    const seed = new Particle(Math.random() * width, height, [255, 255, 255]);
    seed.vel = new Vector(0, Math.random() * Firework.vStartMax);
    this.particles = [seed];
    this.bursted = false;
  }

  get alive() {
    return this.particles.some((p) => p.alive);
  }

  burst() {
    this.bursted = true;
    const { pos } = this.particles.pop();

    for (let i = 0; i < Firework.burstCount; i++) {
      const newP = new Particle(pos.x, pos.y);
      newP.vel = Vector.random2d.mult(Math.random() * Firework.burstVel);
      newP.age = 1;

      this.particles.push(newP);
    }
  }

  update() {
    this.particles.forEach((p) => {
      p.applyForce(Firework.gravity);
      p.update();
    });

    if (this.particles[0]?.vel.y > 0 && !this.bursted) this.burst();

    Firework.updateCallback(this);
  }
}
