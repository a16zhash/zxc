document.addEventListener("DOMContentLoaded", () => {
    let time = 0;

    function animate() {
        time += 0.02; // Скорость анимации
        const maxMove = 50; // Максимальное смещение

        const layers = [
            { layer: "1", speed: 0.7 },
            { layer: "2", speed: 0.5 },
            { layer: "3", speed: 0.4 },
            { layer: "4", speed: 0.1 }
        ];

        layers.forEach(layerObj => {
            const elements = document.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
            elements.forEach(element => {
                const moveY = Math.sin(time * layerObj.speed) * maxMove;
                element.style.transform = `translateY(${moveY}px)`;
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
});
