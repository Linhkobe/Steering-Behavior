class Vehicle {
  constructor(x, y) {
    // position du véhicule
    this.pos = createVector(x, y);
    // vitesse du véhicule
    this.vel = createVector(0, 0);
    // accélération du véhicule
    this.acc = createVector(0, 0);
    // vitesse maximale du véhicule
    this.maxSpeed = 10;
    // force maximale appliquée au véhicule
    this.maxForce = 0.25;
    // rayon du véhicule
    this.r = 16;
  }

  applyBehaviors(target) {
    //let force = this.seek(target);
    //this.applyForce(force);

    
      // Etape 3.1 de l'exercice de TP
      let fleeForce = this.flee(target);
      let seekForce = this.seek(target);

      let distance = p5.Vector.dist(this.pos, target);

      // Etape 4 de l'exercice de TP
      if (distance < this.r) {
        target.visible = false;

        // Etape 7 de l'exercice de TP
        setTimeout(() => {
        //this.pos = createVector(random(width), random(height));
        // Etape 6 de l'exercice de TP
        target.x = random(width);
        target.y = random(height);
        },500);
      } else {
        if (distance < 100) {
          this.applyForce(fleeForce);
        } else {
          this.applyForce(seekForce);
        }
      }
    
  }

  // seek est une méthode qui permet de faire se rapprocher le véhicule de la cible passée en paramètre
  seek(target) {
    // on calcule la direction vers la cible
    // C'est l'ETAPE 1 (action : se diriger vers une cible)
    let force = p5.Vector.sub(target, this.pos);

    // Dessous c'est l'ETAPE 2 : le pilotage (comment on se dirige vers la cible)
    // on limite ce vecteur à la longueur maxSpeed
    force.setMag(this.maxSpeed);

    // Si on s'arrête ici, force = desiredSpeed

    // on calcule maintenant force = desiredSpeed - currentSpeed
    force.sub(this.vel);
    // et on limite cette force à la longueur maxForce
    force.limit(this.maxForce);
    return force;
  }

  flee(target) {
    // inverse de seek !
    return this.seek(target).mult(-1);
  }

  // applyForce est une méthode qui permet d'appliquer une force au véhicule
  // en fait on additionne le vecteurr force au vecteur accélération
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // on ajoute l'accélération à la vitesse. L'accélération est un incrément de vitesse
    // (accélératiion = dérivée de la vitesse)
    this.vel.add(this.acc);
    // on contraint la vitesse à la valeur maxSpeed
    this.vel.limit(this.maxSpeed);
    // on ajoute la vitesse à la position. La vitesse est un incrément de position, 
    // (la vitesse est la dérivée de la position)
    this.pos.add(this.vel);

    // on remet l'accélération à zéro
    this.acc.set(0, 0);

    // Etape 1 de l'exericice de TP
    this.edges();
  }

  // On dessine le véhicule
  show() {

    // Etape 3.2 de l'exercice de TP
    let distance = p5.Vector.dist(this.pos, target.pos);
    if (distance < 100) {
      fill("red");
    } else {
      fill("white");
    }
    // formes fil de fer en blanc
    stroke(255);
    // épaisseur du trait = 2
    strokeWeight(2);

    // formes pleines en blanc
    //fill(255);

    // sauvegarde du contexte graphique (couleur pleine, fil de fer, épaisseur du trait, 
    // position et rotation du repère de référence)
    push();
    // on déplace le repère de référence.
    translate(this.pos.x, this.pos.y);
    // et on le tourne. heading() renvoie l'angle du vecteur vitesse (c'est l'angle du véhicule)
    rotate(this.vel.heading());

    // Dessin d'un véhicule sous la forme d'un triangle. Comme s'il était droit, avec le 0, 0 en haut à gauche
    triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
    // Que fait cette ligne ?
    //this.edges();

    // draw velocity vector
    pop();
    //this.drawVelocityVector();
  }

  drawVelocityVector() {
    push();
    // Dessin du vecteur vitesse
    // Il part du centre du véhicule et va dans la direction du vecteur vitesse
    strokeWeight(3);
    stroke(255, 0, 0);
    line(this.pos.x, this.pos.y, this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
    // dessine une petite fleche au bout du vecteur vitesse
    let arrowSize = 5;
    translate(this.pos.x + this.vel.x * 10, this.pos.y + this.vel.y * 10);
    rotate(this.vel.heading());
    translate(-arrowSize / 2, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }
  
  // que fait cette méthode ?
  // elle permet de faire réapparaitre le véhicule de 
  // l'autre côté du canvas
  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }
}

// Etape 5 de l'exercice de TP
class Target extends Vehicle {
  constructor(x, y) {
    super(x, y);
    this.vel = createVector(random(4, 8), random(4, 8));
    this.visible = true;
  }

  show() {
    if (this.visible) {
    fill("blue");
    noStroke();
    circle(this.pos.x, this.pos.y, 32);
    }
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }
}