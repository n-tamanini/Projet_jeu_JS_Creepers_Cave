function changeMusique(m) {
    if (musiqueCourante) {
        musiqueCourante.stop();
    }
    musiqueCourante = m;
    musiqueCourante.play();
}
