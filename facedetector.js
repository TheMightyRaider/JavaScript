const webcam = document.querySelector("video");
const faceDetector = new window.FaceDetector();

async function playVideo() {
  let stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 720, height: 540 }
  });
  webcam.srcObject = stream;
  await webcam.play();
}

async function faceDetect() {
  console.log("Working!");
  const faces = await faceDetector.detect(webcam);
  faces.forEach(item => console.log(item));
  requestAnimationFrame(faceDetect);
}

playVideo().then(faceDetect);
