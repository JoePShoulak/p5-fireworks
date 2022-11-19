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
    const { pos } = this.particles.pop();

    for (let i = 0; i < Firework.burstCount; i++) {
      const newP = new Particle(pos.x, pos.y);
      newP.vel = Vector.random2d.mult(Math.random() * Firework.burstVel);
      newP.age = 1;

      this.particles.push(newP);
    }

    this.bursted = true;
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
