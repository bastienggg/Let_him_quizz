import { MCQ } from "../../data/data-mcq.js";
import { Money } from "../money-counter/money-counter.js";
import { Light } from "../light/light.js";

const templateFile = await fetch("src/components/ticking-away/template.html.inc");
const template = await templateFile.text();

const scene = document.querySelector("#mainScene");
const timer = document.querySelector("#timer");

let timerValue = 0;
let TickingAway = {};
let freezed = false;

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
  // select the zone
  const quizZone = document.querySelector("#quizZone");

  // animation to remove the zone smoothly falling in the ground
  quizZone.setAttribute("animation", {
    property: "position",
    to: "0.99 -3 -36",
    dur: 1000,
    easing: "easeInOutQuad"
  });

  // remove the zone for the quiz with the 3d polygons for the answers
  setTimeout(() => {
    quizZone.remove();
  }, 1000);
};

TickingAway.newQuestion = async function () {
  // Unfreeze the game
  freezed = false;

  // reset the color of the boxes
  document.querySelectorAll(".answer a-box").forEach((box) => {
    box.setAttribute("color", "#ff0000");
  });

  // get a new question from the MCQ module
  let question = await MCQ.getRandomQuestion("medium");

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
  // Prevent clicking on the same answer multiple times
  if (freezed) {
    return;
  }
  // reveal the good answer by changing the color of the boxes
  document.querySelectorAll(".answer a-box").forEach((box) => {
    if (box.getAttribute("id") === "good answer") {
      box.setAttribute("color", "#00ff00");
    } else {
      box.setAttribute("color", "#ff0000");
    }
  });
  
  // Set an animation attribute to the clicked answer
  const clickedBox = document.querySelector(`#${event.target.parentElement.id} a-box`); // Get the clicked box
  clickedBox.removeAttribute("animation"); // Remove any existing animation
  clickedBox.setAttribute("animation", "property: scale; to: 1.1 1.1 1.1; dur: 100; loop: 2; dir: alternate");

  // check if the answer is the correct one
  // if yes, display a message and remove the quiz zone
  
  if (event.target.id === "good answer") {
    Light.flashColor("#00ff00");
    setTimeout(() => {
      TickingAway.newQuestion();
      
    }, 500);

    // adds money
    Money.summonStack(2);

    // if no, display a message and goes on  to the next question
  } else {
    Light.flashColor("#ff0000");

    // Puts a delay before the next question
    setTimeout(() => {
      TickingAway.newQuestion();
      
    }, 2000);
  }

  // Freeze the game to prevent multiple clicks
  freezed = true;
  
};

TickingAway.startTimer = function () {
  // start the timer
  timerValue = 0;
  let timeLimit = 30;

  document.querySelector("#timer a-text").setAttribute("value", (timeLimit - timerValue));
  
  const intervalId = setInterval(() => {
    timerValue++;
    document.querySelector("#timer a-text").setAttribute("value", (timeLimit - timerValue));

    if (timerValue === timeLimit) {
      TickingAway.removeQuizZone();
      clearInterval(intervalId);
      
    }
  }, 1000);
};

export { TickingAway };
