// ===== Расчёт топлива =====
function calculateFuel(distance, cityRate, roadRate) {
    const cityProp = 0.3;
    const roadProp = 0.7;

    const cityFuel = distance * cityProp * cityRate / 100;
    const roadFuel = distance * roadProp * roadRate / 100;

    return cityFuel + roadFuel;
}

function calcSummer() {
    const d = Number(document.getElementById("summerDistance").value);
    const fuel = calculateFuel(d, 11.5, 8.5);
    document.getElementById("summerResult").innerText =
        "Расход: " + fuel.toFixed(2) + " л";
}

function calcWinter() {
    const d = Number(document.getElementById("winterDistance").value);
    const fuel = calculateFuel(d, 13.8, 10.2);
    document.getElementById("winterResult").innerText =
        "Расход: " + fuel.toFixed(2) + " л";
}

// ===== Привязка кнопок расчёта =====
document.getElementById("btnSummer").addEventListener("click", calcSummer);
document.getElementById("btnWinter").addEventListener("click", calcWinter);

// ===== Кнопка "О программе" =====
document.getElementById('btnAbout').addEventListener('click', function() {

    // Haptic (если поддерживается)
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
    
    // Создаем полупрозрачный фон модального окна
    const modal = document.createElement('div');
    modal.className = 'modal-background';

    // Контейнер с информацией
    const container = document.createElement('div');
    container.className = 'modal-container';

    // Иконка
    const img = document.createElement('img');
    img.src = 'icon-180.png';
    img.className = 'modal-icon';
    container.appendChild(img);

    // Основной текст
    const text = document.createElement('p');
    text.innerText =
        "BenzConfig Web App\n\n" +
        "Лицензия: GNU GPL v3.0\n" +
        "Материалы: www.flaticon.com\n" +
        "Исходный код: github.com/benzenergy\n" +
        "Автор: В.А. Чекаев";
    text.className = 'modal-text';
    container.appendChild(text);

    // Серый вторичный текст
    const subText = document.createElement('p');
    subText.innerText = "PWA-версия для iOS";
    subText.className = 'modal-subtext';
    container.appendChild(subText);

    // OK
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "OK";
    closeBtn.className = 'modal-close';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    container.appendChild(closeBtn);

    modal.appendChild(container);
    document.body.appendChild(modal);
});
