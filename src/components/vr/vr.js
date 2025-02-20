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

    console.log("Contrôleur VR prêt (avec parenting).");

    // Quand la gâchette est pressée
    controller.addEventListener('selectstart', function () {
        let intersectedEls = controller.components.raycaster.intersectedEls;
        if (intersectedEls.length > 0) {
            grabbedEl = intersectedEls[0];
            console.log("Objet attrapé :", grabbedEl);

            // Parent l'objet au contrôleur pour qu'il suive ses mouvements
            controller.object3D.attach(grabbedEl.object3D);
        }
    });

    // Quand la gâchette est relâchée
    controller.addEventListener('selectend', function () {
        if (grabbedEl) {
            console.log("Objet relâché :", grabbedEl);

            // Détache l'objet du contrôleur et le replace dans la scène
            controller.sceneEl.object3D.attach(grabbedEl.object3D);
            grabbedEl = null;
        }
    });
};

export { Vr };