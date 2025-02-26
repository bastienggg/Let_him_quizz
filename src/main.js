import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Camera } from './components/camera/camera.js';
import { Loading } from './components/loading/loading.js';
import { Light } from './components/light/light.js';
import { FindThePlace } from './components/find-the-place/find-the-place.js';
import { Leaderboard } from './components/leaderboard/leaderboard.js';
import { Rounds } from './components/rounds/rounds.js';
import { SortItOut } from './components/sort-it-out/sort-it-out.js';
import { Vr } from './components/vr/vr.js';

// First mini game
// TickingAway.renderQuizZone();
// TickingAway.newQuestion();
// TickingAway.startTimer();

// Second mini game
// FindThePlace.renderPropositionsZone();
// FindThePlace.renderQuestion();
// Render the money counter
// Money.renderMoneyZone();
// Start the timer

Vr.setupControllerClickHandler();

// Appeler la vérification en continu pendant la scène
function update() {
    // SortItOut.ChekIfInside();
    requestAnimationFrame(update); // Continuer l'appel à chaque frame
}

// Démarre la vérification continue
update();

// Second mini game
setTimeout(() => {
    Rounds.startGame();
    Leaderboard.renderZone();
}, 5000);

