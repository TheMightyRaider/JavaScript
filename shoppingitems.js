const newItem = document.querySelector(".newItem");
const list = document.querySelector(".items");
const shoppingForm = document.querySelector(`[name='shoppingDetails']`);

let items = []; // state of the user
function handleEvent(event) {
  event.preventDefault();
  const name = event.currentTarget.newItem.value;
  const itemDetails = {
    name,
    id: new Date().getTime()
  };
  items.push(itemDetails);
  list.dispatchEvent(new CustomEvent("itemUpdated"));
  event.target.reset();
}

function displayItem() {
  const html = items
    .map(data => {
      return `<li>${data.name} <button type='button' id=${data.id}>Delete</button></li> `;
    })
    .join("");
  list.innerHTML = html;
}

function storeDatainLocalStorage() {
  localStorage.setItem("items", JSON.stringify(items)); // Its creates a new key:value pair, everytime its called.
  console.log("Stored in Local Storage");
}

function restoreUserState() {
  let state = JSON.parse(localStorage.getItem("items"));
  if (state) {
    state.forEach(item => items.push(item));
    shoppingForm.dispatchEvent(new CustomEvent("restoredItems"));
  }
}

function deleteItem(event) {
  const newitems = items.filter(item => item.id != event.target.id);
  items = newitems;
  console.log(items);
  list.dispatchEvent(new CustomEvent("itemUpdated"));
}

shoppingForm.addEventListener("submit", handleEvent);
shoppingForm.addEventListener("restoredItems", displayItem);
list.addEventListener("itemUpdated", displayItem);
list.addEventListener("itemUpdated", storeDatainLocalStorage);
list.addEventListener("click", deleteItem);
restoreUserState();
