let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    console.log("teste clique sur tout les objet");
    let intersectedEl = null;
    let isDragging = false;

    controller.addEventListener('selectstart', function () {
        intersectedEl = controller.components.raycaster.intersectedEls[0];
        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);
            isDragging = true;
            intersectedEl.setAttribute("dynamic-body", "mass: 0"); // Désactive temporairement la gravité pendant le drag
        }
    });

    controller.addEventListener('selectend', function () {
        if (intersectedEl) {
            isDragging = false;
            intersectedEl.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
            intersectedEl = null;
        }
    });

    controller.addEventListener('axismove', function (evt) {
        if (isDragging && intersectedEl) {
            const intersection = controller.components.raycaster.getIntersection(intersectedEl);
            if (intersection) {
                const point = intersection.point;
                intersectedEl.setAttribute(
                    "position",
                    `${point.x} ${point.y} ${intersectedEl.getAttribute("position").z}`
                ); // Bloque sur Z
            }
        }
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