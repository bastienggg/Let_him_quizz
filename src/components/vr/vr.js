document.addEventListener('DOMContentLoaded', () => {
    const leftController = document.querySelector("#leftController");
    const rightController = document.querySelector("#rightController");

    leftController.setAttribute("movement-controls", "enabled: true");
    rightController.setAttribute("movement-controls", "enabled: true");

    leftController.addEventListener('thumbstickmoved', (event) => {
        const camera = document.querySelector('#camera');
        const { x, y } = event.detail;
        camera.object3D.position.x += x * 0.1;
        camera.object3D.position.z += y * 0.1;
    });

    rightController.addEventListener('thumbstickmoved', (event) => {
        const camera = document.querySelector('#camera');
        const { x, y } = event.detail;
        camera.object3D.position.x += x * 0.1;
        camera.object3D.position.z += y * 0.1;
    });
});

