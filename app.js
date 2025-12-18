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

    scrollToResultWithFade("winterResult"); // Скролл и эффект появления
}

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


// Кнопка "О программе" и модальное окно
document.getElementById('btnAbout').addEventListener('click', function() { 
    // Событие нажатия на кнопку "О программе"

    // Haptic feedback
    if (navigator.vibrate) { 
        navigator.vibrate(10); // Короткая вибрация при нажатии (если поддерживается)
    }

    // Создаем модальное окно
    const modal = document.createElement('div'); 
    modal.className = 'modal-background'; // Назначаем класс для стилизации фона

    const container = document.createElement('div'); 
    container.className = 'modal-container'; // Контейнер для контента окна

    const img = document.createElement('img'); 
    img.src = 'icon-180.png'; // Иконка в модальном окне
    img.className = 'modal-icon'; 
    container.appendChild(img); // Добавляем иконку в контейнер

    const text = document.createElement('p'); 
    text.innerText =
        "BenzConfig Web App\n\n" +
        "Лицензия: GNU GPL v3.0\n" +
        "Материалы: www.flaticon.com\n" +
        "Исходный код: github.com/benzenergy\n" +
        "Автор: В.А. Чекаев"; 
    text.className = 'modal-text'; 
    container.appendChild(text); // Добавляем основной текст в контейнер

    const subText = document.createElement('p'); 
    subText.innerText = "PWA-версия для iOS"; 
    subText.className = 'modal-subtext'; 
    container.appendChild(subText); // Добавляем подзаголовок

    const closeBtn = document.createElement('button'); 
    closeBtn.innerText = "OK"; 
    closeBtn.className = 'modal-close'; 
    closeBtn.addEventListener('click', () => { 
        document.body.removeChild(modal); 
        // Закрытие модального окна по клику на кнопку
    });
    container.appendChild(closeBtn); // Добавляем кнопку закрытия в контейнер

    modal.appendChild(container); // Добавляем контейнер с содержимым в фон модального окна
    document.body.appendChild(modal); // Отображаем модальное окно на странице
});

