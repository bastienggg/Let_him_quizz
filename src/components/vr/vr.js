let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    console.log("teste clique sur tout les objet");

    let isTriggerPressed = false;
    let intersectedEl = null;

    controller.addEventListener('selectstart', function () {
        isTriggerPressed = true;
        intersectedEl = controller.components.raycaster.intersectedEls[0];
        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);
            let mousedownEvent = new MouseEvent('mousedown', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(mousedownEvent);
        }
    });

    controller.addEventListener('selectend', function () {
        if (isTriggerPressed && intersectedEl) {
            let mouseupEvent = new MouseEvent('mouseup', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(mouseupEvent);
            intersectedEl = null;
        }
        isTriggerPressed = false;
    });
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