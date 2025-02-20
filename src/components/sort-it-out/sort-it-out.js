let SortItOut = {};


SortItOut.setupDraggables = function () {
    AFRAME.registerComponent("draggable", {
        init: function () {
            const el = this.el;
            let isDragging = false;

            el.addEventListener("mousedown", function () {
                isDragging = true;
                el.setAttribute("dynamic-body", "mass: 0"); // Désactive temporairement la gravité pendant le drag
            });

            document.addEventListener("mousemove", function (evt) {
                if (isDragging) {
                    const raycaster =
                        document.querySelector("a-scene").components.raycaster;
                    const intersection = raycaster.getIntersection(el);

                    if (intersection) {
                        const point = intersection.point;
                        el.setAttribute(
                            "position",
                            `${point.x} ${point.y} ${el.getAttribute("position").z}`
                        ); // Bloque sur Z
                    }
                }
            });

            document.addEventListener("mouseup", function () {
                if (isDragging) {
                    isDragging = false;
                    el.setAttribute("dynamic-body", "mass: 5"); // Réactive la gravité
                }
            });
        },
    });

}

SortItOut.ChekIfInside = function () {
    const box = document.querySelector("#movableBox");
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

    // Valeurs des boîtes
    const movableBoxValue = parseInt(box.getAttribute("data-valeur"));
    const hollowBoxValue = parseInt(hollowBox.getAttribute("data-valeur"));

    // Vérifier si la boîte rouge est dans la boîte creuse
    if (
        boxPos.x >= minX &&
        boxPos.x <= maxX &&
        boxPos.y >= minY &&
        boxPos.y <= maxY &&
        boxPos.z >= minZ &&
        boxPos.z <= maxZ
    ) {
        // Vérification si les valeurs des deux boîtes sont égales
        if (movableBoxValue === hollowBoxValue) {
            console.log(
                `✅ Boîte rouge DEDANS avec les mêmes valeurs! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
            );
            light.setAttribute("color", "green");
        } else {
            console.log(
                `❌ Boîte rouge DEDANS mais avec des valeurs différentes! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
            );
            light.setAttribute("color", "white");
        }
    } else {
        console.log(
            `❌ Boîte rouge DEHORS! Valeur boîte rouge: ${movableBoxValue} | Valeur boîte creuse: ${hollowBoxValue}`
        );
        light.setAttribute("color", "white");
    }
}

export { SortItOut };