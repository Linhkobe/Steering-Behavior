const nbVehicles = 10;
let vehicles = [];
let targets = [];  
let movingTarget;
let targetVelocities = [];
let targetsMoving = false;

function setup() {
  createCanvas(800, 800);

  createVehicles(nbVehicles);

  movingTarget = createVector(random(width), random(height));

  setInterval(changeTargetDirection, 1000);

  for (let i = 0; i < 20; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }

  // "M" Shape
  targets.push(createVector(100, 100));  
  targets.push(createVector(100, 140));
  targets.push(createVector(100, 180));
  targets.push(createVector(120, 160));  
  targets.push(createVector(140, 140));
  targets.push(createVector(140, 180));  

  // "B" Shape
  targets.push(createVector(200, 100));  
  targets.push(createVector(200, 140));
  targets.push(createVector(200, 180));
  targets.push(createVector(220, 100));  
  targets.push(createVector(240, 120));
  targets.push(createVector(220, 140));  
  targets.push(createVector(220, 160));  
  targets.push(createVector(240, 180));
  targets.push(createVector(220, 180));

  //20 targets
  let cols = 5;
  let rows = 4;
  let spacing = width / (cols + 1);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let target = createVector((j + 1) * spacing, (i + 1) * spacing);
      targets.push(target);
    }
  }
}

function changeTargetDirection() {
  movingTarget = createVector(random(width), random(height));
}

function createVehicles(nbVehicles) {
  for (let i = 0; i < nbVehicles; i++) {
    let x = random(width);
    let y = random(height);
    vehicles.push(new Vehicle(x, y));
  }
}

function draw() {
  background(0);

  if (allVehiclesArrived() && !targetsMoving) {
    setTimeout(moveTargetsRandomly, 2000);
    targetsMoving = true;
  }

  // Cible qui suit la souris, cercle rouge de rayon 32
  let target = createVector(mouseX, mouseY);
  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 32);

  let steering = vehicles[0].seek(target);
  vehicles[0].applyForce(steering);

  let vTargets = createVFormation(vehicles[0]);

  // Each following vehicle arrives at the vehicle in front of it
  for (let i = 1; i < vehicles.length; i++) {
    let targetPos = vehicles[i - 1].pos;
    let steering = vehicles[i].arrive(targetPos, 50);
    vehicles[i].applyForce(steering);
  }

  for (let i = 0; i < targets.length; i++) {
    targets[i].add(targetVelocities[i]);  // Move target

    // Wrap around the edges of the screen
    if (targets[i].x > width) targets[i].x = 0;
    if (targets[i].x < 0) targets[i].x = width;
    if (targets[i].y > height) targets[i].y = 0;
    if (targets[i].y < 0) targets[i].y = height;
  }

  vehicles.forEach((vehicle) => {
    vehicle.update();
    vehicle.show();
  });

  for (let target of vTargets) {
    fill(0, 255, 0);
    ellipse(target.x, target.y, 10);
  }

  if (targetsMoving) {
    for (let i = 0; i < targets.length; i++) {
      targets[i].add(targetVelocities[i]);
    }
  }
}

function keyPressed() {
  if (key === 'd') {
    Vehicle.debug = !Vehicle.debug;
  }
}

function createVFormation(vehicle) {
  let vTargets = [];
  let offset = 50;

  for (let i = -2; i <= 2; i++) {
    let targetPos = createVector(vehicle.pos.x + i * offset, vehicle.pos.y + abs(i) * offset);
    vTargets.push(targetPos);
  }

  return vTargets;
}

function allVehiclesArrived() {
  for (let i = 0; i < vehicles.length; i++) {
    let distance = p5.Vector.dist(vehicles[i].pos, targets[i]);
    if (distance > 50) {
      return false;
    }
  }
  return true;
}

function moveTargetsRandomly() {
  for (let i = 0; i < targets.length; i++) {
    let velocity = p5.Vector.random2D();
    velocity.mult(random(2, 5));
    targetVelocities.push(velocity);
  }
}
