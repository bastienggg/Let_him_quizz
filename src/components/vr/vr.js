let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let grabbedObject = null; // Objet actuellement saisi
    let originalParent = null; // Sauvegarde du parent d'origine

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
                originalParent = grabbedObject.parentElement; // Sauvegarde du parent d'origine

                // Désactiver la gravité temporairement
                grabbedObject.setAttribute("dynamic-body", "mass: 0");

                // Attacher l'objet au contrôleur pour le déplacer
                controller.object3D.attach(grabbedObject.object3D);
            }
        }
    });

    // Quand la gâchette est relâchée
    controller.addEventListener('selectend', function () {
        if (grabbedObject) {
            console.log("Objet relâché :", grabbedObject);

            // Replacer l'objet dans la scène (lâché du contrôleur)
            originalParent.object3D.attach(grabbedObject.object3D);

            // Réactiver la gravité
            grabbedObject.setAttribute("dynamic-body", "mass: 1");

            // Vérifier si l'objet est dans la boîte creuse
            checkIfInside(grabbedObject);

            grabbedObject = null; // Réinitialiser l'objet
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