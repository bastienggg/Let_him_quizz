import { Place } from "../../data/data-place.js";
import { Money } from "../money-counter/money-counter.js";
import { Users } from "../../data/data-user.js";
import { Light } from "../light/light.js";
import { TickingAway } from "../ticking-away/ticking-away.js";
import { FindThePlace } from "../find-the-place/find-the-place.js";
import { Leaderboard } from "../leaderboard/leaderboard.js";

let Rounds = {};

let actualRound = "TickingAway";
let roundCounter = 1;

Rounds.startGame = async function () {
  // Render the money counter
  Money.renderMoneyZone();

  Rounds.nextRound();
};

Rounds.nextRound = async function () {
  // End the game if the round counter is greater than 2  
  if (roundCounter > 2) {
    Rounds.endGame();
    return;
  }

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

Rounds.endGame = function () {
  // // Remove the quiz zone
  // if (actualRound === "FindThePlace") {
  //   FindThePlace.removeQuizZone();
  // } else {
  //   TickingAway.removeQuizZone();
  // }

  // // Remove the money counter
  // Money.removeMoneyZone();


  // Add the user to the leaderboard
  Users.addUser("Test", Money.getMoney());

  // Render the leaderboard
  Leaderboard.renderZone();
};


export { Rounds };
