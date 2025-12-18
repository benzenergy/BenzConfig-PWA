function calculateFuel(distance, cityRate, roadRate, cityProp, roadProp) {
    const cityDistance = distance * cityProp;
    const roadDistance = distance * roadProp;
    const cityFuel = cityDistance * cityRate / 100;
    const roadFuel = roadDistance * roadRate / 100;
    return {
        totalFuel: cityFuel + roadFuel,
        cityDistance,
        roadDistance
    };
}

/* SUMMER */
function calcSummer() {
    const input = document.getElementById('summerDistance').value;
    if (!input || isNaN(input)) {
        document.getElementById('summerResult').innerText = 'Введите значение пробега';
        return;
    }

    const distance = Number(input);
    const cityRate = Number(inputCityRate.value) || 11.5;
    const roadRate = Number(inputRoadRate.value) || 8.5;
    const cityProp = (Number(inputCityProp.value) || 30) / 100;
    const roadProp = (Number(inputRoadProp.value) || 70) / 100;

    const r = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);
    summerResult.innerText = `Общий расход: ${r.totalFuel.toFixed(2)} л`;
}

/* WINTER */
function calcWinter() {
    const input = document.getElementById('winterDistance').value;
    if (!input || isNaN(input)) {
        document.getElementById('winterResult').innerText = 'Введите значение пробега';
        return;
    }

    const distance = Number(input);
    const cityRate = Number(inputCityRate.value) || 13.8;
    const roadRate = Number(inputRoadRate.value) || 10.2;
    const cityProp = (Number(inputCityProp.value) || 30) / 100;
    const roadProp = (Number(inputRoadProp.value) || 70) / 100;

    const r = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);
    winterResult.innerText = `Общий расход: ${r.totalFuel.toFixed(2)} л`;
}

/* SPLASH + SW */
window.addEventListener('load', () => {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.opacity = 0;
        splash.style.transform = 'scale(1.1)';
        setTimeout(() => splash.remove(), 500);
    }, 700);

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js');
    }
});
