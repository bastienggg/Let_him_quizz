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
AFRAME.registerComponent("draggable", {
    init: function () {
        const el = this.el;
        let isDragging = false;

        el.addEventListener("mousedown", function () {
            isDragging = true;
            el.setAttribute("dynamic-body", "mass: 0"); // Désactive temporairement la gravité pendant le drag
        });

        document.addEventListener("mousemove", function (evt) {
            if (isDragging) {
                const raycaster =
                    document.querySelector("a-scene").components.raycaster;
                const intersection = raycaster.getIntersection(el);

                if (intersection) {
                    const point = intersection.point;
                    el.setAttribute(
                        "position",
                        `${point.x} ${point.y} ${el.getAttribute("position").z}`
                    ); // Bloque sur Z
                }
            }
        });

        document.addEventListener("mouseup", function () {
            if (isDragging) {
                isDragging = false;
                el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
            }
        });
    },
});

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


let controller = document.querySelector("#rightController");
let grabbedObject = null;
let offset = new THREE.Vector3();

// 🎮 Quand la gâchette est pressée
controller.addEventListener("selectstart", function () {
    let intersectedEl = controller.components.raycaster.intersectedEls[0];

    if (intersectedEl) {
        console.log("Clic sur :", intersectedEl);

        // 📌 Si l'objet a "dynamic-body", on le prend
        if (intersectedEl.hasAttribute("dynamic-body")) {
            console.log("Objet saisi :", intersectedEl);
            grabbedObject = intersectedEl;

            // Désactiver la gravité temporairement
            grabbedObject.setAttribute("dynamic-body", "mass: 0");

            // Calculer l'offset entre le contrôleur et l'objet
            let objPos = grabbedObject.object3D.position.clone();
            let controllerPos = controller.object3D.position.clone();
            offset.copy(objPos).sub(controllerPos);
        } else {
            // 📌 Sinon, on déclenche un clic classique
            let clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(clickEvent);
        }
    }
});

// 🎮 Mise à jour continue pendant la saisie
controller.addEventListener("controller-move", function () {
    if (grabbedObject) {
        let controllerPos = controller.object3D.position;
        grabbedObject.object3D.position.copy(controllerPos).add(offset);
    }
});

// 🎮 Quand la gâchette est relâchée
controller.addEventListener("selectend", function () {
    if (grabbedObject) {
        console.log("Objet relâché :", grabbedObject);

        // Réactiver la gravité
        grabbedObject.setAttribute("dynamic-body", "mass: 1");

        // Vérifier s'il est dans la boîte creuse
        checkIfInside(grabbedObject);

        grabbedObject = null; // Reset
    }
});

// 📌 Vérifie si la boîte mobile est dans la boîte creuse
function checkIfInside(box) {
    const hollowBox = document.querySelector("#hollowBox");
    const light = document.querySelector("#light");

    const boxPos = box.object3D.position;
    const hollowPos = hollowBox.object3D.position;

    const minX = hollowPos.x - 1.4,
        maxX = hollowPos.x + 1.4;
    const minY = hollowPos.y - 1.4,
        maxY = hollowPos.y + 1.4;
    const minZ = hollowPos.z - 1.4,
        maxZ = hollowPos.z + 1.4;

    if (
        boxPos.x >= minX &&
        boxPos.x <= maxX &&
        boxPos.y >= minY &&
        boxPos.y <= maxY &&
        boxPos.z >= minZ &&
        boxPos.z <= maxZ
    ) {
        console.log("✅ Boîte rouge DEDANS !");
        light.setAttribute("color", "green");
    } else {
        console.log("❌ Boîte rouge DEHORS !");
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
