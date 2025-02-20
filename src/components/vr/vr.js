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
    AFRAME.registerComponent("toggle-drag", {
        init: function () {
            const el = this.el;
            let isFollowing = false;
            let controller = null;

            // Ecoute les clics (gâchette)
            el.addEventListener("click", function (evt) {
                if (!isFollowing) {
                    // Commence à suivre le contrôleur
                    controller = evt.detail.cursorEl;
                    el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
                    isFollowing = true;
                    console.log("Suivi activé");
                } else {
                    // Relâche l'objet
                    el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
                    isFollowing = false;
                    console.log("Suivi désactivé");
                }
            });

            // Mise à jour pendant le suivi
            el.sceneEl.addEventListener("tick", function () {
                if (isFollowing && controller) {
                    let controllerPos = new THREE.Vector3();
                    controller.object3D.getWorldPosition(controllerPos);
                    el.object3D.position.copy(controllerPos);
                }
            });
        },
    });
};

export { Vr };