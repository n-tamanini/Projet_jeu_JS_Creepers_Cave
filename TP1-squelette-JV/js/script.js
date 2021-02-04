window.onload = main;

let canvas;
let ctx;
let gradient_green;
let gradient_red;
let colors = [];
let currentColor = 0;
let niveauCourant;
let nbVies;
let score;
let isPlayerInvincible;

let etatJeu = "MenuPrincipal";
//let etatJeu = "EcranChangementNiveau";
//let etatJeu = "GameOver";

// Ici, on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];

let balleChercheuse;

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

    gradient_yellow = ctx.createLinearGradient(-monstre.radius, 0, monstre.radius, monstre.radius);
    gradient_yellow.addColorStop(0, "orange");
    gradient_yellow.addColorStop(0.5, "yellow");
    gradient_yellow.addColorStop(1, "white");

    gradient_red = ctx.createLinearGradient(-monstre.radius, 0, monstre.radius, monstre.radius);
    gradient_red.addColorStop(0, "darkred");
    gradient_red.addColorStop(0.5, "red");
    gradient_red.addColorStop(1, "white");

    colors = [gradient_yellow, gradient_red];

    console.log(monstre.donneTonNom());

    initialiserNouvellePartie();

    creerDesBalles(niveauCourant);

    requestAnimationFrame(animationLoop);

    //setInterval(changeColor, 1000);

}

function initialiserNouvellePartie(){
    isPlayerInvincible = true;
    nbVies = 10;
    score = 0;
    niveauCourant = 1;
} 

function creerDesBalles(niveauCourant) {
    tableauDesBalles = [];

    // Balles ennemies
    for (let i = 0; i < niveauCourant / 2; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = (Math.random() + 0.5) * 20;
        let couleur = "red";
        let vx = -5 + Math.random() * 10;
        let vy = -5 + Math.random() * 10;

        let b = new BalleAvecVitesseXY(x, y, r, couleur, vx, vy);
        tableauDesBalles.push(b);
    }

    // Balles amies
    for (let i = 0; i < niveauCourant * 2; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = (Math.random() + 0.5) * 20;
        let couleur = "green";
        let vx = -5 + Math.random() * 10;
        let vy = -5 + Math.random() * 10;

        let b = new BalleAvecVitesseXY(x, y, r, couleur, vx, vy);
        tableauDesBalles.push(b);
    }

    // Balle à tête chercheuse
    balleChercheuse = new BalleChercheuse(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        40,
        "red",
        1+(niveauCourant/4),
    );
    tableauDesBalles.push(balleChercheuse);

}

function changeColor() {
    ctx.fillStyle = colors[currentColor % 2];
    currentColor += 1;
}

function afficheInfoJeu() {
    ctx.save();
    ctx.fillStyle = "Black";
    ctx.font = "30pt Blue";
    ctx.fillText("Niveau : " + niveauCourant, 1000, 40);
    ctx.fillText("Score : " + score, 480, 40);
    ctx.fillText("Vies : " + nbVies, 10, 40);
    ctx.restore();
}

// Animation à 60 images/s
function animationLoop() {
    // On efface le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (etatJeu) {
        case "MenuPrincipal":
            canvas.style.cursor = "pointer";
            afficheMenuPrincipal();
            break;
        case "JeuEnCours":
            canvas.style.cursor = "none";
            updateJeu();
            break;
        case "EcranChangementNiveau":
            canvas.style.cursor = "pointer";
            afficheEcranChangementNiveau();
            break;
        case "GameOver":
            canvas.style.cursor = "pointer";
            afficheEcranGameOver();
    }
    // On demande au navigateur de rappeler la fonction animationloop dans 1/60 seconde
    requestAnimationFrame(animationLoop);
}

function afficheMenuPrincipal() {
    ctx.save();
    ctx.translate(600, 400);
    ctx.fillStyle = "Black";
    ctx.font = "50pt Blue";
    ctx.fillText("MENU PRINCIPAL", -300, -200);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour démarrer", -240, 50);
    ctx.restore();
}

function updateJeu() {

    // On dessine les objects
    monstre.draw(ctx);

    // On déplace les objets
    monstre.move();

    updateBalles();

    traiteCollisionsJoueurAvecBords();
    afficheInfoJeu();

    // On demande au navigateur de rappeler la fonction animationloop dans 1/60 seconde
    //requestAnimationFrame(animationLoop);

    if (niveauFini()) {
        etatJeu = "EcranChangementNiveau";
    }

    if (nbVies <= 0) {
        etatJeu = "GameOver";
    }
}

function afficheEcranChangementNiveau() {
    ctx.save();
    ctx.translate(600, 400);
    ctx.fillStyle = "Black";
    ctx.font = "50pt Blue";
    ctx.fillText("Niveau " + niveauCourant + " terminé !", -300, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Nombre de vies : " + nbVies, -180, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour passer au niveau suivant", -380, 200);
    ctx.restore();
}

function afficheEcranGameOver() {
    ctx.save();
    ctx.translate(600, 400);
    ctx.fillStyle = "Black";
    ctx.font = "50pt Blue";
    ctx.fillText("Partie perdue :( ", -250, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Niveau atteint : " + niveauCourant, -160, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour revenir au menu principal", -380, 200);
    ctx.restore();

}

function niveauFini() {
    let countGreenBalls = 0;
    tableauDesBalles.forEach((b) => {
        if (b.couleur == "green") {
            countGreenBalls++;
        }
    });
    if (countGreenBalls == 0) {
        return true;
    } else {
        return false;
    }
}

function updateBalles() {
    tableauDesBalles.forEach((b) => {
        b.draw(ctx);
        traiteCollisionsBalleAvecBords(b);
        traiteCollisionJoueurAvecBalles(b);
        b.move();
    });

}

function rendJoueurVulnerable(){
    isPlayerInvincible = false;
    console.log("joueur vunlérable");
}

function rendJoueurVulnerableDans2Sec(){
    setTimeout((rendJoueurVulnerable),2000);
}

function passeNiveauSuivant() {
    isPlayerInvincible = true;
    console.log("joueur invincible");
    rendJoueurVulnerableDans2Sec();
    niveauCourant += 1;
    creerDesBalles(niveauCourant);
    etatJeu = "JeuEnCours";
}
