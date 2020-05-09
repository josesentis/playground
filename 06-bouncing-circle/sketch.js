const ballSize = 120;
const ballSpeed = 3;
const canvasSize = 500;
const mainColor = 'red';
const backgroundColor = '#f5f5f5';
const minCanvasPosition = 0 + ballSize / 2;
const maxCanvasPosition = 0 + canvasSize - ballSize / 2;
const bgColors = ['#a1ffed', '#f9aaaa', '#ddffab'];
const fillColors = ['#a1c9ff', '#fef7ad', '#abffb4'];

let ballX = ballSize / 2;
let ballY = ballSize / 2;
let ballDirectionX = 1;
let ballDirectionY = -1;
let colorIteration = 1;
let collision = false;

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  createCanvas(canvasSize, canvasSize);

  ballX = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  ballY = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
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