
import { Leaderboard } from './components/leaderboard/leaderboard.js';
console.log("Leaderboard imported")
import { Rounds } from './components/rounds/rounds.js';
console.log("Rounds imported")
import { Vr } from './components/vr/vr.js';
console.log("VR imported")



Vr.setupControllerClickHandler();
console.log("Controller click handler set up")

// Appeler la vérification en continu pendant la scène
function update() {
    console.log("Update")
    // SortItOut.ChekIfInside();
    requestAnimationFrame(update); // Continuer l'appel à chaque frame
}

// Démarre la vérification continue
update();
console.log("Update started")

// Second mini game
setTimeout(() => {
    console.log("Games reimported")
    Rounds.startGame();
    Leaderboard.renderZone();
}, 5000);