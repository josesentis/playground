const circleSize = 475;
const canvasSize = 525;
const backgroundColor = '#191919';
const mainColor = '#3cea43';
let iteration = 4;
let increase = true;

function setup() {
  createCanvas(canvasSize, canvasSize);
  background(254);
}

function draw() {
  const strokeSize = circleSize / iteration;
  iteration = iteration + (increase ? +1 : -1);

  if (iteration === 50 || iteration === 0) increase = !increase;

  background(backgroundColor);
  noFill();
  stroke(mainColor);
  strokeWeight(strokeSize);
  ellipse(width / 2, height / 2, circleSize);
  noStroke();
  fill(backgroundColor);
  triangle(width / 2, height / 2, canvasSize, 150, canvasSize, canvasSize - 150);
  fill(mainColor);
  stroke(mainColor);
  strokeWeight(strokeSize);
  strokeCap(SQUARE);
  line(width / 2, height / 2, canvasSize, canvasSize);
}
