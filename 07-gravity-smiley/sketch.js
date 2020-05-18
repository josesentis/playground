// game settings
const ballSize = 100;
const ballWeight = 0.5;
const canvasSize = 500;
const minCanvasPosition = 0;
const maxCanvasPosition = 0 + canvasSize - ballSize;
const gravity = 0.2;
const smileys = [];

// styling settings
const BG_COLORS = ['#a1ffed', '#f9aaaa', '#ddffab'];
const FILL_COLORS = ['#a1c9ff', '#fef7ad', '#abffb4'];
let colorIteration;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewGame() {
  colorIteration = randomIntFromInterval(0, BG_COLORS.length - 1);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  createNewGame();
}

function draw() {
  background(BG_COLORS[colorIteration]);
  noStroke();

  smileys.map(smiley => smiley.update(FILL_COLORS[colorIteration]));
}

function mouseClicked() {
  if (mouseX <= canvasSize && mouseY <= canvasSize && mouseX >= 0 && mouseY >= 0) {
    colorIteration = randomIntFromInterval(0, BG_COLORS.length - 1);
    smileys.push(new Smiley(ballSize, ballWeight, FILL_COLORS[colorIteration], mouseX - ballSize / 2, mouseY - ballSize / 2));
  }

  return false;
}