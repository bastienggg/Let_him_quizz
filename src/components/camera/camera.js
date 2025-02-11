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
Camera.moveCamera = function (duration, startPosition, endPosition) {
    const camera = document.querySelector('#rig');
    if (!camera) {
        console.error('Camera not found');
        return;
    }

    const start = {
        x: startPosition[0],
        y: startPosition[1],
        z: startPosition[2]
    };

    const end = {
        x: endPosition[0],
        y: endPosition[1],
        z: endPosition[2]
    };

    function easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    let startTime = null;

    function animate(time) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutQuad(progress);

        camera.setAttribute('position', {
            x: start.x + (end.x - start.x) * easedProgress,
            y: start.y + (end.y - start.y) * easedProgress,
            z: start.z + (end.z - start.z) * easedProgress
        });

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

export { Camera };