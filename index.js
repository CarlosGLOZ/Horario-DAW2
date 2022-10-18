function timeToDecimal(t) {
    var arr = t.split(':');
    var dec = parseInt((arr[1] / 6) * 10, 10);

    return parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec);
}

function setTimeMarkerWidth() {
    const timeMarker = document.getElementById('time-marker');
    const horario = document.getElementById('main-table');
    let horarioWidth = getComputedStyle(horario).width;

    timeMarker.style.width = horarioWidth;
}

function setMarkerHeight(time = null) {
    // get HTML elements
    const timeMarker = document.getElementById('time-marker');
    const horario = document.getElementById('main-table');
    const horario_dias = document.getElementById('horario-dias')

    // establish horario table dimensions
    let upperBound = horario_dias.getBoundingClientRect().bottom;
    let lowerBound = horario.getBoundingClientRect().bottom;
    let horarioHeight = parseFloat(getComputedStyle(horario).height) - parseFloat(horario_dias.getBoundingClientRect().bottom - horario_dias.getBoundingClientRect().top);
    horarioHeight = horarioHeight - horarioHeight * 0.01 // sustraer más o menos el grosor de las líneas que dividen cada celda (a ojo, podría hacerlo bien con el border-width de la tabla)
    timeMarker.style.top = horarioHeight + "px";

    // get current time
    // if no time is passed, get system time
    let current;
    let currentHour;
    let currentMinutes;
    let currentHourMinutes;
    if (time == null) {

        current = new Date();
        currentHour = current.getHours();
        currentMinutes = current.getMinutes();
        if (currentMinutes.toString().length < 2) { // si los minutos son solo un caracter (0-9), añadir un 0 antes
            currentMinutes = '0' + currentMinutes;
        }
        currentHourMinutes = currentHour + ':' + currentMinutes;
    } else {
        currentHour = time[0] + time[1];
        currentMinutes = time[3] + time[4];
        currentHourMinutes = time;
    }

    console.log(typeof(time));
    if (currentHour < 15 || (currentHour >= 21 && currentMinutes > 00)) {
        timeMarker.style.display = 'none';
    } else {
        timeMarker.style.display = 'inherit';
    }

    // calculate what current hour is in percentage to max and min hour
    const minHourInDec = timeToDecimal('15:00');
    const maxHourInDec = timeToDecimal('21:00');
    const adjustedMaxHourInDec = maxHourInDec - minHourInDec; // 6

    let currentHourMinutesInDec = timeToDecimal(currentHourMinutes);
    // let currentHourMinutesInDec = 15;
    let adjustedCurrentHourMinutesInDec = currentHourMinutesInDec - minHourInDec; // x - 15
    let adjustedCurrentHourMinutesInDecPercentage = (adjustedCurrentHourMinutesInDec / adjustedMaxHourInDec);

    let finalHeightPos = (horarioHeight * adjustedCurrentHourMinutesInDecPercentage) + horario_dias.getBoundingClientRect().bottom;

    timeMarker.style.top = finalHeightPos + "px";

    // console.log(finalHeightPos + "px");

    // // test Slider
    // let slider = document.getElementById('test-slider');
    // slider.min = upperBound;
    // slider.max = lowerBound;
    // let value = document.getElementById('test-slider-value');

    // console.log(slider.value)
    // value.innerHTML = slider.value;
    // timeMarker.style.top = slider.value + "px";
    // //

    // const firstHout = timeToDecimal('15:00');
    // const lastHout = timeToDecimal('21:00');

    // console.log(firstHout + ' - ' + lastHout);

}



window.onload = function() {
    setTimeMarkerWidth();
    setMarkerHeight();
}

window.onresize = function() {
    setTimeMarkerWidth();
    setMarkerHeight();
}

// execute function every 60000ms (60s)
setInterval(function() {
    setMarkerHeight()
}, 60000)