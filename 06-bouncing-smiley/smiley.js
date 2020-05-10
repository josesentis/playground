class Smiley {
  constructor(size, x, y, color) {
    this.x = x;
    this.y = y;

    this.smiley = createDiv();
    this.smiley.style('background-color', color);
    this.smiley.style('border-radius', '50%');
    this.smiley.style('pointer-events', 'none');
    this.smiley.position(x, y);
    this.smiley.size(size, size);
  }

  update = (x, y, color) => {
    this.smiley.style('background-color', color);
    this.smiley.position(x, y);
  }

  hide = () => { this.smiley.hide(); }
  show = () => { this.smiley.show(); }
}