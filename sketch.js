let fireworks = [];
const FIREWORK_RATE = 0.05;
const gravity = new Vector(0, 0.2);

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
}

function onScreen(obj) {
  if (obj instanceof Array) return obj.some((j) => onScreen(j));
  obj = obj.pos ?? obj;

  return obj.x > 0 && obj.x < width && obj.y > 0 && obj.y < height;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  stroke("white");
  strokeWeight(5);

  Firework.vStartMax = -Math.sqrt(2 * gravity.y * height);
  Particle.updateCallback = (particle) => {
    stroke(particle.color);
    point(particle.pos.x, particle.pos.y);
  };

  fireworks.push(new Firework());
}

function draw() {
  background(20);

  if (random() < FIREWORK_RATE) fireworks.push(new Firework());

  fireworks.forEach((firework) => firework.update());

  fireworks = fireworks.filter((f) => onScreen(f.particles) && f.alive);
}
