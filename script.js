document.addEventListener("DOMContentLoaded", () => {
    const isTelegram = window.Telegram && window.Telegram.WebApp;

    if (isTelegram && window.DeviceOrientationEvent) {
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                })
                .catch(console.error);
        } else {
            window.addEventListener('deviceorientation', handleOrientation);
        }
    } else {
        gsap.registerPlugin(ScrollTrigger);

        const triggerElement = document.querySelector('[data-parallax-layers]');
        gsap.set(triggerElement, { height: "100vh" });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parallax__header",
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true
            }
        });

        const layers = [
            { layer: "1", yPercent: 50 },
            { layer: "2", yPercent: 40 },
            { layer: "3", yPercent: 30 },
            { layer: "4", yPercent: 10 }
        ];

        layers.forEach((layerObj, idx) => {
            const elements = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
            tl.to(elements, { yPercent: layerObj.yPercent, ease: "none" }, idx === 0 ? undefined : "<");
        });

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }

    function handleOrientation(event) {
        const beta = event.beta;
        const gamma = event.gamma;

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
            });
        });
    }
