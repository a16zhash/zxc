document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Регистрируем GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Параллакс-эффект
    document.querySelectorAll('[data-parallax-layers]').forEach((triggerElement) => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top top", // Начало анимации, когда верх элемента достигает верха вьюпорта
                end: "bottom top", // Конец анимации, когда низ элемента достигает верха вьюпорта
                scrub: true, // Плавная анимация при скролле
                markers: false // Можно включить для отладки (true)
            }
        });

        const layers = [
            { layer: "1", yPercent: 70 },
            { layer: "2", yPercent: 55 },
            { layer: "3", yPercent: 40 },
            { layer: "4", yPercent: 10 }
        ];

        layers.forEach((layerObj, idx) => {
            tl.to(
                triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
                {
                    yPercent: layerObj.yPercent,
                    ease: "none"
                },
                idx === 0 ? undefined : "<"
            );
        });
    });
});
