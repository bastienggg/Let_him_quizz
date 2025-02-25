import { MCQ } from "../../data/data-mcq.js";
import { Money } from "../money-counter/money-counter.js";
import { Light } from "../light/light.js";
import { Rounds } from "../rounds/rounds.js";
import { Sound } from "../audio/audio.js";

//add the template for the quiz zone: the question and the answers and the table (with the trapdoors)
//each trapdoor is placed at the right position in the table, the trapdoors that match the wrong answers are rotated at 90° on the x axis 
//enlever tout les billets du cylindre, faire un tas a cote du joueur avec tous les billets rangés, ajouter pour chaque réponse un bouton + et - (faisant afficher des billets sur les trappes) et un bouton valider (obligation de miser tous les billets pour valider la réponse)

const templateFile = await fetch(
  "src/components/sorrynotsorich/template.html.inc",
);
const template = await templateFile.text();

const moneyTemplateFile = await fetch(
  "src/components/sorrynotsorich/money-template.html.inc",
);

const moneyTemplate = await moneyTemplateFile.text();

const scene = document.querySelector("#mainScene");

let sorryNotSoRich = {};

let totalBet = 0;


// Render the template in the scene
sorryNotSoRich.renderQuizZone = function () {
  const tempDiv = document.createElement("div");
  tempDiv.id = "sorryNotSoRichDiv";
  tempDiv.innerHTML = template;

  while (tempDiv.firstChild) {
    scene.appendChild(tempDiv.firstChild);
  }
  sorryNotSoRich.newQuestion();
};


// Get a new question from the MCQ data
sorryNotSoRich.newQuestion = async function () {

  //Get random hard question
  let question = await MCQ.getRandomQuestion("hard");

  // reset the color of the boxes
  document.querySelectorAll(".answer a-box").forEach((box) => {
    box.setAttribute("color", "#3246E7");
  });

  // Reset totalBet to 0
  totalBet = 0;

  // display the question and the propositions
  document.querySelector("#question a-text").setAttribute("value", question.question);

  // Shuffle the propositions
  let propositions = question.propositions.slice();
  for (let i = propositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [propositions[i], propositions[j]] = [propositions[j], propositions[i]];
  }

  // Remove the class "good-answer" if it is set
  document.querySelectorAll(".good-answer").forEach((box) => {
    box.classList.remove("good-answer");
  });
  document.querySelectorAll(".good-answerbox").forEach((answer) => {
    answer.classList.remove("good-answerbox");});

  // Set the propositions to the answer elements
  document.querySelector("#answer1 a-text").setAttribute("value", propositions[0]);
  document.querySelector("#answer2 a-text").setAttribute("value", propositions[1]);
  document.querySelector("#answer3 a-text").setAttribute("value", propositions[2]);
  document.querySelector("#answer4 a-text").setAttribute("value", propositions[3]);

  // Add the class "good-answer" to the correct answer
  const correctAnswerIndex = propositions.indexOf(question.propositions[0]);
  document.querySelector(`#bet${correctAnswerIndex + 1}`).classList.add("good-answer");
  document.querySelector(`#answer${correctAnswerIndex + 1}`).classList.add("good-answerbox");

  sorryNotSoRich.calculateMoney();
};

// Change the color of the answer boxes based on correctness
sorryNotSoRich.updateAnswerColors = function () {
  const answerBoxes = [
    document.querySelector("#answer1 a-box"),
    document.querySelector("#answer2 a-box"),
    document.querySelector("#answer3 a-box"),
    document.querySelector("#answer4 a-box"),
  ];

  answerBoxes.forEach((box) => {
    if (box.parentElement.classList.contains("good-answerbox")) {
      box.setAttribute("color", "green");
    } else {
      box.setAttribute("color", "red");
    }
  });
};


// Calculate the money that the player has and the money that he is betting
// Calculate the money that the player has and the money that he is betting
sorryNotSoRich.calculateMoney = function () {

  // Get the money amount gain from the previous games
  let moneyAmount = Money.getMoney();


  // Initialize bets to $0
  bets.forEach(bet => bet.setAttribute("value", "$0"));

  // Update the total bet and check if the player can bet more
  const updateTotalBet = () => {
    totalBet = bets.reduce((sum, bet) => sum + parseInt(bet.getAttribute("value").replace('$', '')), 0);
    Money.updateMoney(moneyAmount - totalBet);
    if (totalBet === moneyAmount) {
      Money.removeAllMoneyStack();
    }
  };

  const checkBetStatus = () => {
    const allBetsPlaced = totalBet === moneyAmount;
    plusButtons.forEach(button => button.setAttribute("visible", !allBetsPlaced));
    document.querySelector("#validButton").setAttribute("visible", allBetsPlaced);
    document.querySelector("#validButton a-box").classList.add("interactable");
  };

  const canBetMore = (amount) => totalBet + amount <= moneyAmount;

  // Handle the click on the plus button
  const handlePlusButtonClick = (index) => {
    let currentValue = parseInt(bets[index].getAttribute("value").replace('$', ''));
    if (canBetMore(100)) {
      bets[index].setAttribute("value", `$${currentValue + 100}`);
      Money.removeMoney(2); // Remove 2 bills (100 units)
      updateTotalBet();
      checkBetStatus();
      minusButtons[index].setAttribute("visible", true);
    }
  };

  // Handle the click on the minus button
  const handleMinusButtonClick = (index) => {
    let currentValue = parseInt(bets[index].getAttribute("value").replace('$', ''));
    if (currentValue > 0) {
      bets[index].setAttribute("value", `$${currentValue - 100}`);
      Money.summonStack(2); // Add 2 bills (100 units)
      updateTotalBet();
      checkBetStatus();
      document.querySelector("#validButton a-box").classList.remove("interactable");
    }
    if (parseInt(bets[index].getAttribute("value").replace('$', '')) === 0) {
      minusButtons[index].setAttribute("visible", false);
    }
  };

  // Handle the click on the valid button
  const handleValidButtonClick = () => {
    let correctAnswerBox = document.querySelector(".good-answer");
    console.log("correctAnswerBox: " + correctAnswerBox);
    let correctBet = parseInt(correctAnswerBox.getAttribute("value").replace('$', ''));
    moneyAmount = Money.setMoney(correctBet);

    sorryNotSoRich.updateAnswerColors();
    // Add animation to the wrong answer trapdoors
    for (let i = 1; i <= 4; i++) {
      if (!document.querySelector(`#bet${i}`).classList.contains("good-answer")) {
        document.querySelector(`#trap${i}`).removeAttribute("animation__rotation", "property: rotation; to: 0 0 0; loop: false; dur: 1000");
        document.querySelector(`#trap${i}`).setAttribute("animation__rotation", "property: rotation; to: 90 0 0; loop: false; dur: 1000");
      }
    }

    // Reset all bets to $0
    bets.forEach(bet => bet.setAttribute("value", "$0"));
    // Check if the player has any money left
    setTimeout(() => {
      if (correctBet === 0) {
        sorryNotSoRich.removeQuizZone();
        Money.removeAllMoney();
      } else {
        // Update and render a new question
        checkBetStatus();
        updateTotalBet();
        sorryNotSoRich.newQuestion();

        // Reset the trapdoors
        for (let i = 1; i <= 4; i++) {
          if (!document.querySelector(`#bet${i}`).classList.contains("good-answer")) {
            document.querySelector(`#trap${i}`).removeAttribute("animation__rotation", "property: rotation; to: 90 0 0; loop: false; dur: 1000");
            document.querySelector(`#trap${i}`).setAttribute("animation__rotation", "property: rotation; to: 0 0 0; loop: false; dur: 1000");
          }
        }
      }
    }, 2000);
  };

  const addEventListeners = () => {
    plusButtons.forEach((button, index) => {
      button.addEventListener("click", () => handlePlusButtonClick(index));
    });

    minusButtons.forEach((button, index) => {
      button.addEventListener("click", () => handleMinusButtonClick(index));
    });

    document.querySelector("#validButton").addEventListener("click", handleValidButtonClick);
  };

  // Remove existing event listeners and add new ones
  plusButtons.forEach((button, index) => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    plusButtons[index] = newButton;
  });

  minusButtons.forEach((button, index) => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
    minusButtons[index] = newButton;
  });

  document.querySelector("#validButton").replaceWith(document.querySelector("#validButton").cloneNode(true));

  // Hide all minus buttons and the valid button at the beginning
  minusButtons.forEach(button => button.setAttribute("visible", false));
  document.querySelector("#validButton").setAttribute("visible", false);
  document.querySelector("#validButton a-box").classList.remove("interactable");

  addEventListeners();
};


sorryNotSoRich.removeQuizZone = function () {
  scene.removeChild(document.querySelector("#sorrynotsorich-container"));
};

export { sorryNotSoRich };