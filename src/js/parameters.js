/*------------------ Common ------------------*/
const screenHeight = window.innerHeight;
const screenWidth = window.innerWidth;

/*------------------ DecorationParams ------------------*/
const DEFAULT_TEXT_COLOR = 'black';
const triggerColor = ['#00B64F', '#EA0037'];
const mainColors = ['#23405F']
const scoreData = {
    '100': {'fontSize': 2.7, 'fontWeight': 'bolder', 'color': mainColors[0]},
    '200': {'fontSize': 4, 'fontWeight': 'bolder', 'color': mainColors[0]},
    '300': {'fontSize': 5, 'fontWeight': 'bolder', 'color': mainColors[0]},
    '400': {'fontSize': 6, 'fontWeight': 'bolder', 'color': triggerColor[0]},
    '500': {'fontSize': 7.5, 'fontWeight': 'bolder', 'color': triggerColor[0]},
    '-100': {'fontSize': 6, 'fontWeight': 'bolder', 'color': triggerColor[1]}
};

/*------------------ Controls Configuration ------------------*/
const CONTROLS = {
    LEFT: ['ArrowLeft', 'a', 'ф'],
    RIGHT: ['ArrowRight', 'd', 'в'],
    DOWN: ['ArrowDown', 's', 'ы'],
    UP: ['ArrowUp', 'w', 'ц'],
    FIRE: [' ']
};

/*------------------ GameInit ------------------*/
let scoreCounter = 0;
let currentLevel = 1;
let misclicksCounter = 0;
let hitsCounter = 0;
let targetCounter = 0;

let timer = 2400;
let newTargetId = 0;
let targetTimeOuts = {};

//GameParams
const levelUpdateValue = 1.5;
const stepAimMover = 50;

//TimeParams
const timerStep = 350;
const maxSpeedTimerValue = 500;
const minSpeedTimerValue = 2400;
