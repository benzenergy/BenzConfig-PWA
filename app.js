function calculateFuel(distance, cityRate, roadRate, cityProp = 0.3, roadProp = 0.7) {
    const cityDistance = distance * cityProp;
    const roadDistance = distance * roadProp;
    const cityFuel = cityDistance * cityRate / 100;
    const roadFuel = roadDistance * roadRate / 100;
    const totalFuel = cityFuel + roadFuel;
    return { totalFuel, cityDistance, roadDistance, cityFuel, roadFuel }; 
}

let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) event.preventDefault();
    lastTouchEnd = now;
}, false);

function calcSummer() {    
    const input = document.getElementById("summerDistance").value; 
    if (!input || isNaN(input)) { 
        document.getElementById("summerResult").innerText = "Введите значение пробега"; 
        return; 
    }
    const distance = Number(input);
    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 11.5;
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 8.5;
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3;
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7;

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    document.getElementById("summerResult").innerText =
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
}

function calcWinter() {
    const input = document.getElementById("winterDistance").value; 
    if (!input || isNaN(input)) {
        document.getElementById("winterResult").innerText = "Введите значение пробега";
        return;
    }
    const distance = Number(input);
    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 13.8; 
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 10.2; 
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3; 
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7; 

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp);

    document.getElementById("winterResult").innerText =
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
}

document.getElementById('btnAbout').addEventListener('click', function() { 
    const modal = document.createElement('div');
    modal.className = 'modal-background';

    const container = document.createElement('div');
    container.className = 'modal-container';

    const img = document.createElement('img');
    img.src = 'assets/icon-180.png';
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

window.addEventListener('load', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => console.log('Service Worker registered'))
            .catch(err => console.warn('SW error:', err));
    }

    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.opacity = 0;
        splash.style.transform = 'scale(1.2)';
        setTimeout(() => splash.style.display = 'none', 500);
    }, 700);
});

/* =========================
   EASTER EGG (5 taps)
========================= */

document.addEventListener('DOMContentLoaded', () => {
    const icon = document.querySelector('.app-icon');
    if (!icon) return;

    let tapCount = 0;
    let tapTimer = null;

    icon.addEventListener('click', () => {
        tapCount++;

        // сброс таймера
        clearTimeout(tapTimer);
        tapTimer = setTimeout(() => {
            tapCount = 0;
        }, 3000);

        if (tapCount === 5) {
            tapCount = 0;
            showEasterEgg();
        }
    });
});

function showEasterEgg() {
    const modal = document.createElement('div');
    modal.className = 'modal-background';

    const container = document.createElement('div');
    container.className = 'modal-container';

    const text = document.createElement('p');
    text.className = 'modal-text';
    text.innerText =
        "🐣 Пасхалка\n\n" +
        "BenzConfig\n" +
        "Версия: 1.5.0\n\n" +
        "Ты нашёл скрытое меню 🙂";

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerText = 'OK';

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    container.appendChild(text);
    container.appendChild(closeBtn);
    modal.appendChild(container);
    document.body.appendChild(modal);
}
