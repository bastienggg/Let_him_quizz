import { Light } from "../light/light";
//https://mmi.unilim.fr/~savary23/Let_Him_Quizz/api/sort?difficulty=easy;
let SortItOut = {};
async function loadTemplate() {
    const response = await fetch("src/components/sort-it-out/template.html.inc");
    if (!response.ok) {
        throw new Error("Failed to load template");
    }
    return await response.text();
}

const scene = document.querySelector("#mainScene");

SortItOut.renderSortItOutZone = async function () {
    // Create the zone for the game with the 3d polygons for the answers

    // Create the a-entities for the answers and the question from the template

    const template = await loadTemplate();
    const tempDiv = document.createElement("div");
    tempDiv.id = "sortItOutZone";
    tempDiv.innerHTML = template;
    const entities = tempDiv.querySelectorAll("a-entity");

    entities.forEach((entity) => {
        scene.appendChild(entity);
    });

    document.querySelectorAll("#movableBox").forEach(box => {
        box.setAttribute("draggable", "");
    });

    SortItOut.setupDraggables();
};


SortItOut.setupDraggables = function () {
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
}

SortItOut.ChekIfInside = function () {
    const boxes = document.querySelectorAll("[id^='movableBox']");
    const hollowBoxes = document.querySelectorAll("[id^='hollowBox']");

    let allBoxesCorrect = true;

    boxes.forEach(box => {
        const boxPos = box.object3D.position;
        let isInsideCorrectBox = false;

        hollowBoxes.forEach(hollowBox => {
            const hollowPos = hollowBox.object3D.position;

            const hollowBoxSize = 0.8; // Adjust this value to match the actual size of the hollow box
            const minX = hollowPos.x - hollowBoxSize / 2,
                maxX = hollowPos.x + hollowBoxSize / 2;
            const minY = hollowPos.y - hollowBoxSize / 2,
                maxY = hollowPos.y + hollowBoxSize / 2;
            const minZ = hollowPos.z - hollowBoxSize / 2,
                maxZ = hollowPos.z + hollowBoxSize / 2;

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
                    isInsideCorrectBox = true;
                } else {
                    console.log(
                        `❌ Boîte rouge DEDANS mais avec des valeurs différentes! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
                    );
                }
            }
        });

        if (!isInsideCorrectBox) {
            console.log(`❌ Boîte rouge DEHORS!`);
            allBoxesCorrect = false;
        }
    });

    if (allBoxesCorrect) {
        Light.changeColor("#00FF00");
    } else {
        Light.resetColor();
    }
};
export { SortItOut };