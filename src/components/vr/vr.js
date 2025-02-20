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

            // Quand la boîte est cliquée
            el.addEventListener("click", function (evt) {
                if (!isFollowing) {
                    controller = evt.detail.cursorEl;
                    isFollowing = true;
                    el.setAttribute("color", "#FFC65D"); // Change de couleur pendant le suivi
                    el.setAttribute("dynamic-body", "mass: 0"); // Désactive la gravité
                    console.log("🚀 Suivi activé");
                } else {
                    isFollowing = false;
                    el.setAttribute("color", "#4CC3D9"); // Restaure la couleur d'origine
                    el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
                    console.log("💥 Suivi désactivé");
                }
            });

            // Mise à jour de la position pendant le suivi
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