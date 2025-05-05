document.addEventListener("DOMContentLoaded", () => {
    console.log("Script loaded");

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
