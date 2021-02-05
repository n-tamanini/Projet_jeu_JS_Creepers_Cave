function traiteMouseDown(event) {

    // Ex d'utilisation de l'API du DOM pour modifier du contenu html
    /* let spanNiveau = document.querySelector("#niveau");
     spanNiveau.innerHTML = "<i>" + niveauCourant++ + "</i>";*/

    switch (etatJeu) {
        case "MenuPrincipal":
            changeMusique(assets.musique_jeu_en_cours);
            rendJoueurInvincibleTemporairement(dureeInvincibiliteTemporaireDebut);
            etatJeu = "JeuEnCours";
            break;
        case "EcranChangementNiveau":
            passeNiveauSuivant();
            break;
        case "GameOver":
            etatJeu = "MenuPrincipal";
            initialiserNouvellePartie();
            break;
    }
}

function traiteMouseUp(event) {
    //console.log("souris relâchée dans le canvas " + event.button);
}

function traiteMouseMove(event) {
    // Pour prendre en compte les marges, le css, ...
    var rect = canvas.getBoundingClientRect();

    mousePosX = event.clientX - rect.left;
    mousePosY = event.clientY - rect.top;

    monstre.setPos(mousePosX, mousePosY);

    tableauDesBalles.forEach((b) => {
        if (b instanceof BalleChercheuseImage) {
            b.setTarget(mousePosX, mousePosY);
        }
    });
}

function traiteKeyDown(event) {
    //console.log("touche enfoncée dans le canvas " + event.key);
    switch (event.key) {
        case "ArrowLeft":
            monstre.vitesseX = -10;
            break;
        case "ArrowRight":
            monstre.vitesseX = 10;
            break;
        case "ArrowUp":
            monstre.vitesseY = -10;
            break;
        case "ArrowDown":
            monstre.vitesseY = 10;
            break;
    }
}

function traiteKeyUp(event) {
    //console.log("touche enfoncée dans le canvas " + event.key);
    switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
            monstre.vitesseX = 0;
            break;
        case "ArrowUp":
        case "ArrowDown":
            monstre.vitesseY = 0;
            break;
    }
}

// Pour avoir un cavas responsive

// Inspiré de : https://isaiahnixon.com/dynamic-canvas/

window.addEventListener('resize', () => {
    // Clear the canvas.
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    setUpCanvas();

    // On redessine le monstre (règle un bug : quand on redimensionait sans ce code, le monstre devenait tout noir ...)
    if(etatJeu == "JeuEnCours"){
        ctx.fillStyle = gradient_green;
        monstre.draw(ctx);
    }

});
