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


AFRAME.registerComponent('move-to', {
    schema: {
        to: { type: 'vec3' },
        duration: { type: 'number', default: 3000 } // Durée en ms
    },

    init: function () {
        this.startPos = this.el.object3D.position.clone();
        this.elapsedTime = 0;
        this.moving = true;
    },

    tick: function (time, deltaTime) {
        if (!this.moving) return;

        this.elapsedTime += deltaTime;
        let t = Math.min(this.elapsedTime / this.data.duration, 1); // Normalisation entre 0 et 1

        // Interpolation de la position
        this.el.object3D.position.lerpVectors(
            this.startPos,
            new THREE.Vector3(this.data.to.x, this.data.to.y, this.data.to.z),
            t
        );

        if (t >= 1) {
            this.moving = false; // Stopper l'animation
        }
    }
});

// Fonction pour déclencher le déplacement
function moveCameraVR(startPos, endPos, duration) {
    let rig = document.querySelector('#rig');

    // Forcer la position de départ
    rig.setAttribute('position', `${startPos.x} ${startPos.y} ${startPos.z}`);

    // Appliquer l'animation
    rig.setAttribute('move-to', `to: ${endPos.x} ${endPos.y} ${endPos.z}; duration: ${duration}`);
}

// Exemple d'utilisation : Déplacer le joueur en 4 secondes
window.addEventListener('load', () => {
    moveCameraVR({ x: 0, y: 2.2, z: 0 }, { x: 1.237, y: 3, z: -35 }, 5000);
});
//   Camera.moveCamera(8000, [0, 2.2, 0], [1.237, 3, -35.03326]);

