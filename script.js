document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Проверяем, что GSAP и ScrollTrigger загружены
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.error("GSAP or ScrollTrigger not loaded");
        return;
    }

    // Регистрируем ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    console.log("ScrollTrigger registered");

    // Параллакс-эффект
    const triggerElement = document.querySelector('[data-parallax-layers]');
    if (!triggerElement) {
        console.error("Trigger element [data-parallax-layers] not found");
        return;
    }

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: triggerElement,
            start: "top top", // Начало анимации, когда верх элемента достигает верха вьюпорта
            end: "bottom top", // Конец анимации, когда низ элемента достигает верха вьюпорта
            scrub: true, // Плавная анимация при скролле
            markers: true, // Включаем маркеры для отладки
            pin: true // Фиксируем элемент на месте во время анимации
        }
    });

    const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 55 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
    ];

    layers.forEach((layerObj, idx) => {
        const elements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
        if (elements.length === 0) {
            console.warn(`No elements found for layer ${layerObj.layer}`);
            return;
        }
        tl.to(
            elements,
            {
                yPercent: layerObj.yPercent,
                ease: "none"
            },
            idx === 0 ? undefined : "<"
        );
        console.log(`Layer ${layerObj.layer} animation added with yPercent: ${layerObj.yPercent}`);
    });

    // Обновляем ScrollTrigger после загрузки
    ScrollTrigger.refresh();
});
