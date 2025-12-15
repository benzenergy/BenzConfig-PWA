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
