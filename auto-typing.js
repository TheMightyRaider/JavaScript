function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function addCursor(typedTill) {
  cursor = document.createElement("span");
  cursor.textContent = "|";
  cursor.classList.add("cursor-color");
  window.type = typedTill;
  await wait(100);
  typedTill.insertAdjacentElement("beforeend", cursor);
  await wait(150);
  cursor.classList.add("close");
}

async function type(item) {
  const text = item.textContent;
  let typedTill = "";
  const { min, max } = item.dataset;
  const waitingTime = generateNumber(200, 300);
  for (const letter of text) {
    typedTill += letter;
    await wait(waitingTime);
    item.textContent = typedTill;
    await addCursor(item);
  }
}

document.querySelectorAll("[data-type]").forEach(type);
