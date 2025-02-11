import { Camera } from './components/camera/camera.js';

document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.getElementById("progress-bar");
    const assets = document.querySelector("a-assets");

    assets.addEventListener("progress", function (event) {
        const progress = event.detail.loaded / event.detail.total;
        progressBar.style.width = (progress * 100) + "%";
    });

    assets.addEventListener("loaded", function () {
        document.getElementById("progress-bar-container").style.display = "none";
        const scene = document.querySelector("a-scene");
        scene.style.display = "block";
        scene.setAttribute("cursor", "rayOrigin: mouse;");

        setTimeout(function () {
            console.log('Déplacer le joueur en 8 secondes');
            console.log('fix');
            Camera.moveCameraVR({ x: 0, y: 2.2, z: 0 }, { x: 1.237, y: 3, z: -35 }, 8000);
        }, 500);
    });
});
