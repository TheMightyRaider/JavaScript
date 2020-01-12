const newItem = document.querySelector(".newItem");
const list = document.querySelector(".items");
const shoppingForm = document.querySelector(`[name='shoppingDetails']`);

const items = []; // state of the user

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
      return `<li>${data.name}</li>`;
    })
    .join("");
  list.innerHTML = html;
}

function storeDatainLocalStorage() {
  console.log(JSON.parse(localStorage.getItem("items")));
  localStorage.setItem("items", JSON.stringify(items));
  console.log("Stored in Local Storage");
}

function userState() {
  let state = JSON.parse(localStorage.getItem("items"));
  if (state) {
    state.forEach(item => items.push(item));
    console.log("Triggering!");
    list.dispatchEvent(new CustomEvent("itemUpdated"));
  }
}

shoppingForm.addEventListener("submit", handleEvent);
list.addEventListener("itemUpdated", displayItem);
list.addEventListener("itemUpdated", storeDatainLocalStorage);
// list.addEventListener("itemUpdated", userState);
userState();
