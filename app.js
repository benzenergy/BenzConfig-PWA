// Получение норм расхода и пропорций
function getProps(isWinter) {
    const cityProp = Number(document.getElementById("cityProp").value) || 30;
    const roadProp = Number(document.getElementById("roadProp").value) || 70;

    let cityRate, roadRate;
    if (isWinter) {
        cityRate = Number(document.getElementById("cityRateWinter").value) || 13.8;
        roadRate = Number(document.getElementById("roadRateWinter").value) || 10.2;
    } else {
        cityRate = Number(document.getElementById("cityRateSummer").value) || 11.5;
        roadRate = Number(document.getElementById("roadRateSummer").value) || 8.5;
    }

    return { cityProp, roadProp, cityRate, roadRate };
}

// Расчет топлива
function calculateFuel(distance, cityRate, roadRate, cityProp, roadProp) {
    const cityDistance = distance * cityProp / 100;
    const roadDistance = distance * roadProp / 100;

    const cityFuel = cityDistance * cityRate / 100;
    const roadFuel = roadDistance * roadRate / 100;

    return { totalFuel: cityFuel + roadFuel, cityDistance, roadDistance };
}

// Кнопка Лето
function calcSummer() {
    const distance = Number(document.getElementById("summerDistance").value) || 0;
    const props = getProps(false);
    const result = calculateFuel(distance, props.cityRate, props.roadRate, props.cityProp, props.roadProp);

    document.getElementById("summerResult").innerText =
        `Общий расход ${result.totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${result.cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${result.roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${props.cityRate} л на 100 км\n` +
        `Трасса ${props.roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим: ${props.cityProp}%\n` +
        `Трассовый режим: ${props.roadProp}%`;
}

// Кнопка Зима
function calcWinter() {
    const distance = Number(document.getElementById("winterDistance").value) || 0;
    const props = getProps(true);
    const result = calculateFuel(distance, props.cityRate, props.roadRate, props.cityProp, props.roadProp);

    document.getElementById("winterResult").innerText =
        `Общий расход ${result.totalFuel.toFixed(2)} л\n\n` +
        `Детализация\n` +
        `Пробег по городу ${result.cityDistance.toFixed(2)} км\n` +
        `Пробег по трассе ${result.roadDistance.toFixed(2)} км\n\n` +
        `Нормы расхода\n` +
        `Город ${props.cityRate} л на 100 км\n` +
        `Трасса ${props.roadRate} л на 100 км\n\n` +
        `Пропорции\n` +
        `Городской режим: ${props.cityProp}%\n` +
        `Трассовый режим: ${props.roadProp}%`;
}

// Кнопка "О программе"
document.getElementById('btnAbout').addEventListener('click', function() {
    if (navigator.vibrate) navigator.vibrate(10);

    const modal = document.createElement('div');
    modal.className = 'modal-background';

    const container = document.createElement('div');
    container.className = 'modal-container';

    const img = document.createElement('img');
    img.src = 'icon-180.png';
    img.className = 'modal-icon';
    container.appendChild(img);

    const text = document.createElement('p');
    text.innerText =
        "BenzConfig Web App\n\n" +
        "Лицензия: GNU GPL v3.0\n" +
        "Материалы: www.flaticon.com\n" +
        "Исходный код: github.com/benzenergy\n" +
        "Автор: В.А. Чекаев";
    text.className = 'modal-text';
    container.appendChild(text);

    const subText = document.createElement('p');
    subText.innerText = "PWA-версия для iOS";
    subText.className = 'modal-subtext';
    container.appendChild(subText);

    const closeBtn = document.createElement('button');
    closeBtn.innerText = "OK";
    closeBtn.className = 'modal-close';
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));
    container.appendChild(closeBtn);

    modal.appendChild(container);
    document.body.appendChild(modal);
});
