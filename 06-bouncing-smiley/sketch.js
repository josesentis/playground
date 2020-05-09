// game settings
const ballSize = 100;
const racketHeight = ballSize / 4;
const racketWidth = ballSize;
const canvasSize = 500;
const minCanvasPosition = 0 + ballSize / 2;
const maxCanvasPosition = 0 + canvasSize - ballSize / 2;
let collision = false;
let gameOver = false;

// styling settings
const BG_COLORS = ['#a1ffed', '#f9aaaa', '#ddffab'];
const FILL_COLORS = ['#a1c9ff', '#fef7ad', '#abffb4'];
let colorIteration;

// ball settings
const BALL_SPEED = 3;
let ballX;
let ballY;
let ballDirectionX;
let ballDirectionY;

// racket settings
const keySpeed = 10;
const racketY = canvasSize - racketHeight - 20;
let racketX = 0;

// game over settings
const GAME_OVER_TEXT = 'GAME OVER';
const BUTTON_TEXT = 'Restart';
const buttonWidth = 150;
const buttonHeight = 50;
const buttonX = canvasSize / 2 - buttonWidth / 2;
const buttonY = canvasSize / 3 * 2 - buttonHeight / 2;
let button;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function restart() {
  gameOver = false;
  button.hide();
  createNewGame();
}

function createNewGame() {
  ballX = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  ballDirectionX = Math.random() < 0.5 ? 1 : -1;
  ballY = ballSize / 2;
  ballDirectionX = 1;
  ballDirectionY = 1;
  colorIteration = randomIntFromInterval(0, BG_COLORS.length - 1);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  createNewGame();

  // adds restart button
  button = createButton(BUTTON_TEXT);
  button.position(buttonX, buttonY);
  button.mousePressed(restart);
  button.size(buttonWidth, buttonHeight);
  button.style('background-color', BG_COLORS[colorIteration]);
  button.style('border', FILL_COLORS[colorIteration]);
  button.style('box-shadow', 'none');
  button.style('color', FILL_COLORS[colorIteration]);
  button.style('cursor', 'pointer');
  button.style('font-family', 'Helvetica');
  button.style('font-size', '32px');
  button.hide();
}

function draw() {
  if (!gameOver) {
    background(BG_COLORS[colorIteration]);
    noStroke();

    // create motion
    ballX = ballX + ballDirectionX * BALL_SPEED;
    ballY = ballY + ballDirectionY * BALL_SPEED;

    // creates ball
    fill(FILL_COLORS[colorIteration]);
    ellipse(ballX, ballY, ballSize, ballSize);

    // creates racket
    fill(255);
    rect(racketX, racketY, racketWidth, racketHeight);

    // canvas side collision
    if (ballX <= minCanvasPosition || ballX >= maxCanvasPosition) {
      ballDirectionX = ballDirectionX * -1;
      collision = true;
    }

    // canvas top collision
    // if (ballY <= minCanvasPosition || ballY >= maxCanvasPosition) {
    if (ballY <= minCanvasPosition) {
      ballDirectionY = ballDirectionY * -1;
      collision = true;
    }

    // collision control
    if (collision === true) {
      colorIteration = (colorIteration + 1) % BG_COLORS.length;
      collision = false;
    }

    if (ballY >= maxCanvasPosition) {
      gameOver = true;
    }

    // key control
    if (keyIsDown(RIGHT_ARROW) && (racketX + racketWidth) < canvasSize) {
      racketX = racketX + keySpeed;
    } else if (keyIsDown(LEFT_ARROW) && racketX > 0) {
      racketX = racketX - keySpeed;
    }
  } else {
    // adds game over text
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont('Helvetica');
    background('#f5f5f5');
    fill(0);
    text(GAME_OVER_TEXT, 0, 0, canvasSize, canvasSize);

    button.show();
  }
}
