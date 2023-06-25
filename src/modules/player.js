import spriteRunLeft from "../images/spriteRunLeft.png";
import spriteRunRight from "../images/spriteRunRight.png";
import spriteStandLeft from "../images/spriteStandLeft.png";
import spriteStandRight from "../images/spriteStandRight.png";

import { ctx, gravity } from "./canvas";

export class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 66;
    this.height = 150;
    this.speed = 15;

    this.image = this._createImage(spriteStandRight);
    this.frames = 0;
    this.sprites = {
      stand: {
        cropWidth: 177,
        width: 66,
        right: this._createImage(spriteStandRight),
        left: this._createImage(spriteStandLeft),
      },
      run: {
        cropWidth: 341,
        width: 127.875,
        right: this._createImage(spriteRunRight),
        left: this._createImage(spriteRunLeft),
      },
    };

    this.currentSrpite = this.sprites.stand.right;
    this.currentCropWidth = 177;
  }

  _createImage(imageSrc) {
    const tmp = new Image();
    tmp.src = imageSrc;
    return tmp;
  }

  draw() {
    ctx.drawImage(
      this.currentSrpite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.frames++;
    if (this.frames > 59) {
      this.frames = 0;
    } else if (
      this.frames > 29 &&
      (this.currentSrpite === this.sprites.run.right ||
        this.currentSrpite === this.sprites.run.left)
    ) {
      this.frames = 0;
    }
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= ctx.height) {
      this.velocity.y += gravity;
    }
  }
}
