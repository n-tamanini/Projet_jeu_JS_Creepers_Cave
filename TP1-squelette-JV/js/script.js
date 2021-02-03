window.onload = main;

let canvas;
let ctx;
let gradient_green;
let gradient_red;
let colors = [];
let currentColor = 0;

// Ici, on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];

// Programme principal
function main() {
    console.log("page chargée ! DOM ready ! Toutes les ressources de la page sont utilisables (vidéos, images, polices ...)");

    // On récupère grace à la selector API un pointeur vers le canvas
    canvas = document.querySelector("#myCanvas");

    // On ajoute des écouteurs sur le canvas
    canvas.onmousedown = traiteMouseDown;
    canvas.onmouseup = traiteMouseUp;
    canvas.onmousemove = traiteMouseMove;

    // On peut détecter les touche que si il y a le focus sur le canvas
    // Donc on détecte sur le document entier (plus simple)
    document.onkeydown = traiteKeyDown;
    document.onkeyup = traiteKeyUp;

    //canvas.addEventListener("mousedown", traiteMouseDown);


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

    creerDesBalles(10);

    requestAnimationFrame(animationLoop);

    setInterval(changeColor, 1000);

}

function creerDesBalles(nb) {
    let tabCouleurs = ["blue", "black", "yellow", "orange", "purple"];
    for (let i = 0; i < nb; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = Math.random() * 30;
        let indexCouleur = Math.floor(Math.random() * tabCouleurs.length);
        let couleur = tabCouleurs[indexCouleur];
        let vx = -5 + Math.random() * 10;
        let vy = -5 + Math.random() * 10;

        let b = new Balle(x, y, r, couleur, vx, vy);
        tableauDesBalles.push(b);
    }
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

    updateBalles();

    traiteCollisionsJoueurAvecBords();

    // On demande au navigateur de rappeler la fonction animationloop dans 1/60 seconde
    requestAnimationFrame(animationLoop);
}

function updateBalles() {
    tableauDesBalles.forEach((b) => {
        b.draw(ctx);
        traiteCollisionsBalleAvecBords(b);
        b.move();
    })
}

