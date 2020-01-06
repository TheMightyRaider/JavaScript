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

async function faceDetect() {
  console.log("Working!");
  const faces = await faceDetector.detect(webcam);
  faces.forEach(drawFace);
  requestAnimationFrame(faceDetect);
}

function drawFace(faces) {
  const { x, y, width, height } = faces.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "blue";
  ctx.strokeRect(x, y, width, height);
}

playVideo().then(faceDetect);
