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
    AFRAME.registerComponent("occulus-grab", {
        init: function () {
            let el = this.el;
            let isGrabbed = false;
            let controller = null;

            this.onGrabStart = (evt) => {
                let raycaster = evt.target.components.raycaster;
                if (!raycaster) return;

                let intersectedEls = raycaster.intersectedEls;
                let intersectedEl = intersectedEls.find(obj => obj === el);
                if (!intersectedEl) return;

                isGrabbed = true;
                controller = evt.target;

                // Désactive la gravité pendant le grab
                el.setAttribute("dynamic-body", "mass: 0");

                controller.addEventListener("triggerup", this.onGrabEnd);
            };

            this.onGrabEnd = () => {
                if (isGrabbed) {
                    // Restaure les paramètres physiques
                    el.setAttribute("dynamic-body", "mass: 5; restitution: 0.5; friction: 0.5");
                    isGrabbed = false;

                    if (controller) {
                        controller.removeEventListener("triggerup", this.onGrabEnd);
                        controller = null;
                    }
                }
            };

            this.tick = function () {
                if (isGrabbed && controller) {
                    let controllerPos = new THREE.Vector3();
                    let controllerQuat = new THREE.Quaternion();

                    controller.object3D.getWorldPosition(controllerPos);
                    controller.object3D.getWorldQuaternion(controllerQuat);

                    let offset = new THREE.Vector3(0, 0, -0.1).applyQuaternion(controllerQuat);
                    let newPosition = controllerPos.clone().add(offset);

                    // Lissage du mouvement
                    el.object3D.position.lerp(newPosition, 0.2);
                }
            };

            // Écoute directement sur le contrôleur
            el.sceneEl.addEventListener("controllerconnected", (evt) => {
                evt.detail.target.addEventListener("triggerdown", this.onGrabStart);
            });
        }
    });
};



export { Vr };