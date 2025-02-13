import { Camera } from './components/camera/camera.js';
import { Vr } from './components/vr/vr.js';

window.addEventListener("load", function () {

    const progressBar = document.getElementById("progress-bar");

    let width = 0;

    const interval = setInterval(function () {

        if (width >= 100) {

            clearInterval(interval);

            setTimeout(function () {
                document.getElementById("progress-bar-container").style.display = "none";
                const scene = document.querySelector("a-scene");
                scene.style.display = "block";
                setTimeout(function () {
                    console.log('Déplacer le joueur en 8 secondes plus optimisation et fix loading screen et position 1.5 et corrextion loding screnn puis clique fix');
                    scene.setAttribute("cursor", "rayOrigin: mouse; ");
                    Camera.moveCameraVR({ x: 0, y: 2.2, z: 0 }, { x: 1.237, y: 1.5, z: -35 }, 8000);
                    // Camera.moveCamera(8000, [0, 2.2, 0], [1.237, 3, -35.03326]);
                    Vr.setupControllerClickHandler("#rightController");
                }, 500);
            }, 1000); // 1 second delay before switching to the scene
        } else {
            width++;
            progressBar.style.width = width + "%";
        }

    }, 10); // 10ms interval for smoother progress

});
