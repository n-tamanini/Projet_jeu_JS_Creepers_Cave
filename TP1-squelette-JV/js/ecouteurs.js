function traiteMouseDown(event) {

    // Ex d'utilisation de l'API du DOM pour modifier du contenu html
    /* let spanNiveau = document.querySelector("#niveau");
     spanNiveau.innerHTML = "<i>" + niveauCourant++ + "</i>";*/

    switch (etatJeu) {
        case "MenuPrincipal":
            rendJoueurInvincibleTemporairement();
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

    if (balleChercheuse !== undefined) {
        balleChercheuse.setTarget(mousePosX, mousePosY);
    }
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
