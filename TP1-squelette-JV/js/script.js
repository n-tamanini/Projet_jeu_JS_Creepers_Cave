window.onload = main;

let canvas;
let ctx;

let monstre = {
    x: 100,
    y: 50,
    l: 200,
    h: 200,
    angle: 0,
    vitesseX: 3,
    vitesseY: 2,
    donneTonNom: function () {
        return "Je m'appelle Creepy le creeper, je suis en x = " + this.x + " et en y = " + this.y
    },
    draw: function (ctx) {
        // Bonne pratique : sauver le contexte courant avant de dessiner ou de modifier qqch dans le contexte
        ctx.save();

        ctx.translate(this.x, this.y);
        //ctx.rotate(0);

        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, this.l, this.h);
        ctx.fillStyle = "black";
        // Yeux
        ctx.fillRect(40, 30, 40, 40);
        ctx.fillRect(120, 30, 40, 40);
        // Bouche
        ctx.fillRect(80, 70, 40, 40);
        ctx.fillRect(60, 90, 80, 40);
        ctx.fillRect(60, 100, 20, 50);
        ctx.fillRect(120, 100, 20, 50);
        /*
                    ctx.strokeStyle = "rgb(81,255,0)";
                    ctx.lineWidth = 10;
                    ctx.strokeRect(200, 300, 50, 50);
        */

        // On restaure le contexte
        ctx.restore();
    },
    move: function () {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
    }
}


// Programme principal
function main() {
    console.log("page chargée ! DOM ready ! Toutes les ressources de la page sont utilisables (vidéos, images, polices ...)");

    // On récupère grace à la selector API un pointeur vers le canvas
    canvas = document.querySelector("#myCanvas");

    // pour dessiner, on a besoin de son "contexte graphique", un pbjet qui va 
    // permettre de dessiner ou de changer les propriétés du canvas
    ctx = canvas.getContext("2d");

    console.log(monstre.donneTonNom());

    requestAnimationFrame(animationLoop);
}

// Animation à 60 images/s
function animationLoop() {
    // On efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // On dessine les objects
    monstre.draw(ctx);

    // On déplace les objets
    monstre.move();

    traiteCollisionsAvecBords();

    // On demande au navigateur de rappeler la fonction animationloop dans 1/60 seconde
    requestAnimationFrame(animationLoop);
}

function traiteCollisionsAvecBords() {
    if (monstre.x > canvas.width - monstre.l) {
        //console.log("Collision à droite");
        // Truc à savoir pour ne pas que l'objet donne 
        // l'impression d'aller plus loin que le bord de l'écran, on le remet au point de contact
        monstre.x = canvas.width - monstre.l;
        monstre.vitesseX = -monstre.vitesseX;
    } else if (monstre.x < 0) {
        monstre.x = 0;
        //console.log("Collision à gauche");
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

