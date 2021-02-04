class BalleImage extends BalleAvecVitesseXY {
    image;

    constructor(x, y, urlImage, vitesseX, vitesseY, role) {
        super(x, y, 30, "black", vitesseX, vitesseY, role);

        this.image = new Image();
        this.image.src = urlImage;

        this.image.onload = function () {
            console.log("BalleImage, image chargée");
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.drawImage(this.image, this.x - 30, this.y - 30, 60, 60);
        ctx.restore();
    }
}