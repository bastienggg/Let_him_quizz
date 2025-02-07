import { MCQ } from "../../data/data-mcq.js";
import { Money } from "../money-counter/money-counter.js";

const templateFile = await fetch("src/components/ticking-away/template.html.inc");
const template = await templateFile.text();

const scene = document.querySelector("#mainScene");
const timer = document.querySelector("#timer");

let timerValue = 0;

let TickingAway = {};

TickingAway.renderQuizZone = function () {
  // Create the zone for the quiz with the 3d polygons for the answers

  // Create the a-entities for the answers and the question from the template

  const tempDiv = document.createElement("div");
  tempDiv.id = "quizZone";
  tempDiv.innerHTML = template;
  const entities = tempDiv.querySelectorAll("#quizZone");

  entities.forEach((entity) => {
    scene.appendChild(entity);
  });

  // Add the event listener for the answers
  const answers = document.querySelectorAll(".answer");

  answers.forEach((answer) => {
    answer.addEventListener("click", TickingAway.answerClicked);
  });
};

TickingAway.removeQuizZone = function () {
  // remove the zone for the quiz with the 3d polygons for the answers
  const quizZone = document.querySelector("#quizZone");
  quizZone.remove();
};

TickingAway.newQuestion = async function () {
  // get a new question from the MCQ module
  let question = await MCQ.getRandomQuestion();

  // display the question and the propositions
  document
    .querySelector("#question a-text")
    .setAttribute("value", question.question);

  // Shuffle the propositions
  let propositions = question.propositions.slice();
  for (let i = propositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [propositions[i], propositions[j]] = [propositions[j], propositions[i]];
  }

  // Remove the id "good answer" if it is set
  document.querySelectorAll(".answer a-box").forEach((box) => {
    if (box.getAttribute("id") === "good answer") {
      box.removeAttribute("id");
    }
  });

  // Set the propositions to the answer elements
  document
    .querySelector("#answer1 a-text")
    .setAttribute("value", propositions[0]);
  document
    .querySelector("#answer2 a-text")
    .setAttribute("value", propositions[1]);
  document
    .querySelector("#answer3 a-text")
    .setAttribute("value", propositions[2]);
  document
    .querySelector("#answer4 a-text")
    .setAttribute("value", propositions[3]);

  // Add the id "good answer" to the correct answer
  const correctAnswerIndex = propositions.indexOf(question.propositions[0]);
  document
    .querySelector(`#answer${correctAnswerIndex + 1} a-box`)
    .setAttribute("id", "good answer");

};

TickingAway.answerClicked = function (event) {
  // check if the answer is the correct one
  // if yes, display a message and remove the quiz zone
  // if no, display a message and remove the quiz zone
  if (event.target.id === "good answer") {
    console.log("Good answer");
    TickingAway.newQuestion();

    // adds money
    Money.summonStack(1);
  } else {
    console.log("Bad answer");
    // next question
  }
};

TickingAway.startTimer = function () {
  // start the timer
  timerValue = 0;

  document.querySelector("#timer a-text").setAttribute("value", timerValue);
  setInterval(() => {
    timerValue++;
    document.querySelector("#timer a-text").setAttribute("value", timerValue);

    if (timerValue === 7) {
      TickingAway.removeQuizZone();
    }
  }, 1000);
};

export { TickingAway };
