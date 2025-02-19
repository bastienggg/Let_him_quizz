let Vr = {};

Vr.setupControllerClickHandler = function (controllerSelector) {
    let controller = document.querySelector(controllerSelector);
    let grabbedObject = null;
    let offset = new THREE.Vector3();

    // 🎮 Quand la gâchette est pressée
    controller.addEventListener("selectstart", function () {
        let intersectedEl = controller.components.raycaster.intersectedEls[0];

        if (intersectedEl) {
            console.log("Clic sur :", intersectedEl);

            // 📌 Si l'objet a "dynamic-body", on le prend
            if (intersectedEl.hasAttribute("dynamic-body")) {
                console.log("Objet saisi :", intersectedEl);
                grabbedObject = intersectedEl;

                // Désactiver la gravité temporairement
                grabbedObject.setAttribute("dynamic-body", "mass: 0");

                // Calculer l'offset entre le contrôleur et l'objet
                let objPos = grabbedObject.object3D.position.clone();
                let controllerPos = controller.object3D.position.clone();
                offset.copy(objPos).sub(controllerPos);
            } else {
                // 📌 Sinon, on déclenche un clic classique
                let clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
                intersectedEl.dispatchEvent(clickEvent);
            }
        }
    });

    // 🎮 Mise à jour continue pendant la saisie
    controller.addEventListener("controller-move", function () {
        if (grabbedObject) {
            let controllerPos = controller.object3D.position;
            grabbedObject.object3D.position.copy(controllerPos).add(offset);
        }
    });

    // 🎮 Quand la gâchette est relâchée
    controller.addEventListener("selectend", function () {
        if (grabbedObject) {
            console.log("Objet relâché :", grabbedObject);

            // Réactiver la gravité
            grabbedObject.setAttribute("dynamic-body", "mass: 1");

            // Vérifier s'il est dans la boîte creuse
            checkIfInside(grabbedObject);

            grabbedObject = null; // Reset
        }
    });
};

// 📌 Vérifie si la boîte mobile est dans la boîte creuse
function checkIfInside(box) {
    const hollowBox = document.querySelector("#hollowBox");
    const light = document.querySelector("#light");

    const boxPos = box.object3D.position;
    const hollowPos = hollowBox.object3D.position;

    const minX = hollowPos.x - 1.4,
        maxX = hollowPos.x + 1.4;
    const minY = hollowPos.y - 1.4,
        maxY = hollowPos.y + 1.4;
    const minZ = hollowPos.z - 1.4,
        maxZ = hollowPos.z + 1.4;

    if (
        boxPos.x >= minX &&
        boxPos.x <= maxX &&
        boxPos.y >= minY &&
        boxPos.y <= maxY &&
        boxPos.z >= minZ &&
        boxPos.z <= maxZ
    ) {
        console.log("✅ Boîte rouge DEDANS !");
        light.setAttribute("color", "green");
    } else {
        console.log("❌ Boîte rouge DEHORS !");
        light.setAttribute("color", "white");
    }
}

export { Vr };
