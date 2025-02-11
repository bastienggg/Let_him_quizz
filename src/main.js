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


//   Camera.moveCamera(8000, [0, 2.2, 0], [1.237, 3, -35.03326]);


document.addEventListener('DOMContentLoaded', function () {
    let controller = document.querySelector('#rightController');

    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];

        if (intersectedEl) {
            console.log("Gâchette pressée sur :", intersectedEl);

            // Simuler un clic de souris (mousedown + mouseup + click)
            let mouseDownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
            let mouseUpEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
            let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });

            intersectedEl.dispatchEvent(mouseDownEvent);
            intersectedEl.dispatchEvent(mouseUpEvent);
            intersectedEl.dispatchEvent(clickEvent);
        }
    });
});