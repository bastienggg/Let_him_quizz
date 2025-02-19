let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let grabbedObject = null; // Objet actuellement saisi
    console.log("teste clique sur tout les objet");

    // Quand la gâchette est pressée
    controller.addEventListener('selectstart', function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];

        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);

            // Événement de clic normal
            let clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
            intersectedEl.dispatchEvent(clickEvent);

            // Si c'est un objet mobile (ayant dynamic-body), on peut le saisir
            if (intersectedEl.hasAttribute("dynamic-body")) {
                console.log("Objet saisi :", intersectedEl);
                grabbedObject = intersectedEl;

                // Désactiver la gravité temporairement
                grabbedObject.setAttribute("dynamic-body", "mass: 0");

                // Mise à jour de la position de l'objet en fonction du contrôleur
                controller.addEventListener("controllerMove", moveObject);
            }
        }
    });

    // Met à jour la position de l'objet pour suivre le contrôleur
    function moveObject() {
        if (grabbedObject) {
            let controllerPos = controller.object3D.position;
            grabbedObject.setAttribute("position", `${controllerPos.x} ${controllerPos.y} ${controllerPos.z}`);
        }
    }

    // Quand la gâchette est relâchée
    controller.addEventListener('selectend', function () {
        if (grabbedObject) {
            console.log("Objet relâché :", grabbedObject);

            // Réactiver la gravité
            grabbedObject.setAttribute("dynamic-body", "mass: 1");

            // Vérifier si l'objet est dans la boîte creuse
            checkIfInside(grabbedObject);

            grabbedObject = null; // Réinitialiser l'objet
            controller.removeEventListener("controllerMove", moveObject);
        }
    });
};
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