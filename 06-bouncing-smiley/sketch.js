// game settings
const ballSize = 120;
const ballSpeed = 3;
const canvasSize = 500;
const minCanvasPosition = 0 + ballSize / 2;
const maxCanvasPosition = 0 + canvasSize - ballSize / 2;
let ballX = ballSize / 2;
let ballY = ballSize / 2;

// styling settings
const bgColors = ['#a1ffed', '#f9aaaa', '#ddffab'];
const fillColors = ['#a1c9ff', '#fef7ad', '#abffb4'];

// game variables
let ballDirectionX = 1;
let ballDirectionY = -1;
let colorIteration = 1;
let collision = false;

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  createCanvas(canvasSize, canvasSize);

  ballX = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  ballY = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  colorIteration = randomIntFromInterval(0, bgColors.length - 1);
}

function draw() {
  background(bgColors[colorIteration]);
  noStroke();
  fill(fillColors[colorIteration]);

  // create motion
  ballX = ballX + ballDirectionX * ballSpeed;
  ballY = ballY + ballDirectionY * ballSpeed;

  // creates ball
  ellipse(ballX, ballY, ballSize, ballSize);

  // canvas collision
  if(ballX <= minCanvasPosition || ballX >= maxCanvasPosition) {
    ballDirectionX = ballDirectionX * -1;
    collision = true;
  }

  if(ballY <= minCanvasPosition || ballY >= maxCanvasPosition) {
    ballDirectionY = ballDirectionY * -1;
    collision = true;
  }

  if(collision === true) {
    colorIteration = (colorIteration + 1) % bgColors.length;
    collision = false;
  }
}