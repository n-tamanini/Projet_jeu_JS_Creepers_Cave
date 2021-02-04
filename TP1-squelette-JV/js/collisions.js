function traiteCollisionsJoueurAvecBords() {

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

function traiteCollisionsBalleAvecBords(b) {
    if (!b instanceof BalleAvecVitesseXY) return;

    // Truc à savoir pour ne pas que l'objet donne 
    // l'impression d'aller plus loin que le bord de l'écran, on le remet au point de contact

    if (b.x > canvas.width - b.rayon) {
        // Collision à droite"
        b.x = canvas.width - b.rayon;
        b.vitesseX = -b.vitesseX;
    } else if (b.x - b.rayon < 0) {
        // Collision à gauche"
        b.x = b.rayon;
        b.vitesseX = -b.vitesseX;
    }
    if (b.y - b.rayon < 0) {
        // Collision en haut"
        b.y = b.rayon;
        b.vitesseY = -b.vitesseY;
    } else if (b.y + b.rayon > canvas.height) {
        // Collision en bas"
        b.y = canvas.height - b.rayon;
        b.vitesseY = -b.vitesseY;
    }

}

function traiteCollisionJoueurAvecBalles(b) {
    if (circleCollide(monstre.x, monstre.y, monstre.radius, b.x, b.y, b.rayon)) {
        if (b.couleur == "green") {
            assets.coin.play();
            let index = tableauDesBalles.indexOf(b);
            tableauDesBalles.splice(index, 1);
            score += 10;
        } else if (b.couleur == "red" && !isPlayerInvincible) {
            assets.scream.play();
            rendJoueurInvincibleTemporairement(dureeInvincibiliteTemporaireToucheParEnnemi);
            if (b instanceof BalleChercheuse) {
                console.log("collision avec balle chercheuse !");
                nbVies -= 3;
            }
            else {
                nbVies--;
            }
        }
    }
}

// Fonctions génériques de collision cercle-cercle, rectangle-rectangle et cercle-rectangle
// Aussi polygone-polygone convexes (algo SAT)
function circleCollide(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    return ((dx * dx + dy * dy) < (r1 + r2) * (r1 + r2));
}