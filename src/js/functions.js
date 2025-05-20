/*------------------ MATH ------------------*/
function randomIntFromInterval(min, max) { // min and max include
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*------------------ MOVER'S ------------------*/
const targetMover = (elem) => {
    const x = randomIntFromInterval(screenWidth * 0.1, screenWidth * 0.8);
    const y = randomIntFromInterval(screenHeight * 0.1, screenHeight * 0.8);

    elem.style.cssText = `left:${x}px;top:${y}px;`;

    if (targetTimeOuts[elem.id]) clearTimeout(targetTimeOuts[elem.id]);
    targetTimeOuts[elem.id] = setTimeout(targetMover, timer, elem);
};

/*------------------ NICE ANIMATIONS ------------------*/
function animateAndRemove(elem, className) {
    elem.classList.add(className);
    const removeHandler = () => {
        elem.removeEventListener('transitionend', removeHandler);
        elem.remove();
    };
    elem.addEventListener('transitionend', removeHandler);
}

function addNewPopUpScore(data, style, x, y) {
    const newElem = document.createElement('text');
    newElem.className = 'popUpScore';
    newElem.textContent = data;
    newElem.style.cssText = `
        left:${x}px;
        top:${y}px;
        font-size:${style.fontSize}vh;
        font-weight:${style.fontWeight};
        color:${style.color};
    `;
    document.body.append(newElem);
    setTimeout(() => animateAndRemove(newElem, 'fade-out'), 100);
}

function addMissclick(x, y) {
    const newElem = document.createElement('div');
    newElem.className = 'missclickPoint';
    newElem.style.cssText = `left:${x}px;top:${y}px;`;
    document.body.append(newElem);
    setTimeout(() => animateAndRemove(newElem, 'disappear'), 10);
}

function trigger(elem, color = DEFAULT_TEXT_COLOR) {
    elem.style.cssText = `transform:scale(1.2);color:${color};`;
    const reset = () => {
        elem.style.cssText = 'transform:scale(1);color:' + DEFAULT_TEXT_COLOR;
        elem.removeEventListener('transitionend', reset);
    };
    elem.addEventListener('transitionend', reset);
}

function mouseTrigger(value, deg) {
    aimElem.style.transform = `scale(${value}) rotate(${deg}deg)`;
    const reset = () => {
        aimElem.style.transform = 'scale(1)';
        aimElem.removeEventListener('transitionend', reset);
    };
    aimElem.addEventListener('transitionend', reset);
}

function targetTrigger(elem) {
    elem.style.cssText = 'transform:scale(1.2);opacity:0.1;';
    const reset = () => {
        elem.style.cssText = 'transform:scale(1);opacity:1;';
        elem.removeEventListener('transitionend', reset);
    };
    elem.addEventListener('transitionend', reset);
}