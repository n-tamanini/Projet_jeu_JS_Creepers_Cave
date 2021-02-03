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