import { MCQ } from './data/data-mcq.js';

// Components imports
import { TickingAway } from './components/ticking-away/ticking-away.js';
import { Money } from './components/money-counter/money-counter.js';
import { DebugMenu } from './components/debug-menu/debug-menu.js';
import { Camera } from './components/camera/camera.js';
import { Loading } from './components/loading/loading.js';
import { Light } from './components/light/light.js';
import { FindThePlace } from './components/find-the-place/find-the-place.js';
import { Rounds } from './components/rounds/rounds.js';

// First mini game
// TickingAway.renderQuizZone();
// TickingAway.newQuestion();
// TickingAway.startTimer();

// Second mini game
// FindThePlace.renderPropositionsZone();
// FindThePlace.renderQuestion();
// Render the money counter
// Money.renderMoneyZone();
// Start the timer
// AFRAME.registerComponent("draggable", {
//     init: function () {
//         const el = this.el;
//         let isDragging = false;

//         el.addEventListener("mousedown", function () {
//             isDragging = true;
//             el.setAttribute("dynamic-body", "mass: 0"); // Désactive temporairement la gravité pendant le drag
//         });

//         document.addEventListener("mousemove", function (evt) {
//             if (isDragging) {
//                 const raycaster =
//                     document.querySelector("a-scene").components.raycaster;
//                 const intersection = raycaster.getIntersection(el);

//                 if (intersection) {
//                     const point = intersection.point;
//                     el.setAttribute(
//                         "position",
//                         `${point.x} ${point.y} ${el.getAttribute("position").z}`
//                     ); // Bloque sur Z
//                 }
//             }
//         });

//         document.addEventListener("mouseup", function () {
//             if (isDragging) {
//                 isDragging = false;
//                 el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
//             }
//         });
//     },
// });

function checkIfInside() {
    const box = document.querySelector("#movableBox");
    const hollowBox = document.querySelector("#hollowBox");
    const light = document.querySelector("#light");

    if (!box || !hollowBox || !light) {
        console.error("One or more elements not found:", { box, hollowBox, light });
        return;
    }

    const boxPos = box.object3D.position;
    const hollowPos = hollowBox.object3D.position;

    const minX = hollowPos.x - 1.4,
        maxX = hollowPos.x + 1.4;
    const minY = hollowPos.y - 1.4,
        maxY = hollowPos.y + 1.4;
    const minZ = hollowPos.z - 1.4,
        maxZ = hollowPos.z + 1.4;

    // Valeurs des boîtes
    const movableBoxValue = parseInt(box.getAttribute("data-valeur"));
    const hollowBoxValue = parseInt(hollowBox.getAttribute("data-valeur"));

    // Vérifier si la boîte rouge est dans la boîte creuse
    if (
        boxPos.x >= minX &&
        boxPos.x <= maxX &&
        boxPos.y >= minY &&
        boxPos.y <= maxY &&
        boxPos.z >= minZ &&
        boxPos.z <= maxZ
    ) {
        // Vérification si les valeurs des deux boîtes sont égales
        if (movableBoxValue === hollowBoxValue) {
            console.log(
                `✅ Boîte rouge DEDANS avec les mêmes valeurs! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
            );
            light.setAttribute("color", "green");
        } else {
            console.log(
                `❌ Boîte rouge DEDANS mais avec des valeurs différentes! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
            );
            light.setAttribute("color", "white");
        }
    } else {
        console.log(
            `❌ Boîte rouge DEHORS! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
        );
        light.setAttribute("color", "white");
    }
}






// Appeler la vérification en continu pendant la scène
function update() {
    checkIfInside();
    requestAnimationFrame(update); // Continuer l'appel à chaque frame
}

// Démarre la vérification continue
update();

document.querySelector("#movableBox").setAttribute("draggable", "");

// Second mini game
setTimeout(() => {
    Rounds.startGame();
}, 5000);
