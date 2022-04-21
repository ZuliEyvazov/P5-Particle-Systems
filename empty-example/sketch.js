let system;

function setup() {
  createCanvas(1920, 1080);
  system = new ParticleSystem(createVector(width / 2, 50));
}

function draw() {
  background(50);
  system.addParticle(1);
  system.run();
}

// A simple Particle class
let Particle = function(position) {
  this.acceleration = createVector(0, 0.05); //last number is gravity
  this.velocity = createVector(random(-1, 1), random(-1, 0)); //origin point
  this.position = position.copy();
  this.lifespan = 255;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(150, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  triangle(this.position.x, this.position.y, 0, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  return this.lifespan < 1;
};

let ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (let i = this.particles.length-1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 2);
    }
  }
};
