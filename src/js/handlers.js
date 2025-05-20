/*------------------ Variables ------------------*/
const aimElem = document.getElementById('aimWrapper');
const { left, top } = aimElem.getBoundingClientRect();
let leftAimPos = left;
let topAimPos = top;

/*------------------ Movement Handler ------------------*/
const handleMovement = (key) => {
    const aimWidth = aimElem.clientWidth;
    const aimHeight = aimElem.clientHeight;
    const maxX = screenWidth - aimWidth;
    const maxY = screenHeight - aimHeight;
    const halfWidth = aimWidth / 2;
    const halfHeight = aimHeight / 2;

    if (CONTROLS.LEFT.includes(key)) {
        leftAimPos = Math.max(0, leftAimPos - stepAimMover);
        if (leftAimPos <= 0) leftAimPos = maxX;
    }
    else if (CONTROLS.RIGHT.includes(key)) {
        leftAimPos = Math.min(maxX, leftAimPos + stepAimMover);
        if (leftAimPos >= screenWidth - halfWidth) leftAimPos = 0;
    }
    else if (CONTROLS.DOWN.includes(key)) {
        topAimPos = Math.min(maxY, topAimPos + stepAimMover);
        if (topAimPos >= screenHeight - halfHeight) topAimPos = 0;
    }
    else if (CONTROLS.UP.includes(key)) {
        topAimPos = Math.max(0, topAimPos - stepAimMover);
        if (topAimPos <= 0) topAimPos = maxY;
    }

    aimElem.style.cssText = `left:${leftAimPos}px;top:${topAimPos}px;`;
};

/*------------------ Fire Handler ------------------*/
const handleFire = () => {
    const rect = aimElem.getBoundingClientRect();
    const x = rect.x + rect.width / 2;
    const y = rect.y + rect.height / 2;

    document.elementFromPoint(x, y)?.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            clientX: x,
            clientY: y
        })
    );
};

/*------------------ Click/Keydown Handlers ------------------*/
window.addEventListener('load', () => {
    window.addEventListener('keydown', (event) => {
        const { key } = event;

        if (CONTROLS.LEFT.includes(key) ||
            CONTROLS.RIGHT.includes(key) ||
            CONTROLS.DOWN.includes(key) ||
            CONTROLS.UP.includes(key)) {
            handleMovement(key);
        }
        else if (CONTROLS.FIRE.includes(key)) {
            handleFire();
        }
    });
});

/*------------------ Target Click Handler ------------------*/
function targetClickHandler(event, index) {
    const { clientX: x, clientY: y, target } = event;
    event.stopPropagation();

    if (index === 5) {
        addMissclick(x, y);
        misclicksUpdater();
        mouseTrigger('0.8', '-90deg');
    } else {
        let elem = target.closest('.target-wrapper');
        if (elem) {
            mouseTrigger('1.4', '90deg');
            targetMover(elem);
            targetTrigger(elem);
            hitsUpdater();
        }
    }

    const entry = Object.keys(scoreData)[index];
    addNewPopUpScore(entry, scoreData[entry], x, y);
    scoreUpdater(parseInt(entry));
}

/*------------------ Event Listeners ------------------*/
document.getElementById('mainArea').addEventListener('click',
    (event) => targetClickHandler(event, 5));

window.addEventListener('mousemove', ({ clientX, clientY }) => {
    const offset = 0.03 * Math.min(screenHeight, screenWidth);
    aimElem.style.cssText = `
        left:${clientX - offset}px;
        top:${clientY - offset}px;
    `;
});