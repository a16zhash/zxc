document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Проверяем, запущено ли приложение в Telegram Web App
    const isTelegram = window.Telegram && window.Telegram.WebApp;

    // Проверяем события скролла
    window.addEventListener('scroll', () => {
        console.log('Scroll event triggered:', window.scrollY);
    });

    if (isTelegram && window.DeviceOrientationEvent) {
        console.log("Using DeviceOrientation for Telegram Web App");
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
        // Используем ScrollTrigger для обычного браузера
        if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
            console.error("GSAP or ScrollTrigger not loaded");
            return;
        }

        gsap.registerPlugin(ScrollTrigger);
        console.log("ScrollTrigger registered");

        const triggerElement = document.querySelector('[data-parallax-layers]');
        if (!triggerElement) {
            console.error("Trigger element [data-parallax-layers] not found");
            return;
        }

        // Устанавливаем высоту для корректной работы ScrollTrigger
        gsap.set(triggerElement, { height: "100vh" });

        // Создаём таймлайн для анимации
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top top",
                end: "+=100%", // Увеличиваем длительность анимации
                scrub: 1,
                pin: true,
                markers: true,
                anticipatePin: 1,
                invalidateOnRefresh: true // Пересчитываем при изменении размеров
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

        // Обновляем ScrollTrigger
        setTimeout(() => {
            ScrollTrigger.refresh();
            console.log("ScrollTrigger refreshed");
        }, 1000);
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
});
