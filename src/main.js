import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Camera } from './components/camera/camera.js';
import { Loading } from './components/loading/loading.js';
import { Light } from './components/light/light.js';
import { FindThePlace } from './components/find-the-place/find-the-place.js';
import { Rounds } from './components/rounds/rounds.js';

// First mini game
// TickingAway.renderQuizZone();
// TickingAway.newQuestion();
// TickingAway.startTimer();

// sSecond mini game
// FindThePlace.renderPropositionsZone();
// FindThePlace.renderQuestion();
// Render the money counter
Money.renderMoneyZone();
// Start the timer


AFRAME.registerComponent('joystick-move', {
    init: function () {
        this.rig = document.querySelector('#rig');
        this.controller = document.querySelector('#rightController');

        this.controller.addEventListener('thumbstickmoved', (evt) => {
            let x = evt.detail.x; // Gauche/Droite
            let z = evt.detail.y; // Avant/Arrière

            let speed = 0.1; // Ajuste la vitesse de déplacement

            // Déplacer le rig en fonction du joystick
            this.rig.object3D.position.x += x * speed;
            this.rig.object3D.position.z += z * speed;
        });
    }
});

// Appliquer le composant au contrôleur droit
document.querySelector('#rightController').setAttribute('joystick-move', '');

// Second mini game
setTimeout(() => {
    Rounds.startGame();
}, 5000);

document.addEventListener('DOMContentLoaded', function () {
    let controller = document.querySelector('#rightController');
    console.log("teste clique sur tout les objet");

    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];

        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);

            // Simuler un vrai clic souris
            let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(clickEvent);
        }
    });
});