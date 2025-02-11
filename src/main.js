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


function moveCamera(startPos, endPos, duration) {
    let rig = document.querySelector('#rig');

    // S'assurer que la caméra commence bien à la position initiale
    rig.object3D.position.set(startPos.x, startPos.y, startPos.z);

    let startTime = null;

    function animate(time) {
        if (!startTime) startTime = time;
        let elapsed = time - startTime;
        let t = Math.min(elapsed / duration, 1); // Normalisation entre 0 et 1

        // Interpolation linéaire entre startPos et endPos
        rig.object3D.position.lerpVectors(
            new THREE.Vector3(startPos.x, startPos.y, startPos.z),
            new THREE.Vector3(endPos.x, endPos.y, endPos.z),
            t
        );

        // Continue tant que la durée n'est pas écoulée
        if (t < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// Exemple : Déplace la caméra de (0,1.6,0) à (5,1.6,-5) en 3 secondes
moveCamera({ x: 0, y: 2.2, z: 0 }, { x: 1.237, y: 3, z: -35 }, 3000);

