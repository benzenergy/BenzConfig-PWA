function calculateFuel(distance, cityRate, roadRate, cityProp, roadProp) {
    const cityDistance = distance * cityProp / 100;
    const roadDistance = distance * roadProp / 100;

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

// Получаем пропорции и нормы расхода
function getProps(isWinter) {
    const cityProp = Number(document.getElementById("cityProp").value) || 30;
    const roadProp = Number(document.getElementById("roadProp").value) || 70;

    let cityRate, roadRate;
    if (isWinter) {
        cityRate = Number(document.getElementById("cityRate").value) || 13.8;
        roadRate = Number(document.getElementById("roadRate").value) || 10.2;
    } else {
        cityRate = Number(document.getElementById("cityRate").value) || 11.5;
        roadRate = Number(document.getElementById("roadRate").value) || 8.5;
    }

    return { cityProp, roadProp, cityRate, roadRate };
}

function calcSummer() {
    const distance = Number(document.getElementById("summerDistance").value);
    const { cityProp, roadProp, cityRate, roadRate } = getProps(false);
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
        `Городской режим ${cityProp}%\n` +
        `Трассовый режим ${roadProp}%`;
}

function calcWinter() {
    const distance = Number(document.getElementById("winterDistance").value);
    const { cityProp, roadProp, cityRate, roadRate } = getProps(true);
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
        `Городской режим ${cityProp}%\n` +
        `Трассовый режим ${roadProp}%`;
}
