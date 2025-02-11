import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Camera } from './components/camera/camera.js';
import { Loading } from './components/loading/loading.js';
import { Light } from './components/light/light.js';
import { FindThePlace } from './components/find-the-place/find-the-place.js';

// First mini game
// TickingAway.renderQuizZone();
// TickingAway.newQuestion();
// TickingAway.startTimer();

// Second mini game
FindThePlace.renderPropositionsZone();
FindThePlace.renderQuestion();

// Render the money counter
Money.renderMoneyZone();
// Start the timer


AFRAME.registerComponent('joystick-move', {
    init: function () {
        let rig = document.querySelector('#rig');
        let controller = document.querySelector('#rightController');

        controller.addEventListener('axismove', function (evt) {
            let x = evt.detail.axis[0]; // Gauche/Droite
            let z = evt.detail.axis[1]; // Avant/Arrière

            // Applique le déplacement en multipliant par un facteur de vitesse
            let speed = 0.1;
            rig.object3D.position.x += x * speed;
            rig.object3D.position.z += z * speed;
        });
    }
});

// Applique le composant sur le contrôleur
document.querySelector('#rightController').setAttribute('joystick-move', '');
