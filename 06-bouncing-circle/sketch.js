const ballHeight = 100;
const ballWidth = 100;
const ballSpeed = 2;
const canvasSize = 500;
const mainColor = 'red';
const backgroundColor = '#f5f5f5';

const minX = 0 + ballWidth / 2;
const minX = 0 + canvasSize - ballWidth / 2;
const minY = 0 + ballHeight / 2;
const minX = 0 + canvasSize - ballHeight / 2;

let ballX = 50;
let ballY = 150;
// let ballX = ballWidth / 2;
// let ballY = ballHeight / 2;
let ballDirectionX = 1;
let ballDirectionY = -1;

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup() {
  createCanvas(canvasSize, canvasSize);

  ballX = randomIntFromInterval(0 + ballWidth / 2, canvasSize - ballWidth / 2);
  ballY = randomIntFromInterval(0 + ballHeight / 2, canvasSize - ballHeight / 2);
}

function draw() {
  background(0);
  noStroke();
  fill(255);

  // create motion
  ballX = ballX + ballDirectionX * ballSpeed;
  ballY = ballY + ballDirectionY * ballSpeed;

  // creates ball
  ellipse(ballX, ballY, ballWidth, ballHeight);

  // canvas collision
  if(ballX <= 0 + ballWidth / 2 || ballX >= (canvasSize - ballWidth / 2)) ballDirectionX = ballDirectionX * -1;
  if(ballY <= 0 + ballHeight / 2 || ballY >= (canvasSize - ballHeight / 2)) ballDirectionY = ballDirectionY * -1;
}