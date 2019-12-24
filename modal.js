const modal = document.querySelector(".modal-outer");
const innermodal = document.querySelector(".content");
const click = document.querySelectorAll(".details");
const close = document.querySelector(".exit");

function handleFunction(event) {
  const elementValue = event.currentTarget.dataset.details;
  innermodal.innerHTML = `<h2> This is the ${elementValue}`;
  modal.classList.add("open");
}

function closeFunction() {
  modal.classList.remove("open");
}

click.forEach(item => item.addEventListener("click", handleFunction));
close.addEventListener("click", closeFunction);
modal.addEventListener("click", closeFunction);
