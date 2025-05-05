document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

    // Проверяем, запущено ли приложение в Telegram Web App
    const isTelegram = window.Telegram && window.Telegram.WebApp;

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

        // Фиксируем высоту для корректной работы ScrollTrigger
        gsap.set(triggerElement, { height: "100vh" });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: "top top",
                end: "bottom top",
                scrub: 1, // Увеличиваем плавность
                pin: true,
                markers: true, // Включаем маркеры для отладки
                anticipatePin: 1 // Предотвращаем "прыжки" при пиннинге
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
        }, 1000); // Даём время на загрузку
    }

    function handleOrientation(event) {
        console.log("Orientation event:", event);
        const beta = event
