import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Camera } from './components/camera/camera.js';
import { Loading } from './components/loading/loading.js';

DebugMenu.renderChoices();


// window.addEventListener('load', () => {
//     setTimeout(() => {
//         // Camera.moveCamera(5000, [0, 1.6, 0], [0, 1.6, -15]);
//         Camera.moveCamera(5000, [0, 2.2, 0], [1.237, 2.2, -33.5]);

//     }, 2000);
// });
