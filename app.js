// Функции расчета топлива
function calculateFuel(distance, cityRate, roadRate, cityProp = 0.3, roadProp = 0.7) { 
    // Основная функция расчета топлива: принимает расстояние, нормы расхода и пропорции города/трассы

    const cityDistance = distance * cityProp; // Вычисление километража по городу
    const roadDistance = distance * roadProp; // Вычисление километража по трассе

    const cityFuel = cityDistance * cityRate / 100; // Расход топлива по городу
    const roadFuel = roadDistance * roadRate / 100; // Расход топлива по трассе
    const totalFuel = cityFuel + roadFuel; // Общий расход топлива

    return { totalFuel, cityDistance, roadDistance, cityFuel, roadFuel }; 
    // Возвращаем объект с полным расчетом
}

let lastTouchEnd = 0; 
// Переменная для отслеживания времени последнего касания (для устранения двойного тапа на мобильных)

document.addEventListener('touchend', function (event) {
    const now = Date.now(); // Текущее время
    if (now - lastTouchEnd <= 300) { // Если прошло меньше 300 мс с последнего touchend
        event.preventDefault(); // Предотвращаем двойной тап (масштабирование или событие)
    }
    lastTouchEnd = now; // Обновляем время последнего касания
}, false);


// Летний расчет
function calcSummer() {
    const input = document.getElementById("summerDistance").value; 
    // Получаем значение пробега для летнего расчета

    if (!input || isNaN(input)) { 
        // Проверяем, что введено число
        document.getElementById("summerResult").innerText = "Введите значение пробега"; 
        // Если нет — выводим сообщение
        return; 
    }

    const distance = Number(input); // Преобразуем строку в число

    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 11.5; 
    // Получаем норму расхода по городу, если пусто — используем 11.5 л/100км
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 8.5; 
    // Аналогично для трассы
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3; 
    // Пропорция города (делим на 100), если пусто — 0.3
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7; 
    // Пропорция трассы

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp); 
    // Вызываем функцию расчета топлива

    document.getElementById("summerResult").innerText =
        `Общий расход ${totalFuel.toFixed(2)} л\n\n` + // Вывод общего расхода
        `Детализация\n` +
        `Пробег по городу ${cityDistance.toFixed(2)} км\n` + // Вывод километража по городу
        `Пробег по трассе ${roadDistance.toFixed(2)} км\n\n` + // Вывод километража по трассе
        `Нормы расхода\n` +
        `Город ${cityRate} л на 100 км\n` + // Норма расхода по городу
        `Трасса ${roadRate} л на 100 км\n\n` + // Норма расхода по трассе
        `Пропорции\n` +
        `Городской режим ${Math.round(cityProp*100)}%\n` + // Пропорция города в %
        `Трассовый режим ${Math.round(roadProp*100)}%`; // Пропорция трассы в %
}

// Зимний расчет
function calcWinter() {
    const input = document.getElementById("winterDistance").value; 
    // Получаем значение пробега для зимнего расчета

    if (!input || isNaN(input)) { 
        document.getElementById("winterResult").innerText = "Введите значение пробега"; 
        return; 
    }

    const distance = Number(input); // Преобразуем строку в число

    const cityRate = Number(document.getElementById("inputCityRate")?.value) || 13.8; 
    const roadRate = Number(document.getElementById("inputRoadRate")?.value) || 10.2; 
    const cityProp = Number(document.getElementById("inputCityProp")?.value) / 100 || 0.3; 
    const roadProp = Number(document.getElementById("inputRoadProp")?.value) / 100 || 0.7; 
    // Получаем нормы расхода и пропорции, с разными дефолтными значениями для зимы

    const { totalFuel, cityDistance, roadDistance } = calculateFuel(distance, cityRate, roadRate, cityProp, roadProp); 
    // Вызываем функцию расчета

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
        // Выводим результат аналогично летнему
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
