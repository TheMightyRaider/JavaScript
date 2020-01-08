const webcam = document.querySelector("video");
const faceDetector = new window.FaceDetector();
const canvas = document.querySelector(".videoHolder");
const ctx = canvas.getContext("2d");
console.log(ctx);

async function playVideo() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 720, height: 540 }
  });
  webcam.srcObject = stream;
  console.dir(webcam);
  await webcam.play();
  canvas.width = webcam.videoWidth;
  canvas.height = webcam.videoHeight;
}

function drawFace(faces) {
  const { x, y, width, height } = faces.boundingBox;
  ctx.strokeStyle = "blue";
  ctx.imageSmoothingEnabled = false;
  ctx.strokeRect(x, y, width, height);
  ctx.drawImage(webcam, x, y, width, height, x, y, 10, 10);
  ctx.drawImage(canvas, x, y, 10, 10, x, y, width, height);
}

async function faceDetect() {
  console.log("Working!");
  const faces = await faceDetector.detect(webcam);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  faces.forEach(drawFace);
  requestAnimationFrame(faceDetect);
}

playVideo().then(faceDetect);
