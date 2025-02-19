AFRAME.registerComponent('draggable', {
    init: function () {
        const el = this.el;
        let isDragging = false;
        let grabbedObject = null;
        let offset = new THREE.Vector3();

        el.addEventListener('selectstart', function () {
            let intersectedEl = el.components.raycaster.intersectedEls[0];

            if (intersectedEl) {
                grabbedObject = intersectedEl;
                grabbedObject.setAttribute('dynamic-body', 'mass: 0');
                let objPos = grabbedObject.object3D.position.clone();
                let controllerPos = el.object3D.position.clone();
                offset.copy(objPos).sub(controllerPos);
                isDragging = true;
            }
        });

        el.addEventListener('axismove', function () {
            if (isDragging && grabbedObject) {
                let controllerPos = el.object3D.position;
                grabbedObject.object3D.position.copy(controllerPos).add(offset);
            }
        });

        el.addEventListener('selectend', function () {
            if (grabbedObject) {
                grabbedObject.setAttribute('dynamic-body', 'mass: 5');
                grabbedObject = null;
                isDragging = false;
            }
        });
    }
});

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