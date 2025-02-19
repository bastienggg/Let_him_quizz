// import { checkIfInside } from '../../main.js';

let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let grabbedObject = null; // Objet actuellement saisi
    console.log("teste clique sur tout les objet v5");

    // Quand la gâchette est pressée
    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];

        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);

            // Événement de clic normal
            let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(clickEvent);

            // Si c'est un objet mobile, on l'attrape
            if (intersectedEl.hasAttribute("dynamic-body")) {
                console.log("Objet saisi :", intersectedEl);
                grabbedObject = intersectedEl;

                // Désactiver la gravité temporairement
                grabbedObject.setAttribute("dynamic-body", "mass: 0");

                // Ajouter un tick event pour suivre le contrôleur
                controller.addEventListener("componentchanged", moveObject);
            }
        }
    });

    // Met à jour la position de l'objet pour suivre le contrôleur
    function moveObject(event) {
        if (grabbedObject && event.detail.name === "position") {
            let controllerPos = controller.object3D.position;
            grabbedObject.object3D.position.set(controllerPos.x, controllerPos.y, controllerPos.z);
        }
    }

    // Quand la gâchette est relâchée
    controller.addEventListener('selectend', function () {
        if (grabbedObject) {
            console.log("Objet relâché :", grabbedObject);

            // Réactiver la gravité
            grabbedObject.setAttribute("dynamic-body", "mass: 1");

            // Vérifier si l'objet est dans la boîte creuse
            checkIfInside(grabbedObject);

            grabbedObject = null; // Réinitialiser l'objet
            controller.removeEventListener("componentchanged", moveObject);
        }
    });
};

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
        console.log("Boîte rouge DEDANS !");
        light.setAttribute("color", "green");
    } else {
        console.log("Boîte rouge DEHORS !");
        light.setAttribute("color", "white");
    }
}

// Vr.setupControllerClickHandler = function (controllerSelector) {
//     let controller = document.querySelector(controllerSelector);
//     console.log("teste clique sur tout les objet");
//     controller.addEventListener('selectstart', function () {
//         let intersectedEl = controller.components.raycaster.intersectedEls[0];
//         if (intersectedEl) {
//             console.log("Clic sur :", intersectedEl);
//             let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
//             intersectedEl.dispatchEvent(clickEvent);
//         }
//     });
// }

export { Vr };