let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    console.log("teste clique sur tout les objet");
    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];
        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);
            let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(clickEvent);
        }
    });
}

export { Vr };