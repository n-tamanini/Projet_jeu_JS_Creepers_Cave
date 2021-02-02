window.onload = main;

let canvas;
let ctx;
let gradient_green;
let gradient_red;
let colors = [];
let currentColor = 0;

let monstre = {
    x: 100,
    y: 100,
    l: 40,
    h: 40,
    radius: 40,
    angle: 0,
    vitesseX: 1,
    vitesseY: 3,
    donneTonNom: function () {
        return "Je m'appelle Creepy le creeper, je suis en x = " + this.x + " et en y = " + this.y
    },
    draw: function (ctx) {
        // Bonne pratique : sauver le contexte courant avant de dessiner ou de modifier qqch dans le contexte
        ctx.save();

        ctx.translate(this.x, this.y);

        ctx.beginPath();

        ctx.arc(0, 0, monstre.radius, 0, 2 * Math.PI, false);

        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(-23, -20, 15, 15);
        ctx.rect(7, -20, 15, 15);
        ctx.rect(-8, -5, 15, 15);
        ctx.rect(-16, 3, 31, 15);
        ctx.rect(-16, 3, 8, 22);
        ctx.rect(8, 3, 8, 22);

        ctx.fill();

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

    gradient_green = ctx.createLinearGradient(-monstre.radius, 0, monstre.radius, monstre.radius);
    gradient_green.addColorStop(0, "darkgreen");
    gradient_green.addColorStop(0.5, "lightgreen");
    gradient_green.addColorStop(1, "white");

    gradient_red = ctx.createLinearGradient(-monstre.radius, 0, monstre.radius, monstre.radius);
    gradient_red.addColorStop(0, "darkred");
    gradient_red.addColorStop(0.5, "red");
    gradient_red.addColorStop(1, "white");

    colors = [gradient_green, gradient_red];

    console.log(monstre.donneTonNom());

    requestAnimationFrame(animationLoop);

    setInterval(changeColor, 1000);
    
}

function changeColor() {
    ctx.fillStyle = colors[currentColor % 2];
    currentColor += 1;
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

    // Truc à savoir pour ne pas que l'objet donne 
    // l'impression d'aller plus loin que le bord de l'écran, on le remet au point de contact

    if (monstre.x > canvas.width - monstre.radius) {
        // Collision à droite"
        monstre.x = canvas.width - monstre.radius;
        monstre.vitesseX = -monstre.vitesseX;
    } else if (monstre.x - monstre.radius < 0) {
        // Collision à gauche"
        monstre.x = monstre.radius;
        monstre.vitesseX = -monstre.vitesseX;
    }
    if (monstre.y - monstre.radius < 0) {
        // Collision en haut"
        monstre.y = monstre.radius;
        monstre.vitesseY = -monstre.vitesseY;
    } else if (monstre.y + monstre.radius > canvas.height) {
        // Collision en bas"
        monstre.y = canvas.height - monstre.radius;
        monstre.vitesseY = -monstre.vitesseY;
    }

}

