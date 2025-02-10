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


if (navigator.xr) {
    navigator.xr.requestSession('immersive-vr').then((session) => {
        session.addEventListener('inputsourceschange', (event) => {
            event.added.forEach((inputSource) => {
                if (inputSource.targetRayMode === 'tracked-pointer') {
                    console.log('Controller detected:', inputSource);
                    // Display controller information or handle controller input
                }
            });
        });
    }).catch((err) => {
        console.error('Failed to start VR session:', err);
    });
} else {
    console.log('WebXR not supported');
}