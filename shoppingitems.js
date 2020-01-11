const newItem = document.querySelector(".newItem");
const list = document.querySelector(".items");
const shoppingForm = document.querySelector(`[name='shoppingDetails']`);

const items = []; // state of the user

function handleEvent(event) {
  event.preventDefault();
  const name = event.currentTarget.newItem.value;
  const itemDetails = {
    name,
    time: new Date()
  };
  items.push(itemDetails);
  //   displayItem(itemDetails);
  list.dispatchEvent(new CustomEvent("itemUpdated"));
  event.target.reset();
}

function displayItem() {
  const html = items
    .map(data => {
      return `<li>${data.name}</li>`;
    })
    .join("");
  list.innerHTML = html;
}

shoppingForm.addEventListener("submit", handleEvent);
list.addEventListener("itemUpdated", displayItem);
console.dir(list);
