class Firework {
  static vStartMax = -15;
  static gravity = new Vector(0, 0.2);
  static explodeCount = 100;
  static explodeVel = 3;
  static updateCallback() {}

  constructor() {
    const seed = new Particle(Math.random() * width, height, "white");
    seed.vel = new Vector(0, Math.random() * Firework.vStartMax);
    this.particles = [seed];
    this.exploded = false;
  }

  explode() {
    const { pos } = this.particles.pop();

    for (let i = 0; i < Firework.explodeCount; i++) {
      const newP = new Particle(pos.x, pos.y);
      newP.vel = Vector.random.mult(Firework.explodeVel);
      this.particles.push(newP);
    }

    this.exploded = true;
  }

  update() {
    this.particles.forEach((p) => {
      p.applyForce(gravity);
      p.update();
    });

    if (this.particles[0]?.vel.y > 0 && !this.exploded) this.explode();

    Firework.updateCallback(this);
  }
}
