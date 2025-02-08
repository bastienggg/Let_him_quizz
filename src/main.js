import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Light } from './components/light/light.js';

// First mini game
TickingAway.renderQuizZone();
TickingAway.newQuestion();
TickingAway.startTimer();

// Render the money counter
Money.renderMoneyZone();

// Start the timer


