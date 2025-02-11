/**
 * Moves the camera from a start position to an end position over a specified duration.
 *
 * @param {number} duration - The duration of the camera movement in milliseconds.
 * @param {number[]} startPosition - The starting position of the camera as an array [x, y, z].
 * @param {number[]} endPosition - The ending position of the camera as an array [x, y, z].
 *
 * @example
 * // Move the camera from position [0, 0, 0] to [10, 10, 10] over 2000 milliseconds
 * camera.moveCamera(2000, [0, 0, 0], [10, 10, 10]);
 */
let Camera = {};

AFRAME.registerComponent('move-to', {
    schema: {
        to: { type: 'vec3' },
        duration: { type: 'number', default: 3000 } // Durée en ms
    },

    init: function () {
        this.startPos = new THREE.Vector3();
        this.endPos = new THREE.Vector3(this.data.to.x, this.data.to.y, this.data.to.z);
        this.elapsedTime = 0;
        this.moving = true;
    },

    tick: function (deltaTime) {
        if (!this.moving) return;

        // Obtenir la position actuelle à partir de l'attribut (compatible VR)
        let position = this.el.getAttribute('position');
        this.startPos.set(position.x, position.y, position.z);

        this.elapsedTime += deltaTime;
        let t = Math.min(this.elapsedTime / this.data.duration, 1); // Valeur entre 0 et 1

        // Calculer la nouvelle position
        let newPos = new THREE.Vector3().lerpVectors(this.startPos, this.endPos, t);

        // Appliquer la nouvelle position avec setAttribute (obligatoire en VR)
        this.el.setAttribute('position', `${newPos.x} ${newPos.y} ${newPos.z}`);

        if (t >= 1) {
            this.moving = false; // Stopper l'animation
        }
    }
});

// Fonction pour déclencher le déplacement
Camera.moveCameraVR = function (startPos, endPos, duration) {
    let rig = document.querySelector('#rig');

    // Forcer la position de départ avec setAttribute (important pour WebXR)
    rig.setAttribute('position', `${startPos.x} ${startPos.y} ${startPos.z}`);

    // Appliquer l'animation
    rig.setAttribute('move-to', `to: ${endPos.x} ${endPos.y} ${endPos.z}; duration: ${duration}`);
}





export { Camera };