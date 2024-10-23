let pursuer;
let target;
let sliderMaxSpeed, sliderMaxForce, sliderPredictionFrames;
let targetMaxSpeedSlider, targetMaxForceSlider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pursuer = new Vehicle(random(width), random(height));
  target = new Target(random(width), random(height));

  sliderMaxSpeed = createSlider(0, 10, 5, 0.1);
  sliderMaxSpeed.position(20, 20);

  sliderMaxForce = createSlider(0, 1, 0.1, 0.01);
  sliderMaxForce.position(20, 50);

  sliderPredictionFrames = createSlider(0, 100, 10, 1);
  sliderPredictionFrames.position(20, 80);

    // Sliders for target
  targetMaxSpeedSlider = createSlider(0, 10, 6, 0.1);  // Speed slider for the target
  targetMaxSpeedSlider.position(20, 110);
  targetMaxForceSlider = createSlider(0, 1, 0.2, 0.01);  // Force slider for the target
  targetMaxForceSlider.position(20, 140);
}

function draw() {
  background(229);

  pursuer.maxSpeed = sliderMaxSpeed.value();
  pursuer.maxForce = sliderMaxForce.value();

  target.maxSpeed = targetMaxSpeedSlider.value();
  target.maxForce = targetMaxForceSlider.value()

  // pursuer = le véhicule poursuiveur, il vise un point devant la cible
  if (pursuer && target) {
  let steering = pursuer.pursue(target, sliderPredictionFrames.value());
  pursuer.applyForce(steering);

  // Target essaie de evader le pursuer
  let evadeForce = target.evade(pursuer);
  target.applyForce(evadeForce);

  // déplacement et dessin du véhicule et de la target
  pursuer.update();
  pursuer.edges();
  pursuer.show();

  // lorsque la target atteint un bord du canvas elle ré-apparait de l'autre côté

  target.edges();
  target.update();
  target.show();
  }

  // Label pour sliders
  fill(100);
  text("Max Speed", 160, 35);
  text("Max Force", 160, 65);
  text("Prediction Frames", 160, 95);
  text("Target Max Speed", 160, 125);
  text("Target Max Force", 160, 150);
}
