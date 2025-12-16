// Функция расчёта топлива с пропорциями
function calculateFuel(distance, cityRate, roadRate, cityProp, roadProp) {
    const cityDistance = distance * cityProp;
    const roadDistance = distance * roadProp;

    const cityFuel = cityDistance * cityRate / 100;
    const roadFuel = roadDistance * roadRate / 100;

    const totalFuel = cityFuel + roadFuel;

    return {
        totalFuel,
        cityDistance,
        roadDistance,
        cityFuel,
        roadFuel
    };
}

function calcSummer() {
    const distance = Number(document.getElementById("summerDistance").value);
    const cityRate = Number(document.getElementById("inputCityRate").value) || 11.5;
    const roadRate = Number(document.getElementById("inputRoadRate").value) || 8.5;
    const cityProp = Number(document.getElementById("inputCityProp").value) / 100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp").value) / 100 || 0.7;

    const res = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    document.getElementById("summerResult").innerText =
        `Общий расход ${res.totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${res.cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${res.roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${cityRate} л на 100 км\n` +
        `Трасса ${roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим ${Math.round(cityProp * 100)}%\n` +
        `Трассовый режим ${Math.round(roadProp * 100)}%`;
}

function calcWinter() {
    const distance = Number(document.getElementById("winterDistance").value);
    const cityRate = Number(document.getElementById("inputCityRate").value) || 13.8;
    const roadRate = Number(document.getElementById("inputRoadRate").value) || 10.2;
    const cityProp = Number(document.getElementById("inputCityProp").value) / 100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp").value) / 100 || 0.7;

    const res = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    document.getElementById("winterResult").innerText =
        `Общий расход ${res.totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${res.cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${res.roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${cityRate} л на 100 км\n` +
        `Трасса ${roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим ${Math.round(cityProp * 100)}%\n` +
        `Трассовый режим ${Math.round(roadProp * 100)}%`;
}
