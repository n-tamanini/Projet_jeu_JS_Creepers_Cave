window.onload = main;

let canvas;
let ctx;

let monstre = {
  x: 100,
  y: 100,
  l: 200,
  h: 200,
  angle: 0,
  vitesseX: 0,
  vitesseY: 0 ,
  donneTonNom: function () {
    return "Je m'appelle Paul, je suis en x= " + this.x + " y=" + this.y;
  },
  draw: function (ctx) {
    // bonne pratique : sauver le contexte courant
    // couleur courante, taille du trait, etc. avant
    // de dessiner ou de modifier qq chose dans le contexte
    ctx.save();

    ctx.translate(this.x - 400, this.y - 10);
    //ctx.rotate(0.2);

    ctx.fillRect(400, 10, this.l, this.h);
    ctx.fillStyle = "red";
    // yeux
    ctx.fillRect(440, 50, 20, 20);
    ctx.fillStyle = "white";
    ctx.fillRect(450, 60, 10, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(540, 50, 20, 20);
    ctx.fillStyle = "white";
    ctx.fillRect(450, 60, 10, 10);
    // bouche
    ctx.fillRect(440, 140, 120, 20);

    // On restaure le contexte
    ctx.restore();
  },
  move: function () {
    this.x += this.vitesseX;
    this.y += this.vitesseY;
  },
};

// programme principal
function main() {
  console.log(
    "Page chargée ! DOM ready ! Toutes les resources de la page sont utilisables (videos, images, polices etc."
  );
  // On récupère grace à la "selector API" un pointeur sur le canvas
  canvas = document.querySelector("#myCanvas");

  // pour dessiner, on a besoin de son "contexte graphique", un objet qui
  // va permettre de dessiner, ou de changer les propriétés du canvas
  // (largeur du trait, couleur, repère, etc.)

  ctx = canvas.getContext("2d");

  console.log(monstre.donneTonNom());

  requestAnimationFrame(animationLoop);
}

// animation à 60 images/s
function animationLoop() {
  // 1 on efface le canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 2 On dessine les objets

  monstre.draw(ctx);

  // 3 on déplace les objets
  monstre.move();

  // 4 on peut faire autre chose (par ex: detecter des collisions,
  // ou prendre en compte le clavier, la souris, la manette de jeu)
  traiteCollisionsAvecBords();

  // 5 On demande au navigateur de rappeler la fonction
  // animationLoop dans 1/60ème de seconde
  requestAnimationFrame(animationLoop);
}

function traiteCollisionsAvecBords() {
  if (monstre.x > canvas.width - monstre.l) {
    //console.log("COLLISION A DROITE");
    // truc à savoir, pour ne pas que l'objet donne l'impression
    // d'aller plus loin que le bord de l'écran, on le remet au point de
    // contact
    monstre.x = canvas.width - monstre.l;
    monstre.vitesseX = -monstre.vitesseX;
  } else if (monstre.x < 0) {
    //console.log("COLLISION A GAUCHE");
    monstre.x = 0; // point de contact
    monstre.vitesseX = -monstre.vitesseX;
  }
    
    if (monstre.y < 0) {
        monstre.y = 0;
        monstre.vitesseY = -monstre.vitesseY;
    } else if (monstre.y + monstre.h > canvas.height) {
        monstre.y = canvas.height - monstre.h;
        monstre.vitesseY = -monstre.vitesseY;
    }
}
