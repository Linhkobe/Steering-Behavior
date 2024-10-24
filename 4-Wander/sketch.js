let vehicles = [];
let distanceCercleSlider, wanderRadiusSlider, displaceRangeSlider, maxSpeedSlider, maxForceSlider, vehicleCountSlider;

let debugMode = false;

function setup() {
  createCanvas(1000, 800);

  //Sliders
  createP('Distance du Centre du Cercle').position(20, 0);
  distanceCercleSlider = createSlider(50, 300, 150);
  distanceCercleSlider.position(22, 29);
  distanceCercleSlider.style('width', '200px');

  createP('Rayon du Cercle').position(20, 29);
  wanderRadiusSlider = createSlider(10, 100, 50);
  wanderRadiusSlider.position(20, 59);
  wanderRadiusSlider.style('width', '200px');

  createP('Variation de l\'Angle Theta').position(20, 60);
  displaceRangeSlider = createSlider(0, PI / 2, 0.3, 0.01);
  displaceRangeSlider.position(20, 89);
  displaceRangeSlider.style('width', '200px');

  createP('Vitesse Max').position(20, 90);
  maxSpeedSlider = createSlider(1, 10, 4);
  maxSpeedSlider.position(20, 119);
  maxSpeedSlider.style('width', '200px');

  createP('Force Max').position(20, 120);
  maxForceSlider = createSlider(0.01, 1, 0.2, 0.01);
  maxForceSlider.position(20, 149);
  maxForceSlider.style('width', '200px');

  createP("Nombre de véhiclues").position(20, 150);
  vehicleCountSlider = createSlider(1, 100, 20);
  vehicleCountSlider.position(20, 179);
  vehicleCountSlider.style('width', '200px');

  const nbVehicles = 20;
  for(let i=0; i < nbVehicles; i++) {
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
  }
}

function draw() {
  background(200);
  //background(0, 0, 0, 20);

  vehicles.forEach(vehicle => {
    vehicle.distanceCercle = distanceCercleSlider.value();
    vehicle.wanderRadius = wanderRadiusSlider.value();
    vehicle.displaceRange = displaceRangeSlider.value();
    vehicle.maxSpeed = maxSpeedSlider.value();
    vehicle.maxForce = maxForceSlider.value();
    vehicle.wander();

    vehicle.update();
    vehicle.show();
    vehicle.edges();
  });

  vehicleCountSlider.input(vehicleCountChanged);
  
}

function createVehicles(count) {
  vehicles = []; // Clear existing vehicles
  for (let i = 0; i < count; i++) {
    let vehicle = new Vehicle(random(width), random(height));
    vehicles.push(vehicle);
  }
}

function mousePressed() {
  if (mouseY < height) {
    let vehicle = new Vehicle(mouseX, mouseY);
    vehicles.push(vehicle);
  }
}

function vehicleCountChanged() {
  createVehicles(vehicleCountSlider.value());
}
