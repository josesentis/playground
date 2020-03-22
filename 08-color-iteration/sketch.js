const colors = [
  [132, 94, 194],
  [214, 93, 177],
  [247, 111, 145],
  [248, 150, 113],
  [250, 199, 95],
  [249, 248, 114]
];

function setup() {
  createCanvas(500, 500);
  background(245);
}

function draw() {
  const seconds = new Date().getSeconds() % 12;
  let selectedColor = colors[0];
  
    if (seconds <= 2) {
     selectedColor = colors[0];
  } else if (seconds <= 4) {
    selectedColor = colors[1];
  } else if (seconds <= 6) {
    selectedColor = colors[2];
  } else if (seconds <= 8) {
    selectedColor = colors[3];
  } else if (seconds <= 10) {
    selectedColor = colors[4];
  } else {
    selectedColor = colors[5];
  }
  
  fill(selectedColor[0], selectedColor[1], selectedColor[2]);
  circle(mouseX, mouseY, 50);
}
