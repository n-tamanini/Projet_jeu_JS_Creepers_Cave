class BalleAvecVitesseEtAngle extends Balle {
    vitesse = 3;
    angle = Math.PI / 2;

    constructor(x, y, rayon, couleur, vitesse, angle) {
        super(x, y, rayon, couleur);

        this.vitesse = vitesse;
        this.angle = angle;
    }
    draw(ctx) {
        // On dessine la balle avec un vecteur direction
        super.draw(ctx);

        ctx.save();

        // On dessine un trait dans la direction de la balle
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(100 + (this.vitesse * 5), 0);

        ctx.lineWidth = 3;
        ctx.stroke();

        ctx.restore();
    }
    move() {
        this.x += Math.cos(this.angle) * this.vitesse;
        this.y += Math.sin(this.angle) * this.vitesse;
    }

}