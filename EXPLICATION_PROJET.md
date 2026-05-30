# Documentation du Projet: Portfolio de Djakoua Kwankam Brayan Steve

Cette documentation a pour but de vous aider à comprendre comment votre portfolio est structuré, ligne par ligne et fichier par fichier. Elle explique aussi l'architecture globale que nous avons mise en place.

## 1. Architecture Globale

Le projet a été pensé pour être modulaire, performant et lisible. 
Afin de ne pas avoir de fichiers qui font des milliers de lignes de code (ce qui serait illisible), le projet est découpé logiquement.

Voici la structure de votre projet :
- `index.html` : C'est la fondation, la structure principale du site. Il contient les textes, les liens et la disposition des sections (Accueil, Projets, Compétences, Jeu, Contact).
- `assets/css/style.css` : Contient tout le style visuel de la page (les couleurs, les ombres "glassmorphism", les gradients et les mises en page). 
- `assets/js/script.js` : Gère l'interactivité globale (le jeu de casse-briques, l'animation du texte qui s'écrit tout seul, et les apparitions fluides au défilement).
- `assets/rubiks-cube/` : Un sous-projet complètement indépendant qui contient le Rubik's Cube 3D et sa propre logique. 

---

## 2. Explication du code : `index.html`

L'`index.html` est le squelette du site. Il se lit de haut en bas :
- **`<head>`** : Contient les métadonnées (titre, polices Google Fonts, icônes FontAwesome). C'est là que l'on lie le CSS.
- **Le Preloader (`<div id="preloader">`)** : C'est l'écran noir avec le cube vert qui tourne au chargement. Il s'appuie sur une animation CSS (`@keyframes`). Un script JavaScript caché juste en dessous attend 1.5 secondes avant de masquer cet écran (via `opacity: 0`).
- **La Navbar (`<header class="navbar">`)** : La barre de navigation figée en haut avec vos liens ancrés (`href="#projets"` par exemple, qui fait glisser la page vers l'ID correspondant).
- **La section Accueil (`<section id="accueil">`)** : 
  - La partie de gauche contient votre texte de présentation (qui s'écrit automatiquement grâce au fichier `script.js`).
  - La partie de droite contient votre photo de profil (`assets/images/photo-profil.jpg`) et l'**`<iframe>`** qui charge le Rubik's cube. L'iframe est une "fenêtre" qui affiche le code d'un autre fichier html (celui du Rubik's cube) sans polluer le code principal.
- **La section Projets (`<section id="projets">`)** : Elle contient des "cartes" (`.detailed-project-card`). La troisième carte (Calculatrice) contient exceptionnellement le code HTML d'une grille de boutons (`<button class="calc-btn">`) et un petit `<script>` intégré pour faire fonctionner les maths de la calculatrice immédiatement sans avoir à recharger la page (avec la fonction JS `eval()`).
- **La section Compétences (`<section id="competences">`)** : Contient des icônes et des barres de progression. Les animations de chargement des barres sont déclenchées par `script.js` lorsque vous scrollez vers le bas.
- **Le Casse-Briques (`<section id="game-section">`)** : Il y a une balise `<canvas id="gameCanvas">`. Le canvas est une zone de dessin vide. Tout le jeu est dessiné image par image par JavaScript.

---

## 3. Explication du code : Le Rubik's Cube (`assets/rubiks-cube/`)

C'est un mini-projet à part entière.
- **`Index.html`** : Contient 26 balises `div` de classe `.piece`. Chaque pièce correspond à un petit cube du Rubik's cube global. On y trouve aussi les deux boutons "Hasard" et "Correction".
- **`Index.css`** : Utilise la propriété CSS `transform-style: preserve-3d` et `rotateX/Y/Z` pour placer physiquement dans un espace 3D les 26 petits cubes afin de former un grand cube.
- **`Index.js`** : C'est le cœur mathématique du Rubik's cube.
  - La fonction `mouseDown()` (que j'ai modifiée) écoute les clics de souris ET les mouvements de doigts (`touchstart`, `touchmove`). Elle calcule la différence de coordonnées `X` et `Y` pour faire tourner le cube entier ou une seule tranche.
  - La fonction `scrambleCube()` tourne les pièces 30 fois aléatoirement en utilisant un `Math.random()`.

---

## 4. Explication du code : `script.js`

Le fichier principal JavaScript (`assets/js/script.js`) gère les animations complexes du portfolio :
- **L'effet machine à écrire (`Typewriter Effect`)** : Le code prend un mot comme "Architecte Logiciel", découpe ses lettres, et ajoute une lettre toutes les 100 millisecondes dans la balise HTML. Ensuite, il efface le mot et passe au suivant ("Développeur C++", etc.).
- **Fade-up Observers (`IntersectionObserver`)** : Un objet JavaScript observe votre écran en temps réel. Dès qu'une section (comme vos projets) entre dans le champ visuel, le script lui ajoute la classe CSS `.visible`, ce qui déclenche une animation pour la faire apparaître doucement de bas en haut.
- **Le Jeu Casse-Briques** : C'est une boucle `requestAnimationFrame` qui s'exécute 60 fois par seconde (comme un jeu vidéo classique). À chaque image (frame), le code efface le canvas entier (`clearRect`), redessine la raquette à la position de votre souris, redessine la balle en calculant sa nouvelle position (`X + vitesseX`, `Y + vitesseY`), et vérifie si la balle touche une brique. Si oui, il casse la brique et inverse la trajectoire de la balle.

Grâce à cette architecture, le code est propre. Si vous voulez modifier les couleurs, vous ouvrez le CSS. Si vous voulez modifier un texte, vous ouvrez l'HTML, et si vous voulez changer un comportement, vous touchez au JS.
