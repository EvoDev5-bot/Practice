const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1200;
canvas.height = 1200;

let gameOn = true;

let impactMusic = new Audio("impact-sound-effect-8-bit-retro-151796.mp3");

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let layers = 5;

let score = 0;

let isMouseDown = false;

let hitBricks = [];

let bricks = [];

let currentBrickX = 200;
let currentBrickY = 120;

const ball = {
  x: 200,
  y: canvas.height - 200,
  size: 20,
  dx: 8,
  dy: -8 * (3 / 4),
};

const pad = {
  h: 10,
  w: 250,
  x: 200,
  speed: 10,
  y: canvas.width - 100,
  dx: 0,
};

function drawCircle() {
  ctx.fillStyle = "lime";
  ctx.beginPath();
  ctx.moveTo(ball.x + ball.size, ball.y);
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x + ball.size >= canvas.width || ball.x - ball.size <= 0) {
    ball.dx *= -1;
  }

  if (ball.y + ball.size >= canvas.height || ball.y - ball.size <= 0) {
    ball.dy *= -1;
  }

  if (ball.y + ball.size >= canvas.height) {
    score = 0;
    hitBricks = [];
  }
  if (
    ball.x + ball.size >= pad.x &&
    ball.x <= pad.x + pad.w &&
    ball.y + ball.size >= pad.y &&
    ball.y <= pad.y + pad.h
  ) {
    // ball.dx *= 1;
    ball.dy *= -1;
    impactMusic.play();
    if (ball.x > pad.x && ball.x < pad.x + pad.w / 2 - 50) {
      ball.dx *= -1;
    } else if (ball.x > pad.x && ball.x > pad.x + pad.w / 2 + 50) {
      ball.dx = ball.dx * -1;
    }
  }
}

function drawPad() {
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.fillRect(pad.x, pad.y, pad.w, pad.h);
  ctx.fill();
}

function movePad() {
  handlePadCollisions();
  pad.x += pad.dx;
}

function handlePadCollisions() {
  if (pad.x + pad.w < 0) {
    pad.x = canvas.width;
  } else if (pad.x > canvas.width) {
    pad.x = -1 * pad.w;
  }
}

function keyDown(e) {
  if (e.key == "ArrowRight" || e.key == "Right" || e.key == "d") {
    moveRight();
  }
  if (e.key == "ArrowLeft" || e.key == "Left" || e.key == "a") {
    moveLeft();
  }
}

function keyUp(e) {
  if (
    e.key == "ArrowLeft" ||
    e.key == "Left" ||
    e.key == "ArrowRight" ||
    e.key == "Right" ||
    e.key == "d" ||
    e.key == "a"
  ) {
    pad.dx = 0;
  }
}

function moveRight() {
  pad.dx = pad.speed;
}

function moveLeft() {
  pad.dx = -1 * pad.speed;
}

function createLayerOfBricks() {
  for (let x = 0; x < 7; x++) {
    bricks.push({
      x: currentBrickX,
      y: currentBrickY,
      h: 20,
      w: 110,
      hit: false,
    });
    currentBrickX += 120;
  }

  currentBrickY += 120;
  currentBrickX = 200;
}

function drawBricks() {
  for (let y = 0; y < layers; y++) {
    createLayerOfBricks();
  }

  hitBricks.forEach((hitBrickIndex) => {
    bricks.splice(hitBrickIndex, 1);
  });

  ctx.fillStyle = "navy";
  bricks.forEach((brick) => {
    ctx.beginPath();
    ctx.fillRect(brick.x, brick.y, brick.w, brick.h);
    ctx.fill();
  });

  currentBrickX = 200;
  currentBrickY = 120;
}

function detectBrickCollision() {
  bricks.forEach((brick, index) => {
    if (
      ball.x + ball.size >= brick.x &&
      ball.x <= brick.x + brick.w &&
      ball.y + ball.size >= brick.y &&
      ball.y <= brick.y + brick.h
    ) {
      //   ball.y += brick.h;s
      ball.dy *= -1;
      hitBricks.push(index);
      impactMusic.play();
      score += 1;
    }
  });
}

function win() {
  document.querySelector("h2").innerText = "You Win! Refresh to start again";
  gameOn = false;
}

function drawRed() {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(pad.x - 50 + pad.w / 2, pad.y);
  ctx.fillRect(pad.x - 50 + pad.w / 2, pad.y, 100, pad.h);
  ctx.fill();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOn) {
    drawCircle();
    moveBall();

    drawPad();
    drawRed();
    movePad();

    drawBricks();
    detectBrickCollision();

    bricks = [];

    document.querySelector("h2").innerText = "Score: " + score;

    if (score == 35) {
      document.querySelector("h2").innerText =
        "You Win! Refresh to start again";

      win();
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

update();

//EXTRA FEATURES

function increaseBallSpeed() {
  if (ball.dx >= 10) {
    ball.dx = 10;
    ball.dy = 10 * (4 / 5);
  }
  ball.dx *= 1.2;
  ball.dy *= 1.2;
}

function decreaseBallSpeed() {
  if (ball.dx <= 3 && ball.dx >= -3) {
    ball.dx = 3;
    ball.dy = 3 * (4 / 5);
  }
  ball.dx /= 1.2;
  ball.dy /= 1.2;
}

function increasePadSpeed() {
  if (pad.speed >= 70) {
    pad.speed = 70;
  }
  pad.speed *= 1.2;
}

function decreasePadSpeed() {
  if (pad.speed <= 0.5) {
    pad.speed = 0.5;
  }
  pad.speed /= 1.2;
}

function decreaseBallSize() {
  if (ball.size <= 3.8) {
    ball.size = 3.8;
  }
  ball.size /= 1.1;
}

function increaseBallSize() {
  if (ball.size >= 100) {
    ball.size = 100;
  }
  ball.size *= 1.1;
}

function decreasePadSize() {
  if (pad.w <= 60) {
    pad.w = 60;
  }
  pad.w /= 1.1;
}

function increasePadSize() {
  if (pad.w >= 300) {
    pad.w = 300;
  }
  pad.w *= 1.1;
}

// document
//   .querySelectorAll("button")[0]
//   .addEventListener("click", increaseBallSpeed);

// document
//   .querySelectorAll("button")[1]
//   .addEventListener("click", decreaseBallSpeed);

// document
//   .querySelectorAll("button")[2]
//   .addEventListener("click", increasePadSpeed);

// document
//   .querySelectorAll("button")[3]
//   .addEventListener("click", decreasePadSpeed);

// document
//   .querySelectorAll("button")[5]
//   .addEventListener("click", increaseBallSize);

// document
//   .querySelectorAll("button")[6]
//   .addEventListener("click", decreaseBallSize);

// document
//   .querySelectorAll("button")[7]
//   .addEventListener("click", increasePadSize);

// document
//   .querySelectorAll("button")[8]
//   .addEventListener("click", decreasePadSize);

// document.querySelectorAll("button")[4].addEventListener("click", function () {
//   if (layers < 12) {
//     layers += 1;
//   }
// });

// document.querySelectorAll("button")[9].addEventListener("click", function () {
//   if (layers > 1) {
//     layers -= 1;
//   }
// });

//TO BE ACCESIBLE ON TOUCHSCREEN ALSO

document.addEventListener("mousemove", function (e) {
  pad.x = e.clientX - (window.innerWidth / 2 - 350);
  e.preventDefault;
});

let BgMusic = new Audio("chase-8-bit-73312.mp3");
BgMusic.loop = true;
BgMusic.play();
