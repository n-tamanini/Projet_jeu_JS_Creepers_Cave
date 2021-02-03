function traiteMouseDown(event) {
    //console.log("souris cliquée en x = " + mousePos.x + " et en y = " + mousePos.y);
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
            monstre.vitesseY = -0;
            break;
    }
}
