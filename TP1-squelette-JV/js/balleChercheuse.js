class BalleChercheuse extends BalleAvecVitesseEtAngle {
    target = {};

    constructor(x, y, rayon, couleur, vitesse) {
        // Contructeur de la classe mère
        super(x, y, rayon, couleur, vitesse, 0);
    }

    setTarget(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    distanceToTarget() {
        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;

        return Math.sqrt(dx * dx + dy * dy);
    }

    move() {
        // Si aucune cible est définie, on ne fait rien
        if (this.target.x === undefined) return;
        // On se dirige vers la cible

        // On calcule l'angle entre la position courante de la balle et la cible

        let dx = this.target.x - this.x;
        let dy = this.target.y - this.y;
        this.angle = Math.atan2(dy, dx);

        if (this.distanceToTarget() < 3) return;

        super.move();
    }
}