// game settings
const ballSize = 100;
const paddleHeight = ballSize / 5;
const paddleWidth = ballSize / 4 * 3;
const canvasSize = 500;
const minCanvasPosition = 0;
const maxCanvasPosition = 0 + canvasSize - ballSize;
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

// paddle settings
const keySpeed = 10;
const paddleY = canvasSize - paddleHeight - 20;
let paddleX = 0;

// game over settings
const GAME_OVER_TEXT = 'GAME OVER';
const BUTTON_TEXT = 'Restart';
const buttonWidth = 150;
const buttonHeight = 50;
const buttonX = canvasSize / 2 - buttonWidth / 2;
const buttonY = canvasSize / 3 * 2 - buttonHeight / 2;
let button;
let smiley;

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function restart() {
  gameOver = false;
  button.hide();
  smiley.show();
  createNewGame();
}

function createNewGame() {
  ballX = randomIntFromInterval(minCanvasPosition, maxCanvasPosition);
  ballY = 0;
  ballDirectionX = Math.random() < 0.5 ? 1 : -1;
  ballDirectionY = 1;
  colorIteration = randomIntFromInterval(0, BG_COLORS.length - 1);
}

function setup() {
  createCanvas(canvasSize, canvasSize);
  createNewGame();

  // adds restart button
  button = createButton(BUTTON_TEXT);
  button.position(buttonX, buttonY);
  button.size(buttonWidth, buttonHeight);
  button.mousePressed(restart);
  button.style('background-color', FILL_COLORS[colorIteration]);
  button.style('border', FILL_COLORS[colorIteration]);
  button.style('box-shadow', 'none');
  button.style('color', BG_COLORS[colorIteration]);
  button.style('cursor', 'pointer');
  button.style('font-family', 'Helvetica');
  button.style('font-size', '28px');
  button.hide();

  smiley = createDiv();
  smiley.id('smiley');
  smiley.style('background-color', FILL_COLORS[colorIteration]);
  smiley.style('border-radius', '50%');
  smiley.style('pointer-events', 'none');
  smiley.position(ballX, ballY);
  smiley.size(ballSize, ballSize);
}

function draw() {
  if (!gameOver) {
    background(BG_COLORS[colorIteration]);
    noStroke();

    // create motion
    ballX = ballX + ballDirectionX * BALL_SPEED;
    ballY = ballY + ballDirectionY * BALL_SPEED;

    // creates ball
    smiley.style('background-color', FILL_COLORS[colorIteration]);
    smiley.position(ballX, ballY);

    // creates paddle
    fill(255);
    rect(paddleX, paddleY, paddleWidth, paddleHeight);

    // canvas side collision
    if (ballX <= minCanvasPosition || ballX >= maxCanvasPosition) {
      ballDirectionX = ballDirectionX * -1;
      collision = true;
    }

    // canvas top collision
    if (ballY <= minCanvasPosition) {
      ballDirectionY = 1;
      collision = true;
    }

    // paddle collision after knowing game over or not
    if (ballY + ballSize === paddleY &&
      ((ballX + (ballSize / 3 * 2) >= paddleX && ballX + (ballSize / 3 * 2) <= (paddleX + paddleWidth)) ||
        (ballX - (ballSize / 3 * 2) >= paddleX && ballX - (ballSize / 3 * 2) <= (paddleX + paddleWidth)))
    ) {
      ballDirectionY = -1;
      collision = true;
    }

    // out of bounds
    if (ballY >= maxCanvasPosition) {
      gameOver = true;
    }

    // collision control
    if (collision === true) {
      colorIteration = (colorIteration + 1) % BG_COLORS.length;
      collision = false;
    }

    // key control
    if (keyIsDown(RIGHT_ARROW) && (paddleX + paddleWidth) < canvasSize) {
      paddleX = paddleX + keySpeed;
    } else if (keyIsDown(LEFT_ARROW) && paddleX > 0) {
      paddleX = paddleX - keySpeed;
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
    smiley.hide();
  }
}

function keyPressed() {
  if (gameOver && keyCode === ENTER) restart();
}
