import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away.js';

await TickingAway.renderQuizZone();
TickingAway.newQuestion();
TickingAway.startTimer();   
