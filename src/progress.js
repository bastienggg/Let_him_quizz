
import { Camera } from './components/camera/camera.js';

document.addEventListener("DOMContentLoaded", function () {

    const progressBar = document.getElementById("progress-bar");

    let width = 0;

    const interval = setInterval(function () {

        if (width >= 100) {

            clearInterval(interval);

            document.getElementById("progress-bar-container").style.display = "none";

            document.querySelector("a-scene").style.display = "block";

            setTimeout(function () {
                Camera.moveCamera(8000, [0, 2.2, 0], [1.237, 2.2, -33.5]);
            }, 500);

        } else {

            width++;

            progressBar.style.width = width + "%";

        }

    }, 0); // 0ms interval for no minimum time

});