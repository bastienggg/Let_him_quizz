let Vr = {};

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

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let grabbedEl = null;

    console.log("Contrôleur VR prêt pour déplacer les objets.");

    // Quand la gâchette est pressée
    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];
        if (intersectedEl) {
            console.log("Objet attrapé :", intersectedEl);
            grabbedEl = intersectedEl;
        }
    });

    // Quand la gâchette est relâchée
    controller.addEventListener('selectend', function () {
        if (grabbedEl) {
            console.log("Objet relâché :", grabbedEl);
            grabbedEl = null;
        }
    });

    // Mise à jour de la position pendant le déplacement
    controller.addEventListener('controllerconnected', function () {
        controller.addEventListener('frame', function () {
            if (grabbedEl) {
                let controllerPosition = controller.object3D.position;
                grabbedEl.object3D.position.copy(controllerPosition);
            }
        });
    });
};

export { Vr };