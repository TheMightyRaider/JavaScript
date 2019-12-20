const canvas = document.querySelector("canvas");
const button = document.querySelector("button");
const ctx = canvas.getContext("2d");
(ctx.lineJoin = "round"), (ctx.lineCap = "round"), (ctx.lineWidth = 7);
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
const MOVE_AMOUNT = 10; // if a variable shouldn't change forever, use all caps and underscore

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;
ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function draw({ key }) {
  console.log(x);

  hue = hue + 10;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case "ArrowUp":
      y = y - MOVE_AMOUNT;
      break;
    case "ArrowDown":
      y = y + MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      x = x - MOVE_AMOUNT;
      break;
    case "ArrowRight":
      x = x + MOVE_AMOUNT;
      break;
  }
  if (x <= width && y <= width && x >= 0 && y >= 0) {
    console.log(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  } else if (x > width) {
    x = width;
  } else if (y > height) {
    y = height;
  } else if (x < 0) {
    x = 0;
  } else if (y < 0) {
    y = 0;
  }
}

function handlevent(event) {
  if (event.key.includes("Arrow")) {
    event.preventDefault();
    draw({ key: event.key });
  }
}

function clearcanvas() {
  ctx.clearRect(0, 0, width, height);
}

window.addEventListener("keydown", handlevent);
button.addEventListener("click", clearcanvas);
