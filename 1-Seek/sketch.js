let target, vehicle;
let vehicule;
let speedSlider, forceSlider;

// la fonction setup est appelée une fois au démarrage du programme par p5.js
function setup() {
  // on crée un canvas de 800px par 800px
  createCanvas(800, 800);

  vehicle = new Vehicle(100, 100);

  // Etape 2.1 de l'exercice de TP
  // Sliders pour régler la vitesse et la force
  speedSlider = createSlider(1, 20, 10, 1);
  speedSlider.position(10, 30);

  forceSlider = createSlider(0.1, 5, 0.25, 0.1);
  forceSlider.position(10, 60);

  // TODO: créer un tableau de véhicules en global
  // ajouter nb vehicules au tableau dans une boucle
  // avec une position random dans le canvas

  // La cible est un vecteur avec une position aléatoire dans le canvas
  //target = createVector(random(width), random(height));
  target = new Target(random(width), random(height));
}

// la fonction draw est appelée en boucle par p5.js, 60 fois par seconde par défaut
// Le canvas est effacé automatiquement avant chaque appel à draw
function draw() {
  // fond noir pour le canvas
  background(200);

  target.update();
  target.show();

  // Etape 2.2 de l'exercice de TP
  // Mettre à jour la vitesse et la force du véhicule
  vehicle.maxSpeed = speedSlider.value();
  vehicle.maxForce = forceSlider.value();

  // A partir de maintenant toutes les formes pleines seront en rouge
  fill("red");
  // pas de contours pour les formes.
  noStroke();

  // mouseX et mouseY sont des variables globales de p5.js, elles correspondent à la position de la souris
  // on les stocke dans un vecteur pour pouvoir les utiliser avec la méthode seek (un peu plus loin)
  // du vehicule

  target.pos.x = mouseX;
  target.pos.y = mouseY;

  // Dessine un cercle de rayon 32px à la position de la souris
  // la couleur de remplissage est rouge car on a appelé fill(255, 0, 0) plus haut
  // pas de contours car on a appelé noStroke() plus haut
  circle(target.x, target.y, 32);

  // je déplace et dessine le véhicule
    //vehicle.applyBehaviors(target);
    vehicle.applyBehaviors(target.pos);
    vehicle.update();
    vehicle.show();

  // Etape 2.3 de l'exercice de TP
  //Labels pour les sliders
  fill(255,100,20);
  text("Vitesse", 160, 40);

  fill(210,105,0);
  text("Force", 160, 70);

    // TODO: boucle sur le tableau de véhicules
  // pour chaque véhicule : seek, update, show
}
