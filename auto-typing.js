function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function addCursor(typedTill) {
  return new Promise(resolve => {
    const cursor = "|";
    console.log((typedTill += cursor));
  });
}

async function type(item) {
  const text = item.textContent;
  let typedTill = "";
  for (const letter of text) {
    typedTill += letter;
    const { min, max } = item.dataset;
    const waitingTime = generateNumber(min, max);
    await wait(waitingTime);
    item.textContent = typedTill;
    addCursor(item.textContent);
  }
}

document.querySelectorAll("[data-type").forEach(type);
