const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

let score = 0;

let isMouseDown = false;

const ball = {
  x: 200,
  y: 200,
  size: 40,
  dx: 5,
  dy: 4,
};

const pad = {
  h: 20,
  w: 100,
  x: 200,
  speed: 6,
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
  }
  if (
    ball.x + ball.size >= pad.x &&
    ball.x <= pad.x + pad.w &&
    ball.y + ball.size >= pad.y &&
    ball.y <= pad.y + pad.h
  ) {
    // ball.dx *= -1;
    ball.dy *= -1;
    score += 1;
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

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCircle();
  moveBall();

  drawPad();
  movePad();

  document.querySelector("h2").innerText = "Score: " + score;

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
  if (ball.dx <= 3) {
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

document
  .querySelectorAll("button")[0]
  .addEventListener("click", increaseBallSpeed);

document
  .querySelectorAll("button")[1]
  .addEventListener("click", decreaseBallSpeed);

document
  .querySelectorAll("button")[2]
  .addEventListener("click", increasePadSpeed);

document
  .querySelectorAll("button")[3]
  .addEventListener("click", decreasePadSpeed);

document
  .querySelectorAll("button")[4]
  .addEventListener("click", increaseBallSize);

document
  .querySelectorAll("button")[5]
  .addEventListener("click", decreaseBallSize);

document
  .querySelectorAll("button")[6]
  .addEventListener("click", increasePadSize);

document
  .querySelectorAll("button")[7]
  .addEventListener("click", decreasePadSize);

canvas.addEventListener("mousedown", function (e) {
  console.log(["d", e]);
  isMouseDown = true;
  e.preventDefault;
});

canvas.addEventListener("mouseup", function (e) {
  console.log(["u", e]);
  isMouseDown = false;
  e.preventDefault;
});

canvas.addEventListener("mousemove", function (e) {
  console.log(["m", e]);
  if (isMouseDown) {
    console.log(["M", e]);
    pad.x = e.clientX - (window.innerWidth / 2 - 350);
  }
  //   e.preventDefault;
});
