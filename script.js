document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Проверяем, что все слои загружены
    const layers = document.querySelectorAll('.parallax__layer-img');
    layers.forEach(layer => {
        console.log(`Layer ${layer.getAttribute('data-parallax-layer')} src: ${layer.src}`);
    });

    // Проверяем поддержку DeviceOrientation
    if (window.DeviceOrientationEvent) {
        console.log("DeviceOrientation supported");
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    } else {
                        console.log("DeviceOrientation permission denied");
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    } else {
        console.log("DeviceOrientation not supported");
        document.addEventListener('mousemove', handleMouseMove);
    }

    function handleOrientation(event) {
        console.log("Orientation event:", event);
        const beta = event.beta;  // Наклон вперед/назад (X)
        const gamma = event.gamma; // Наклон влево/вправо (Y)

        const maxTilt = 50;
        const tiltX = Math.min(maxTilt, Math.max(-maxTilt, gamma));
        const tiltY = Math.min(maxTilt, Math.max(-maxTilt, beta));

        const layers = [
            { layer: "1", speed: 0.7 },
            { layer: "2", speed: 0.5 },
            { layer: "3", speed: 0.4 },
            { layer: "4", speed: 0.1 }
        ];

        layers.forEach(layerObj => {
            const elements = document.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
            elements.forEach(element => {
                const moveX = tiltX * layerObj.speed;
                const moveY = tiltY * layerObj.speed;
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
                console.log(`Layer ${layerObj.layer} moved to: translate(${moveX}px, ${moveY}px)`);
            });
        });
    }

    function handleMouseMove(event) {
        const parallax = document.querySelector('.parallax');
        const rect = parallax.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const tiltX = (event.clientX - centerX) / 20;
        const tiltY = (event.clientY - centerY) / 20;

        const layers = [
            { layer: "1", speed: 0.7 },
            { layer: "2", speed: 0.5 },
            { layer: "3", speed: 0.4 },
            { layer: "4", speed: 0.1 }
        ];

        layers.forEach(layerObj => {
            const elements = document.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
            elements.forEach(element => {
                const moveX = tiltX * layerObj.speed;
                const moveY = tiltY * layerObj.speed;
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
});
