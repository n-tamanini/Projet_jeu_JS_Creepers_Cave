class Balle {
    x;
    y;
    rayon;
    couleur = "black";
    role;

    constructor(x, y, rayon, couleur, role) {
        this.x = x;
        this.y = y;
        this.rayon = rayon;
        this.couleur = couleur;
        this.role = role;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);

        // dessin d'un cercle
        ctx.beginPath();
        ctx.arc(0, 0, this.rayon, 0, 2 * Math.PI);
        ctx.fillStyle = this.couleur;
        ctx.fill();

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.restore();
    }
    move() {
    }
}