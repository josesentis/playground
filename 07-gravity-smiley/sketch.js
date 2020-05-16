// game settings
const ballSize = 100;
const canvasSize = 500;
const minCanvasPosition = 0;
const maxCanvasPosition = 0 + canvasSize - ballSize;
const gravity = 0.1;

// styling settings
const BG_COLORS = ['#a1ffed', '#f9aaaa', '#ddffab'];
const FILL_COLORS = ['#a1c9ff', '#fef7ad', '#abffb4'];
let colorIteration;

// ball settings
let ballX;
let ballY;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewGame() {
  ballX = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  ballY = 0;
  colorIteration = randomIntFromInterval(0, BG_COLORS.length - 1);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  createNewGame();

  smiley = new Smiley(ballSize, ballX, ballY, FILL_COLORS[colorIteration]);
}

function draw() {
  background(BG_COLORS[colorIteration]);
  noStroke();

	smiley.update(FILL_COLORS[colorIteration]);
}
