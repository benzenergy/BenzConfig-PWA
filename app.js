// ===================== Летний расчет с плавным появлением =====================
function calcSummer() {
    const input = document.getElementById("summerDistance").value;
    const resultDiv = document.getElementById("summerResult");

    if (!input || isNaN(input)) {
        resultDiv.innerText = "Введите значение пробега";

        // Плавное появление при ошибке
        resultDiv.style.opacity = 0;
        resultDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => { resultDiv.style.opacity = 1; }, 50);

        return;
    }

    const distance = Number(input);
    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 11.5;
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 8.5;
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7;

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    resultDiv.innerText =
        `Общий расход ${totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${cityRate} л на 100 км\n` +
        `Трасса ${roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим ${Math.round(cityProp*100)}%\n` +
        `Трассовый режим ${Math.round(roadProp*100)}%`;

    // Плавное появление результата
    resultDiv.style.opacity = 0;
    resultDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => { resultDiv.style.opacity = 1; }, 50);
}

// ===================== Зимний расчет с плавным появлением =====================
function calcWinter() {
    const input = document.getElementById("winterDistance").value;
    const resultDiv = document.getElementById("winterResult");

    if (!input || isNaN(input)) {
        resultDiv.innerText = "Введите значение пробега";

        // Плавное появление при ошибке
        resultDiv.style.opacity = 0;
        resultDiv.style.transition = 'opacity 0.5s';
        setTimeout(() => { resultDiv.style.opacity = 1; }, 50);

        return;
    }

    const distance = Number(input);
    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 13.8;
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 10.2;
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7;

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    resultDiv.innerText =
        `Общий расход ${totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${cityRate} л на 100 км\n` +
        `Трасса ${roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим ${Math.round(cityProp*100)}%\n` +
        `Трассовый режим ${Math.round(roadProp*100)}%`;

    // Плавное появление результата
    resultDiv.style.opacity = 0;
    resultDiv.style.transition = 'opacity 0.5s';
    setTimeout(() => { resultDiv.style.opacity = 1; }, 50);
}
