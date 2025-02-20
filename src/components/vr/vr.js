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
Vr.setupControllerClickHandler = function () {
    AFRAME.registerComponent("vr-draggable", {
        init: function () {
            const el = this.el;
            let isDragging = false;
            let controller = null;

            // Quand la gâchette est pressée sur un objet
            el.addEventListener("selectstart", function (evt) {
                isDragging = true;
                controller = evt.detail?.controller || evt.target;
                el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
                console.log("Objet attrapé !");
            });

            // Quand la gâchette est relâchée
            el.addEventListener("selectend", function () {
                if (isDragging) {
                    isDragging = false;
                    el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
                    console.log("Objet relâché !");
                }
            });

            // Suivi de l'objet pendant le drag
            el.sceneEl.addEventListener("tick", function () {
                if (isDragging && controller) {
                    // Récupère la position du contrôleur
                    let controllerPos = new THREE.Vector3();
                    controller.object3D.getWorldPosition(controllerPos);

                    // Met à jour la position de l'objet
                    el.object3D.position.copy(controllerPos);
                }
            });
        },
    });
};

export { Vr };