import { Place } from "../../data/data-place.js";
import { Money } from "../money-counter/money-counter.js";
import { Users } from "../../data/data-user.js";
import { Light } from "../light/light.js";
import { TickingAway } from "../ticking-away/ticking-away.js";
import { FindThePlace } from "../find-the-place/find-the-place.js";
import { Leaderboard } from "../leaderboard/leaderboard.js";
import { sorryNotSoRich } from "../sorrynotsorich/sorrynotsorich.js";
import { SortItOut } from "../sort-it-out/sort-it-out.js";

let Rounds = {};

let roundsOrder = [
  "FindThePlace",
  "TickingAway",
  "SortItOut",
  "SorryNotSoRich",
];
let actualRound = "";
let roundCounter = 1;

Rounds.startGame = async function () {
  // Render the money counter
  Money.renderMoneyZone();

  Rounds.nextRound();
};

Rounds.nextRound = async function () {
  // End the game if the round counter is greater than the length of roundsOrder
  if (roundCounter > roundsOrder.length) {
    Rounds.endGame();
    return;
  }

  console.log("Round: ", roundCounter, " - ", roundsOrder[roundCounter - 1]);

  // Remove the previous round's quiz zone if it's not the first round
  if (roundCounter != 1) {
    if (actualRound === "FindThePlace") {
      FindThePlace.removeQuizZone();
    } else if (actualRound === "TickingAway") {
      TickingAway.removeQuizZone();
    } else if (actualRound === "SortItOut") {
      SortItOut.removeQuizZone();
    } else if (actualRound === "SorryNotSoRich") {
      sorryNotSoRich.removeQuizZone();
    }
  }

    // Change the actual round to the next one
    setTimeout(() => {
      actualRound = roundsOrder[roundCounter - 1];
    }, 500); // Adjust the timeout duration as needed

  // Render the current round's quiz zone
  setTimeout(() => {
    if (actualRound === "FindThePlace") {
      FindThePlace.renderPropositionsZone();
      FindThePlace.renderQuestion();
    } else if (actualRound === "TickingAway") {
      TickingAway.renderQuizZone();
      TickingAway.newQuestion();
      TickingAway.startTimer();
    } else if (actualRound === "SortItOut") {
      SortItOut.renderSortItOutZone();
    } else if (actualRound === "SorryNotSoRich") {
      sorryNotSoRich.renderQuizZone();
    }
    
  roundCounter++;
  }, 2000); // Adjust the timeout duration as needed

};

Rounds.endGame = function () {
  // Add the user to the leaderboard
  Users.addUser("Test", Money.getMoney());

  // Render the leaderboard
  Leaderboard.renderZone();
};

export { Rounds };
