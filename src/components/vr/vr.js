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


Vr.setupDraggablesVR = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let isDragging = false;
    let grabbedObject = null;
    let offset = new THREE.Vector3();

    controller.addEventListener('selectstart', function (evt) {
        let intersectedEl = evt.detail.intersectedEl;

        if (intersectedEl && intersectedEl.classList.contains('draggable')) {
            grabbedObject = intersectedEl;
            grabbedObject.setAttribute('dynamic-body', 'mass: 0');
            let objPos = grabbedObject.object3D.position.clone();
            let controllerPos = controller.object3D.position.clone();
            offset.copy(objPos).sub(controllerPos);
            isDragging = true;
        }
    });

    controller.addEventListener('axismove', function () {
        if (isDragging && grabbedObject) {
            let controllerPos = controller.object3D.position;
            grabbedObject.object3D.position.copy(controllerPos).add(offset);
        }
    });

    controller.addEventListener('selectend', function () {
        if (grabbedObject) {
            grabbedObject.setAttribute('dynamic-body', 'mass: 5');
            grabbedObject = null;
            isDragging = false;
        }
    });
}


export { Vr };