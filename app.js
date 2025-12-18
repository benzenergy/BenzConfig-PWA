// ===================== Функция расчета топлива =====================
function calculateFuel(distance, cityRate, roadRate, cityProp = 0.3, roadProp = 0.7) {
    const cityDistance = distance * cityProp; // Км в городе
    const roadDistance = distance * roadProp; // Км на трассе
    const cityFuel = cityDistance * cityRate / 100; 
    const roadFuel = roadDistance * roadRate / 100; 
    const totalFuel = cityFuel + roadFuel; 
    return { totalFuel, cityDistance, roadDistance, cityFuel, roadFuel };
}

// ===================== Отслеживание двойного тапа =====================
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) { event.preventDefault(); }
    lastTouchEnd = now;
}, false);

// ===================== Функции летнего и зимнего расчета с haptic feedback =====================
function calcSummer() { calculate('summerDistance', 'summerResult', 11.5, 8.5); }
function calcWinter() { calculate('winterDistance', 'winterResult', 13.8, 10.2); }

function calculate(distanceId, resultId, defaultCityRate, defaultRoadRate) {
    const input = document.getElementById(distanceId).value;
    if (!input || isNaN(input)) {
        document.getElementById(resultId).innerText = "Введите значение пробега"; 
        return;
    }
    const distance = Number(input);
    const cityRate = Number(document.getElementById("inputCityRate")?.value) || defaultCityRate;
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || defaultRoadRate;
    const cityProp = Number(document.getElementById("inputCityProp")?.value)/100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp")?.value)/100 || 0.7;

    if (navigator.vibrate) navigator.vibrate(10); // Haptic feedback при расчете

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    // Плавный вывод результата с анимацией
    const resultDiv = document.getElementById(resultId);
    resultDiv.style.opacity = 0;
    setTimeout(() => {
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
        resultDiv.style.transition = "opacity 0.3s";
        resultDiv.style.opacity = 1;
    }, 100);
}

// ===================== Ripple для кнопок =====================
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(0,0,0,0.1)';
        ripple.style.borderRadius = '50%';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.left = (e.offsetX - 50) + 'px';
        ripple.style.top = (e.offsetY - 50) + 'px';
        ripple.style.transform = 'scale(0)';
        ripple.style.opacity = '0.5';
        ripple.style.transition = 'transform 0.5s, opacity 1s';
        btn.appendChild(ripple);
        setTimeout(() => btn.removeChild(ripple), 500);
        setTimeout(() => ripple.style.transform = 'scale(3)', 10);
        setTimeout(() => ripple.style.opacity = '0', 300);
    });
}

// ===================== Модальное окно =====================
document.getElementById('btnAbout').addEventListener('click', function() {
    if (navigator.vibrate) navigator.vibrate(10); // Haptic feedback

    const modal = document.createElement('div'); modal.className = 'modal-background';
    const container = document.createElement('div'); container.className = 'modal-container';

    const img = document.createElement('img'); img.src = 'icon-180.png'; img.className = 'modal-icon';
    container.appendChild(img);

    const text = document.createElement('p');
    text.innerText =
        "BenzConfig Web App\n\n" +
        "Лицензия: GNU GPL v3.0\n" +
        "Материалы: www.flaticon.com\n" +
        "Исходный код: github.com/benzenergy\n" +
        "Автор: В.А. Чекаев";
    text.className = 'modal-text'; container.appendChild(text);

    const subText = document.createElement('p'); subText.innerText = "PWA-версия для iOS";
    subText.className = 'modal-subtext'; container.appendChild(subText);

    const closeBtn = document.createElement('button'); closeBtn.innerText = "OK"; closeBtn.className = 'modal-close';
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));
    container.appendChild(closeBtn);

    modal.appendChild(container); document.body.appendChild(modal);
});
