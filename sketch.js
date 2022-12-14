const FIREWORK_RATIO = 0.00000005;
const BG_ALPHA = 60;

let fireworks = [];
let firework_rate;

function windowResized() {
  resizeCanvas(innerWidth, innerHeight);
  reset();
}

function onScreen(obj) {
  if (obj instanceof Array) return obj.some((j) => onScreen(j));
  obj = obj.pos ?? obj;

  return obj.x > 0 && obj.x < width && obj.y > 0 && obj.y < height;
}

function reset() {
  Firework.setVStartMax(height);
  firework_rate = FIREWORK_RATIO * width * height;
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  stroke("white");
  strokeWeight(10);
  background(0);

  Particle.updateCallback = (particle) => {
    stroke(particle.color);
    point(particle.pos.x, particle.pos.y);
  };

  reset();
}

function draw() {
  background(0, BG_ALPHA);

  if (random() < firework_rate) fireworks.push(new Firework());

  fireworks = fireworks.filter((f) => {
    f.update();
    return onScreen(f.particles) && f.alive;
  });
}
