import { Place } from "../../data/data-place.js";
import { Money } from "../money-counter/money-counter.js";
import { Users } from "../../data/data-user.js";
import { Light } from "../light/light.js";
import { TickingAway } from "../ticking-away/ticking-away.js";
import { FindThePlace } from "../find-the-place/find-the-place.js";
import { Leaderboard } from "../leaderboard/leaderboard.js";
import { sorryNotSoRich } from "../sorrynotsorich/sorrynotsorich.js";
import { SortItOut } from "../sort-it-out/sort-it-out.js";

const templateFile = await fetch("src/components/rounds/template.html.inc");
const template = await templateFile.text();

const scene = document.querySelector("#mainScene");

let Rounds = {};

let roundsOrder = [
  "SortItOut",
  "TickingAway",
  "FindThePlace",
  "SorryNotSoRich",
];
let actualRound = "";
let roundCounter = 1;

Rounds.startGame = async function () {
  // Render the money counter
  Money.renderMoneyZone();
  // SortItOut.renderSortItOutZone();


  document
    .querySelector("#anchorman")
    .addEventListener("click", Rounds.clickOnAnchorman);

  Rounds.nextRound();

  // Money.summonStack(10);
  // setTimeout(() => {
  //   sorryNotSoRich.renderQuizZone();
  // }, 8000);
  // Rounds.nextRound();
  // setTimeout(() => {
  //   sorryNotSoRich.renderQuizZone();
  // }, 15000);
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
      SortItOut.removeSortItOutZone();
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

Rounds.explainGame = function (explanationText) {
  // Explain the game

  // Render the explanation
  const explanationHtml = document.createElement("a-entity");
  explanationHtml.id = "explanationZone";
  explanationHtml.innerHTML = template.replace("{{message}}", explanationText);
  console.log("Explanation: ", explanationHtml);
  scene.appendChild(explanationHtml);

  setTimeout(() => {
    Rounds.removeExplanation();
  }, 3000);
};

Rounds.removeExplanation = function () {
  // Remove the explanation
  explanationZone.setAttribute("animation", {
    property: "position",
    to: "0 -6 0",
    dur: 600,
    easing: "easeInOutQuad",
  });

  setTimeout(() => {
    const explanationZone = document.querySelector("#explanationZone");
    explanationZone.remove();
  }, 700);
};

let isPopupOpen = false;

Rounds.clickOnAnchorman = function () {
  // Prevent the user from clicking on the anchorman again
  if (isPopupOpen) return;
  // Explain the game with a speech bubble
  if (actualRound === "FindThePlace") {
    Rounds.explainGame("Find the correct place");
  } else if (actualRound === "TickingAway") {
    Rounds.explainGame("Answer the questions before the timer runs out");
  } else if (actualRound === "SortItOut") {
    Rounds.explainGame("Sort the answers in the correct order");
  } else if (actualRound === "SorryNotSoRich") {
    Rounds.explainGame("Bet on the correct answer but save some money!");
  }

  isPopupOpen = true;

  // Remove the explanation
  setTimeout(() => {
    Rounds.removeExplanation();
    setTimeout(() => {
      isPopupOpen = false;
    }, 1000);
  }, 5000);
};

export { Rounds };
