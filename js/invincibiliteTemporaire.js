function rendJoueurInvincibleTemporairement(temps) {
    setTimeout((rendJoueurVulnerable), temps);
    rendJoueurInvincible();
}

function rendJoueurVulnerable() {
    isPlayerInvincible = false;
}

function rendJoueurInvincible() {
    isPlayerInvincible = true;
    faireClignoterLeMonstre();
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

function changeColor() {
    ctx.fillStyle = colors[currentColor % 2];
    currentColor += 1;
}