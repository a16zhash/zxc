// Обработчик DeviceOrientation для параллакса
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
} else {
    console.log("DeviceOrientation не поддерживается на этом устройстве.");
}

function handleOrientation(event) {
    const beta = event.beta;  // Наклон вперед/назад (X)
    const gamma = event.gamma; // Наклон влево/вправо (Y)

    // Ограничиваем угол наклона для плавности
    const maxTilt = 20; // Максимальный угол наклона в градусах
    const tiltX = Math.min(maxTilt, Math.max(-maxTilt, gamma));
    const tiltY = Math.min(maxTilt, Math.max(-maxTilt, beta));

    // Применяем трансформацию к карточке
    const card = document.querySelector('.card');
    card.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
}
