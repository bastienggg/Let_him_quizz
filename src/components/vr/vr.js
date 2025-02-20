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

            // Détection explicite du contrôleur après chargement de la scène
            el.sceneEl.addEventListener("loaded", () => {
                controller = document.querySelector("[laser-controls]");
                if (controller) {
                    console.log("🎮 Contrôleur détecté :", controller);
                } else {
                    console.error("❌ Contrôleur non trouvé");
                }
            });

            // Quand la boîte est cliquée
            el.addEventListener("click", function () {
                if (!controller) {
                    console.error("⚠️ Contrôleur non disponible au moment du clic");
                    return;
                }

                if (!isFollowing) {
                    isFollowing = true;
                    el.setAttribute("color", "#FFC65D");
                    el.removeAttribute("dynamic-body"); // Désactive la physique pendant le suivi
                    console.log("🚀 Suivi activé");
                } else {
                    isFollowing = false;
                    el.setAttribute("color", "#4CC3D9");
                    el.setAttribute("dynamic-body", "mass: 5"); // Réactive la physique
                    console.log("💥 Suivi désactivé");
                }
            });

            // Mise à jour de la position pendant le suivi
            el.sceneEl.addEventListener("tick", function () {
                if (isFollowing && controller) {
                    let controllerPos = new THREE.Vector3();
                    controller.object3D.getWorldPosition(controllerPos);

                    // Vérifie si la position est bien récupérée
                    console.log("📍 Position contrôleur :", controllerPos);

                    // Applique la position
                    el.setAttribute("position", `${controllerPos.x} ${controllerPos.y} ${controllerPos.z}`);
                }
            });
        },
    });

};

export { Vr };