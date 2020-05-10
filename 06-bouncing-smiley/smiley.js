class Smiley {
  constructor(img, size, x, y, color) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = size;

    console.log(img);
    this.smiley = createElement('svg');
    this.smiley.attribute('src', 'smiley.svg');
    // this.smiley.attribute('fill', color);
    this.smiley.style('border-radius', '50%');
    this.smiley.style('pointer-events', 'none');
    this.smiley.position(x, y);
    this.smiley.size(size, size);

    // image(this.img, ballX, ballY, this.size, this.size);
  }

  update = (x, y, color) => {
    // this.smiley.attribute('fill', color);
    this.smiley.position(x, y);
    // image(this.img, ballX, ballY, this.size, this.size);
  }

  hide = () => { this.smiley.hide(); }
  show = () => { this.smiley.show(); }
}