import { Light } from "../light/light.js";
import { SortItOutData } from "../../data/data-sortitout.js";
import { Money } from "../money-counter/money-counter.js";
import { Vr } from "../vr/vr.js";
import { Rounds } from "../rounds/rounds.js";
import { Sound } from "../audio/audio.js";

let SortItOut = {};
let gameFinished = false;
let roundCounter = 1;
const maxRounds = 3;

SortItOut.resetGameState = function () {
    gameFinished = false;
    console.log("Game state reset. Rounds: " + roundCounter);
    Light.resetColor();
};

async function loadTemplate() {
    const response = await fetch("src/components/sort-it-out/template.html.inc");
    if (!response.ok) {
        throw new Error("Failed to load template");
    }
    return await response.text();
}

const scene = document.querySelector("#mainScene");

SortItOut.renderSortItOutZone = async function () {
    SortItOut.resetGameState();

    let data = await SortItOutData.getRandomSortItOut();
    const template = await loadTemplate();

    const tempDiv = document.createElement("a-entity");
    tempDiv.id = "sortItOutZone";
    tempDiv.innerHTML = template;
    scene.appendChild(tempDiv);

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    data.responses.forEach((response, index) => {
        const hollowBox = document.querySelector(`#hollowBox${index + 1}`);
        if (hollowBox) {
            hollowBox.setAttribute("data-valeur", response.answer);
        }
    });

    const shuffledResponses = [...data.responses];
    shuffle(shuffledResponses);

    shuffledResponses.forEach((response, index) => {
        const movableBox = document.querySelector(`#movableBox${index + 1}`);
        const answerBox = document.querySelector(`#answer${index + 1}`);

        if (movableBox) {
            movableBox.setAttribute("data-valeur", response.answer);
        }

        if (answerBox) {
            answerBox.setAttribute("value", response.answer);
        }
    });

    const questionElement = document.querySelector("#question");
    questionElement.setAttribute("value", data.question);

    // Ajoutez un gestionnaire d'événements pour le bouton "Confirmer"
    const confirmButton = document.querySelector("#validButton");
    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
            SortItOut.CheckIfInside();
            console.log("Check if inside");
        });
    }

    document.querySelectorAll("#movableBox1, #movableBox2, #movableBox3, #movableBox4").forEach(box => {
        box.setAttribute("draggable", "");
        box.setAttribute("occulus-grab", "");
    });

    SortItOut.setupDraggables();
};

SortItOut.removeSortItOutZone = function () {
    const sortItOutZone = document.querySelector("#sortItOutZone");
    if (sortItOutZone) sortItOutZone.remove();
    Light.resetColor();
};

SortItOut.setupDraggables = function () {
    AFRAME.registerComponent("draggable", {
        init: function () {
            const el = this.el;
            let isDragging = false;

            el.addEventListener("mousedown", () => {
                isDragging = true;
                el.setAttribute("dynamic-body", "mass: 0");
            });

            document.addEventListener("mousemove", (evt) => {
                if (isDragging) {
                    const raycaster = document.querySelector("a-scene").components.raycaster;
                    const intersection = raycaster.getIntersection(el);

                    if (intersection) {
                        const point = intersection.point;
                        el.setAttribute("position", `${point.x} ${point.y} ${el.getAttribute("position").z}`);
                    }
                }
            });

            document.addEventListener("mouseup", () => {
                if (isDragging) {
                    isDragging = false;
                    el.setAttribute("dynamic-body", "mass: 5");
                }
            });
        },
    });
};

SortItOut.resetAndRenderZone = function () {
    if (roundCounter < maxRounds) {
        roundCounter++;
        console.log("Starting round " + roundCounter);
        SortItOut.removeSortItOutZone();
        SortItOut.renderSortItOutZone();
    } else {
        console.log("Game finished after " + maxRounds + " rounds.");
        SortItOut.removeSortItOutZone();
        Rounds.nextRound();
        // Optionally, you can add code here to display a message or perform other actions when the game is finished
        Rounds.nextRound();
    }
};

SortItOut.CheckIfInside = function () {
    if (gameFinished) return;

    const boxes = document.querySelectorAll("[id^='movableBox']");
    const hollowBoxes = document.querySelectorAll("[id^='hollowBox']");

    let allBoxesCorrect = true;

    boxes.forEach(box => {
        const boxPos = box.object3D.position;
        let isInsideCorrectBox = false;

        hollowBoxes.forEach(hollowBox => {
            const hollowPos = hollowBox.object3D.position;

            const hollowBoxSize = 0.8;
            const minX = hollowPos.x - hollowBoxSize / 2,
                maxX = hollowPos.x + hollowBoxSize / 2;
            const minY = hollowPos.y - hollowBoxSize / 2,
                maxY = hollowPos.y + hollowBoxSize / 2;
            const minZ = hollowPos.z - hollowBoxSize / 2,
                maxZ = hollowPos.z + hollowBoxSize / 2;

            const movableBoxValue = box.getAttribute("data-valeur");
            const hollowBoxValue = hollowBox.getAttribute("data-valeur");

            if (
                boxPos.x >= minX && boxPos.x <= maxX &&
                boxPos.y >= minY && boxPos.y <= maxY &&
                boxPos.z >= minZ && boxPos.z <= maxZ
            ) {
                if (movableBoxValue === hollowBoxValue) {
                    isInsideCorrectBox = true;
                }
            }
        });

        if (!isInsideCorrectBox) {
            allBoxesCorrect = false;
        }
    });

    if (allBoxesCorrect) {
        Light.changeColor("#A3E447");
        Sound.renderCorrectAnswer();
        gameFinished = true;
        Money.summonStack(2);

        setTimeout(() => {
            SortItOut.resetAndRenderZone();
        }, 2000);
    } else {
        Light.changeColor("#FF662F");
        Sound.renderWrongAnswer();
        gameFinished = true;
        setTimeout(() => {
            SortItOut.resetAndRenderZone();
        }, 2000);

    }
};

export { SortItOut };