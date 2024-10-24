let pursuer;
let target;
let sliderMaxSpeed, sliderMaxForce, sliderPredictionFrames;
let targetMaxSpeedSlider, targetMaxForceSlider;

let pursuers = [];
let targets = [];

let BouncingBalls = [];

let fieldOfVisionSlider;

let numPursuersSlider, numBallsSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //pursuer = new Vehicle(random(width), random(height));
  //target = new Target(random(width), random(height));

  fieldOfVisionSlider = createSlider(50, 500, 200, 10); 
  fieldOfVisionSlider.position(20, 170);

  numPursuersSlider = createSlider(1, 20, 10, 1);
  numPursuersSlider.position(20, 200);

  numBallsSlider = createSlider(1, 20, 10, 1);
  numBallsSlider.position(20, 230);

  // Multiple pursuers and targets
  for (let i = 0; i < 10; i++) {
    pursuers.push(new Vehicle(random(width), random(height)));
  }

  for (let i = 0; i < 10; i++) {
    targets.push(new Target(random(width), random(height)));
  }

  // Plusiers balles avec vélocité aléatoire
  for (let i = 0; i < 10; i++) {
    let ball = new BouncingBall(random(width), random(height));
    ball.vel = p5.Vector.random2D().mult(random(3, 6));
    BouncingBalls.push(ball);
  }

  // Sliders
  sliderMaxSpeed = createSlider(0, 10, 5, 0.1);
  sliderMaxSpeed.position(20, 20);

  sliderMaxForce = createSlider(0, 1, 0.1, 0.01);
  sliderMaxForce.position(20, 50);

  sliderPredictionFrames = createSlider(0, 100, 10, 1);
  sliderPredictionFrames.position(20, 80);

  // Sliders for target
  targetMaxSpeedSlider = createSlider(0, 10, 6, 0.1);  
  targetMaxSpeedSlider.position(20, 110);
  targetMaxForceSlider = createSlider(0, 1, 0.2, 0.01); 
  targetMaxForceSlider.position(20, 140);
}

function draw() {
  background(229);

  let fieldOfVisionRadius = fieldOfVisionSlider.value(); 

  let numPursuers = numPursuersSlider.value();
  if (pursuers.length > numPursuers) {
    pursuers.splice(numPursuers); 
  } else {
    for (let i = pursuers.length; i < numPursuers; i++) {
      pursuers.push(new Vehicle(random(width), random(height))); 
    }
  }

  let numBalls = numBallsSlider.value();
  if (BouncingBalls.length > numBalls) {
    BouncingBalls.splice(numBalls);  
  } else {
    for (let i = BouncingBalls.length; i < numBalls; i++) {
      let ball = new BouncingBall(random(width), random(height));
      ball.vel = p5.Vector.random2D().mult(random(3, 6));  
      BouncingBalls.push(ball);
    }
  }

  for (let pursuer of pursuers) {
    noFill();
    stroke(0, 255, 0);
    circle(pursuer.pos.x, pursuer.pos.y, fieldOfVisionRadius * 2);

    let closestBall = null;
    let minDist = Infinity;

    for (let ball of BouncingBalls) {
      let dist = p5.Vector.dist(pursuer.pos, ball.pos);
      if (dist < minDist && dist < fieldOfVisionRadius) {
        minDist = dist;
        closestBall = ball;
      }
    }

    if (closestBall) {
      let steering = pursuer.pursue(closestBall, sliderPredictionFrames.value());
      pursuer.applyForce(steering);
    }

    pursuer.update();
    pursuer.edges();
    pursuer.show();
  }

  for (let ball of BouncingBalls) {
    ball.update();
    ball.edges();
    ball.show();
  }

  for (let target of targets) {
    target.maxSpeed = targetMaxSpeedSlider.value();
    target.maxForce = targetMaxForceSlider.value();

    target.update();
    target.edges();
    target.show();
  }

  // Label for sliders
  fill(100);
  text("Max Speed", 160, 35);
  text("Max Force", 160, 65);
  text("Prediction Frames", 160, 95);
  text("Target Max Speed", 160, 125);
  text("Target Max Force", 160, 150);
  text("Field of Vision", 160, 180);
  text("Number of Pursuers", 160, 210);
  text("Number of Balls", 160, 240);
}

