const SMILEY = `<svg x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<circle style="fill:%fill%" cx="256" cy="256" r="256"/>
<g>
  <circle style="fill:#000;" cx="160" cy="192" r="32"/>
  <circle style="fill:#000;" cx="352" cy="192" r="32"/>
  <path style="fill:#000;" d="M256,416c-42.752,0-82.912-16.672-113.152-46.88c-6.24-6.24-6.24-16.384,0-22.624
    s16.384-6.24,22.624,0c48.352,48.384,132.64,48.384,181.024,0c6.24-6.24,16.384-6.24,22.624,0s6.24,16.384,0,22.624
    C338.912,399.328,298.752,416,256,416z"/>
</g>
</svg>`

class Smiley {
  constructor(size, x, y, color) {
    this.x = x;
    this.y = y;

    this.smiley = createDiv(SMILEY.replace('%fill%', color));
    this.smiley.style('background-color', color);
    this.smiley.style('border-radius', '50%');
    this.smiley.style('pointer-events', 'none');
    this.smiley.position(x, y);
    this.smiley.size(size, size);
  }

  update = (x, y, color) => {
    this.smiley.html(SMILEY.replace('%fill%', color));
    this.smiley.position(x, y);
  }

  hide = () => { this.smiley.hide(); }
  show = () => { this.smiley.show(); }
}