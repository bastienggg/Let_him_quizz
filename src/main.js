import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';

TickingAway.renderQuizZone();
TickingAway.newQuestion();

Money.renderMoneyZone();


Money.summonStack(100);