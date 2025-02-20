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

    // Boucle d'animation pour suivre le contrôleur
    controller.sceneEl.addEventListener('renderstart', function () {
        controller.sceneEl.addEventListener('tick', function () {
            if (grabbedEl) {
                let controllerPosition = new THREE.Vector3();
                let controllerRotation = new THREE.Quaternion();

                // Récupère la position et la rotation du contrôleur
                controller.object3D.getWorldPosition(controllerPosition);
                controller.object3D.getWorldQuaternion(controllerRotation);

                // Applique la position et la rotation à l'objet attrapé
                grabbedEl.object3D.position.copy(controllerPosition);
                grabbedEl.object3D.quaternion.copy(controllerRotation);
            }
        });
    });
};

export { Vr };