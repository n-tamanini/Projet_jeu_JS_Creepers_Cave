class BalleImage extends BalleAvecVitesseXY {
    image;

    constructor(x, y, rayon, urlImage, vitesseX, vitesseY, role) {
        super(x, y, rayon, "black", vitesseX, vitesseY, role);

        this.image = new Image();
        this.image.src = urlImage;

        this.image.onload = function () {
            //console.log("BalleImage, image chargée");
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x - this.rayon, this.y - this.rayon, 2 * this.rayon, 2 * this.rayon);
        ctx.restore();
    }
}