import platformSmallTall from "./images/platformSmallTall.png";
import platform from "./images/platform.png";
import hills from "./images/hills.png";
import background from "./images/background.png";

import "./styles.scss";
import { Player } from "./modules/player";
import { Platform } from "./modules/platform";
import { ctx } from "./modules/canvas";
import { GenericObject } from "./modules/generic-object";
import { createImage } from "./utils/create-image";

const platformSmallTallImage = await createImage(platformSmallTall);
const platformImage = await createImage(platform);
const backgroundImage = await createImage(background);
const hillsImage = await createImage(hills);

let player;
let platforms = [];

let genericObjects = [];

let lastKey = null;
const keys = {
  left: {
    pressed: false,
  },
  right: {
    pressed: false,
  },
};

let scrollOffset = 0;

const init = () => {
  player = new Player();
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: platformSmallTallImage,
    }),
    new Platform({ x: -1, y: 470, image: platformImage }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage,
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage,
    }),
  ];

  genericObjects = [
    new GenericObject({ x: -1, y: -1, image: backgroundImage }),
    new GenericObject({ x: -1, y: -1, image: hillsImage }),
  ];

  scrollOffset = 0;
};

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.width, ctx.height);

  genericObjects.forEach((genericObject) => {
    genericObject.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });
  player.update();

  if (keys.right.pressed && player.position.x < 400)
    player.velocity.x = player.speed;
  else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  )
    player.velocity.x = -player.speed;
  else {
    player.velocity.x = 0;
    if (keys.right.pressed) {
      scrollOffset += player.speed;
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66;
      });
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed;
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66;
      });
    }
  }

  // движение платформы
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >=
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  // изменение спрайта
  if (
    keys.right.pressed &&
    lastKey === "right" &&
    player.currentSrpite !== player.sprites.run.right
  ) {
    player.frames = 1;
    player.currentSrpite = player.sprites.run.right;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    keys.left.pressed &&
    lastKey === "left" &&
    player.currentSrpite !== player.sprites.run.left
  ) {
    player.currentSrpite = player.sprites.run.left;
    player.currentCropWidth = player.sprites.run.cropWidth;
    player.width = player.sprites.run.width;
  } else if (
    !keys.left.pressed &&
    lastKey === "left" &&
    player.currentSrpite !== player.sprites.stand.left
  ) {
    player.currentSrpite = player.sprites.stand.left;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  } else if (
    !keys.right.pressed &&
    lastKey === "right" &&
    player.currentSrpite !== player.sprites.stand.right
  ) {
    player.currentSrpite = player.sprites.stand.right;
    player.currentCropWidth = player.sprites.stand.cropWidth;
    player.width = player.sprites.stand.width;
  }

  // win
  if (scrollOffset > platformImage.width * 5 + 300 - 2) {
    console.log("You win!");
  }

  // lose
  if (player.position.y > ctx.height) {
    init();
  }
}

init();
animate();

window.addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    // left
    case 37:
      keys.left.pressed = true;
      lastKey = "left";
      break;
    // down
    case 40:
      break;
    // right
    case 39:
      keys.right.pressed = true;
      lastKey = "right";
      break;
    // up
    case 38:
      if (player.velocity.y === 0) {
        player.velocity.y -= 30;
      }
      break;
  }
});

window.addEventListener("keyup", ({ keyCode }) => {
  switch (keyCode) {
    // left
    case 37:
      keys.left.pressed = false;
      break;
    // down
    case 40:
      break;
    // right
    case 39:
      keys.right.pressed = false;
      break;
    // up
    case 38:
      // player.velocity.y -= 20;
      break;
  }
});
