import { Place } from "../../data/data-place.js";
import { Money } from "../money-counter/money-counter.js";
import { Light } from "../light/light.js";
import { TickingAway } from "../ticking-away/ticking-away.js";
import { FindThePlace } from "../find-the-place/find-the-place.js";
import { sorryNotSoRich } from "../sorrynotsorich/sorrynotsorich.js";

let Rounds = {};

let actualRound = "TickingAway";
let roundCounter = 1;

Rounds.startGame = async function () {
  // Render the money counter
  Money.renderMoneyZone();

  sorryNotSoRich.renderQuizZone();
  // Rounds.nextRound();
};

Rounds.nextRound = async function () {
  if (actualRound === "FindThePlace") {
    // Remove the propositions zone
    if (roundCounter != 1) {
      TickingAway.removeQuizZone();
    }

    setTimeout(() => {
      FindThePlace.renderPropositionsZone();
      FindThePlace.renderQuestion();

      actualRound = "TickingAway";
    }, 2000); // Adjust the timeout duration as needed
  } else {
    if (roundCounter != 1) {
      FindThePlace.removeQuizZone();
    }
    setTimeout(() => {
      TickingAway.renderQuizZone();
      TickingAway.newQuestion();
      TickingAway.startTimer();
      actualRound = "FindThePlace";
    }, 2000); // Adjust the timeout duration as needed
  }
  roundCounter++;
};

export { Rounds };
