/*------------------ Variables ------------------*/
const scoreLabel = document.getElementById('scoreCounterLabel');
const levelLabel = document.getElementById('levelCounterLabel');
const misclickStatLabel = document.getElementById('misclickStatLabel');
const hitStatLabel = document.getElementById('hitStatLabel');
const targetCounterLabel = document.getElementById('targetCounterLabel');
const mainArea = document.getElementById('mainArea');

/*------------------ GAME LOGIC ------------------*/
function scoreUpdater(value) {
    const isPositive = value > 0;
    trigger(scoreLabel, triggerColor[isPositive ? 0 : 1]);

    scoreCounter += value;
    scoreLabel.textContent = `Score: ${scoreCounter}`;
    levelUpdater();
}

function levelUpdater() {
    const levelThreshold = currentLevel * levelUpdateValue * 1000;
    const prevLevelThreshold = (currentLevel - 1) * levelUpdateValue * 1000;

    if (levelThreshold <= scoreCounter) {
        // Level up
        trigger(levelLabel, triggerColor[0]);
        currentLevel++;
        timer = Math.max(timer - timerStep, maxSpeedTimerValue);
    } else if (prevLevelThreshold > scoreCounter && currentLevel !== 1) {
        // Level down
        trigger(levelLabel, triggerColor[1]);
        currentLevel--;
        timer = Math.min(timer + timerStep, minSpeedTimerValue);
    }

    levelLabel.textContent = `Lvl: ${currentLevel}`;
}

function misclicksUpdater() {
    misclickStatLabel.textContent = `Misclicks: ${++misclicksCounter}`;
}

function hitsUpdater() {
    hitStatLabel.textContent = `Hits: ${++hitsCounter}`;
}

function targetUpdater(value) {
    targetCounterLabel.textContent = `Targets: ${targetCounter += value}`;
}

/*------------------ BUTTON HANDLERS ------------------*/
function addTarget() {
    const newElem = document.createElement('div');
    newElem.className = 'target-wrapper';
    newElem.id = `trgN${newTargetId++}`;

    newElem.innerHTML = `
        <div class="target trg1">
            <div class="target trg2">
                <div class="target trg3">
                    <div class="target trg4">
                        <div class="target trg5"></div>
                    </div>
                </div>
            </div>
        </div>`;

    newElem.querySelectorAll('.target').forEach((target, i) => {
        if (i < 5) { // Обрабатываем только trg1-trg5
            target.addEventListener('click', (event) =>
                targetClickHandler(event, i)
            );
        }
    });

    mainArea.appendChild(newElem);
    targetMover(newElem);
    targetUpdater(1);
}

function deleteTarget() {
    if (targetCounter <= 1) {
        alert('Число мишеней не может быть меньше 1');
        return;
    }

    const target = document.querySelector('.target-wrapper');
    if (target) {
        target.remove();
        targetUpdater(-1);
    }
}