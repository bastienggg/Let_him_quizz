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

// A-Frame setup for detecting VR controllers and displaying a laser pointer
AFRAME.registerComponent('laser-controls', {
    init: function () {
        this.el.setAttribute('laser-controls', 'hand: right');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const scene = document.createElement('a-scene');
    const camera = document.createElement('a-entity');
    const laser = document.createElement('a-entity');

    camera.setAttribute('camera', '');
    camera.setAttribute('position', '0 1.6 0');
    camera.setAttribute('look-controls', '');

    laser.setAttribute('laser-controls', 'hand: right');

    scene.appendChild(camera);
    scene.appendChild(laser);
    document.body.appendChild(scene);
});