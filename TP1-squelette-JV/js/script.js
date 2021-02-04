window.onload = main;

let canvas;
let ctx;
let assets;
let gradient_green;
let gradient_red;
let colors = [];
let currentColor = 0;
let niveauCourant;
let nbVies;
let score;
let isPlayerInvincible;
let dureeInvincibiliteTemporaireDebut = 1500;
let dureeInvincibiliteTemporaireToucheParEnnemi = 2000;
let musiqueCourante = null;

let etatJeu = "MenuPrincipal";
//let etatJeu = "EcranChangementNiveau";
//let etatJeu = "GameOver";

// Ici, on va stocker les objets graphiques du jeu, ennemis, etc.
let tableauDesBalles = [];

// Programme principal
function main() {
    console.log("page chargée ! DOM ready ! Toutes les ressources de la page sont utilisables (vidéos, images, polices ...)");

    loadAssets(startGame);

}

function startGame(assetsLoaded) {

    assets = assetsLoaded;


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
    gradient_green.addColorStop(0.5, "green");
    gradient_green.addColorStop(1, "white");

    colors = [gradient_green, "rgb(0,0,0,0)"];

    console.log(monstre.donneTonNom());

    initialiserNouvellePartie();

    requestAnimationFrame(animationLoop);
}

function initialiserNouvellePartie() {
    nbVies = 10;
    score = 0;
    niveauCourant = 1;
    creerDesBalles(niveauCourant)
    changeMusique(assets.musique_menu_principal);
}

function creerDesBalles(niveauCourant) {
    tableauDesBalles = [];

    // Balles ennemies
    for (let i = 0; i < niveauCourant / 2; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let r = (Math.random() + 1) * 20;
        let imgUrl = "assets/images/squelette.png";
        let vx = -5 + Math.random() * 10;
        let vy = -5 + Math.random() * 10;

        let b = new BalleImage(x, y, r, imgUrl, vx, vy, "ennemi");
        tableauDesBalles.push(b);
    }

    // Balles amies
    for (let i = 0; i < niveauCourant * 2; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let rayon = 30;
        let imgUrl = "assets/images/glowstone.png";
        let vx = -5 + Math.random() * 10;
        let vy = -5 + Math.random() * 10;

        let b = new BalleImage(x, y, rayon, imgUrl, vx, vy, "ami");
        tableauDesBalles.push(b);
    }

    // Balles à tête chercheuse
    for (let i = 0; i < niveauCourant / 10; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let rayon = 50;
        let imgUrl = "assets/images/enderman.png";
        let v = 1 + (niveauCourant / 8);

        let b = new BalleChercheuseImage(x, y, rayon, imgUrl, v);
        tableauDesBalles.push(b);
    }

}

function afficheInfoJeu() {
    ctx.save();
    ctx.fillStyle = "White";
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
    ctx.fillStyle = "White";
    ctx.font = "90pt Blue";
    ctx.fillText("CREEPER'S CAVE", -500, -100);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour démarrer", -240, 250);
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
        changeMusique(assets.musique_game_over);
    }
}

function afficheEcranChangementNiveau() {
    ctx.save();
    ctx.translate(600, 400);
    ctx.fillStyle = "White";
    ctx.font = "50pt Blue";
    ctx.fillText("Niveau " + niveauCourant + " terminé !", -300, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Nombre de vies : " + nbVies, -180, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour passer au niveau suivant", -380, 250);
    ctx.restore();
}

function afficheEcranGameOver() {
    ctx.save();
    ctx.translate(600, 400);
    ctx.fillStyle = "White";
    ctx.font = "50pt Blue";
    ctx.fillText("Partie perdue :( ", -250, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Niveau atteint : " + niveauCourant, -160, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour revenir au menu principal", -380, 250);
    ctx.restore();

}

function niveauFini() {
    let countAmi = 0;
    tableauDesBalles.forEach((b) => {
        if (b.role == "ami") {
            countAmi++;
        }
    });
    if (countAmi == 0) {
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

function changeColor() {
    ctx.fillStyle = colors[currentColor % 2];
    currentColor += 1;
}

function faireClignoterLeMonstre() {
    var interv = setInterval(function () {
        changeColor();
        if (!isPlayerInvincible) {
            clearInterval(interv);
            ctx.fillStyle = colors[0];
            currentColor = 1;
        }
    }, 100);
}


function rendJoueurInvincibleTemporairement(temps) {
    setTimeout((rendJoueurVulnerable), temps);
    rendJoueurInvincible();
}


function rendJoueurInvincible() {
    isPlayerInvincible = true;
    faireClignoterLeMonstre();
}

function rendJoueurVulnerable() {
    isPlayerInvincible = false;
}

function passeNiveauSuivant() {
    rendJoueurInvincibleTemporairement(dureeInvincibiliteTemporaireDebut);
    niveauCourant += 1;
    creerDesBalles(niveauCourant);
    etatJeu = "JeuEnCours";
}
