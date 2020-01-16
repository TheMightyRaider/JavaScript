const heading = document.querySelector("h2");
const modal = document.querySelector(".modal");
const gallery = document.querySelector(".gallery");
const poster = gallery.querySelectorAll("img");
const main = modal.querySelector(".main");
const prev = modal.querySelector(".prev");
const next = modal.querySelector(".next");
let currentImage;
let rating = ["9.2", "9.3", "9.4", "9.5", "9.6", "9.7", "9.8", "9.5", "9.7", "9.4"];

function savetoLocalStorage() {
  localStorage.setItem("rating", JSON.stringify(rating));
}

savetoLocalStorage();

function showImage(element) {
  const rate = JSON.parse(localStorage.getItem("rating"));
  const id = element.id;
  const elementRating = rate[id - 1];
  const location = element.src;
  currentImage = element;
  main.querySelector("img").src = location;
  main.querySelector("b").textContent = elementRating;
  modal.classList.add("open");
  window.addEventListener("keyup", handleKey);
  prev.addEventListener("click", showPrevImage);
  next.addEventListener("click", showNextImage);
}

function closeModal() {
  modal.classList.remove("open");
  gallery.classList.remove("fade");
  window.removeEventListener("keyup", handleKey);
}

function handleEvent(element) {
  if (element) {
    gallery.classList.add("fade");
    showImage(element);
  }
}

function handleKey(event) {
  if (event.key === "Escape") return closeModal();
  if (event.key === "ArrowRight") return showNextImage(event);
  if (event.key === "ArrowLeft") return showPrevImage(event);
}

function showNextImage() {
  console.log(currentImage.nextElementSibling);
  showImage(currentImage.nextElementSibling || gallery.firstElementChild);
}

function showPrevImage() {
  showImage(currentImage.previousElementSibling || gallery.lastElementChild);
}

function closeModalFromOutside(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

poster.forEach(image => {
  image.addEventListener("click", event => {
    handleEvent(event.currentTarget);
  });
  image.addEventListener("keyup", event => {
    if (event.key == "Enter") {
      handleEvent(event.currentTarget);
    }
  });
});

modal.addEventListener("click", closeModalFromOutside);
