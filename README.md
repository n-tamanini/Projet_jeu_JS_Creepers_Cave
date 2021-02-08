# Projet - Développement d'un jeu vidéo en JS

## Auteur : Nicolas TAMANINI

Jeu vidéo Creeper's Cave développé dans le cadre du cours JavaScript de M. Buffa (MBDS ESTIA)

Le jeu garde le gameplay développé en live coding pendant les cours :
Nous contrôlons un monstre qui doit manger des items rebondissant sur les parois du canvas, et éviter d'autres items ayant le même comportement. 
Il y a également un ennemi à tête chercheuse qui essaye de suivre et de tuer le monstre.


Pour ce projet, l'accent a été mis sur : 

- le design (inspiré du jeu Minecraft)
- le canvas responsive qui prend toute la page web et qui s'adapte quand l'utilisateur redimensionne la fenêtre
- la difficulté progressive (à chaque niveau, de nouveaux ennemis apparaissent et le monstre doit manger plus d'items)
- la jouabilité 
    - Quand un niveau commence, le monstre est invincible temporairement au cas où il apparaîtrait sur un ennemi, et il clignote.
    - Quand le monstre est touché par un ennemi, il perd une vie et est invincible temporairement (il clignote aussi dans ce cas).
    
   
## Démo du jeu : https://n-tamanini.github.io/Projet_jeu_JS_Creepers_Cave/
