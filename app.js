// ===================== Летний расчет с плавным скроллом =====================
function calcSummer() {
    const input = document.getElementById("summerDistance").value;
    const resultDiv = document.getElementById("summerResult");

    if (!input || isNaN(input)) {
        resultDiv.innerText = "Введите значение пробега";
        scrollToResultWithFade("summerResult"); // Скролл и эффект появления
        return;
    }

    const distance = Number(input);

    // Проверка пустых значений input, чтобы 0 не заменялся на дефолт
    const cityRateInput = document.getElementById("inputCityRate").value;
    const cityRate = cityRateInput !== "" ? Number(cityRateInput) : 11.5;

    const roadRateInput = document.getElementById("inputRoadRate").value;
    const roadRate = roadRateInput !== "" ? Number(roadRateInput) : 8.5;

    const cityPropInput = document.getElementById("inputCityProp").value;
    const cityProp = cityPropInput !== "" ? Number(cityPropInput) / 100 : 0.3;

    const roadPropInput = document.getElementById("inputRoadProp").value;
    const roadProp = roadPropInput !== "" ? Number(roadPropInput) / 100 : 0.7;

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

    scrollToResultWithFade("summerResult"); // Скролл и эффект появления
}

// ===================== Зимний расчет с плавным скроллом =====================
function calcWinter() {
    const input = document.getElementById("winterDistance").value;
    const resultDiv = document.getElementById("winterResult");

    if (!input || isNaN(input)) {
        resultDiv.innerText = "Введите значение пробега";
        scrollToResultWithFade("winterResult"); // Скролл и эффект появления
        return;
    }

    const distance = Number(input);

    const cityRateInput = document.getElementById("inputCityRate").value;
    const cityRate = cityRateInput !== "" ? Number(cityRateInput) : 13.8;

    const roadRateInput = document.getElementById("inputRoadRate").value;
    const roadRate = roadRateInput !== "" ? Number(roadRateInput) : 10.2;

    const cityPropInput = document.getElementById("inputCityProp").value;
    const cityProp = cityPropInput !== "" ? Number(cityPropInput) / 100 : 0.3;

    const roadPropInput = document.getElementById("inputRoadProp").value;
    const roadProp = roadPropInput !== "" ? Number(roadPropInput) / 100 : 0.7;

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

    scrollToResultWithFade("winterResult"); // Скролл и эффект появления
}

// ===================== Функция плавного скролла с появлением =====================
function scrollToResultWithFade(resultId) {
    const resultDiv = document.getElementById(resultId);
    if (!resultDiv) return;

    resultDiv.style.opacity = 0; // Скрываем результат перед прокруткой
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Плавный скролл

    setTimeout(() => {
        resultDiv.style.transition = 'opacity 0.5s'; // Плавное появление
        resultDiv.style.opacity = 1;
    }, 100);
}
