class BalleChercheuseImage extends BalleChercheuse {

    image;

    constructor(x, y, rayon, urlImage, vitesse) {
        super(x, y, rayon, "black", vitesse);

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