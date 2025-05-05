// Логирование для диагностики
console.log("Script loaded");

// Проверяем поддержку DeviceOrientation
if (window.DeviceOrientationEvent) {
    console.log("DeviceOrientation supported");
    // Запрашиваем разрешение на iOS 13+
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
    // Альтернатива для десктопа: движение мыши
    document.addEventListener('mousemove', handleMouseMove);
}

function handleOrientation(event) {
    console.log("Orientation event:", event);
    const beta = event.beta;  // Наклон вперед/назад (X)
    const gamma = event.gamma; // Наклон влево/вправо (Y)

    const maxTilt = 20;
    const tiltX = Math.min(maxTilt, Math.max(-maxTilt, gamma));
    const tiltY = Math.min(maxTilt, Math.max(-maxTilt, beta));

    const background = document.querySelector('.background');
    const foreground = document.querySelector('.foreground');

    const backgroundTiltX = tiltX * 0.5;
    const backgroundTiltY = tiltY * 0.5;
    const foregroundTiltX = tiltX * 1.2;
    const foregroundTiltY = tiltY * 1.2;

    background.style.transform = `translate(${backgroundTiltX}px, ${backgroundTiltY}px)`;
    foreground.style.transform = `translate(${foregroundTiltX}px, ${foregroundTiltY}px)`;
}

function handleMouseMove(event) {
    const card = document.querySelector('.card');
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const tiltX = (event.clientX - centerX) / 20;
    const tiltY = (event.clientY - centerY) / 20;

    const background = document.querySelector('.background');
    const foreground = document.querySelector('.foreground');

    const backgroundTiltX = tiltX * 0.5;
    const backgroundTiltY = tiltY * 0.5;
    const foregroundTiltX = tiltX * 1.2;
    const foregroundTiltY = tiltY * 1.2;

    background.style.transform = `translate(${backgroundTiltX}px, ${backgroundTiltY}px)`;
    foreground.style.transform = `translate(${foregroundTiltX}px, ${foregroundTiltY}px)`;
}

// Управление размытием через JavaScript
setInterval(() => {
    const overlay = document.querySelector('.card-overlay');
    const angle = (Date.now() % 4000) / 4000 * 360;
    const blur = 10 * Math.sin(angle * Math.PI / 180);
    overlay.style.filter = `blur(${Math.abs(blur)}px)`;
}, 16);
