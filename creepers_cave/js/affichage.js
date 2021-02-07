function afficheMenuPrincipal() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "White";
    ctx.font = "90pt Blue";
    ctx.fillText("CREEPER'S CAVE", -500, -100);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour démarrer", -215, (canvas.height/6));
    //ctx.font = "20pt Blue";
    //ctx.fillText("Appuyez sur la touche R pour voir les règles", -270, (canvas.height/2.1));
    ctx.restore();
}

function afficheInfoJeu() {
    ctx.save();
    ctx.translate(0, 40);
    ctx.fillStyle = "White";
    ctx.font = "30pt Blue";
    ctx.fillText("Niveau : " + niveauCourant, canvas.width - 230, 0);
    ctx.fillText("Score : " + score, (canvas.width / 2) - 100, 0);
    ctx.fillText("Vies : " + nbVies, 40, 0);
    ctx.restore();
}

function afficheEcranChangementNiveau() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "White";
    ctx.font = "50pt Blue";
    ctx.fillText("Niveau " + niveauCourant + " terminé !", -300, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Nombre de vies : " + nbVies, -180, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour passer au niveau suivant", -380, (canvas.height/2)-50);
    ctx.restore();
}

function afficheEcranGameOver() {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = "White";
    ctx.font = "50pt Blue";
    ctx.fillText("Partie perdue :( ", -250, -200);
    ctx.font = "25pt Blue";
    ctx.fillText("Score : " + score, -120, -50);
    ctx.fillText("Niveau atteint : " + niveauCourant, -160, 0);
    ctx.font = "30pt Blue";
    ctx.fillText("Cliquez pour revenir au menu principal", -380, (canvas.height/2)-50);
    ctx.restore();
}