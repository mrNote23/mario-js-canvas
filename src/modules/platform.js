import { ctx } from "./canvas";

export class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;

    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    ctx.drawImage(this.image, this.position.x, this.position.y);
  }
}
