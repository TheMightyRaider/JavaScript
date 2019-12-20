const div = document.createElement("div");
div.classList.add("wrapper");
document.body.append(div);

//making a unorderedlist

const ul = document.createElement("ul");
const item1 = document.createElement("li");

item1.innerText = "one";
ul.appendChild(item1);

const item2 = item1.cloneNode();
item2.innerText = "two";

ul.appendChild(item2);

const item3 = item1.cloneNode();
item3.innerText = "three";
ul.appendChild(item3);

// Adding this list inside the div

div.appendChild(ul);

// Creating  a Image

const img = document.createElement("img");
img.src = "https://picsum.photos/200";
img.width = 250;
img.classList.add("cute");
img.alt = "Cute Puppy";

div.appendChild(img);

// Making a HTML String

const div2 = document.createElement("div");
div2.innerHTML = `<p> This is String </p>
 <p>Created using innerHTML attribute
 `;

document.body.insertAdjacentElement("afterbegin", div2);

div2.children[1].classList.add("warning");
div2.firstElementChild.remove();

const generatePlayerCard = (name, age, height) => {
  let content = `
    <div class='playerCard'>
        <h2> ${name}-${age} </h2>
        <p> They are ${height}cm and ${age} years old. In Dog years this person would be ${age *
    2}. That would be a tall dog! </p>
        <button class='button'>Remove</button>
    </div>
    
    `;
  return content;
};

const cardset = document.createElement("div");
cardset.classList.add("cards");

let newCards = generatePlayerCard("Anirudh", 21, 170);
newCards += generatePlayerCard("Sanjay", 7, 182);
newCards += generatePlayerCard("Nargis", 5, 170);
newCards += generatePlayerCard("Sriram", 6, 180);
cardset.innerHTML += newCards;

document.body.insertAdjacentElement("beforebegin", cardset);

// CANNOT PERFORM addEventListener FOR multiple elements

// button.addEventListener("click", function() {
//   console.log(button);
// });

// Adding addEventListener for multiple elements
const button = document.querySelectorAll(".button");
button.forEach(item => {
  item.addEventListener("click", function() {
    item.parentElement.remove();
  });
});

const listitems = `
<ul>
    <li>Top</li>
    <li>Always</li>
</ul>
`;

div.insertAdjacentHTML("afterend", listitems);
document.body.insertAdjacentElement("beforeend", div);

const keyupbox = document.createElement("div");
const inputWord = `<input type= 'text' name='keyUpEvent'>`;
keyupbox.innerHTML = inputWord;
document.body.appendChild(keyupbox);
const input = document.querySelector("input");
input.addEventListener("keyup", () => {
  console.log("Pressing through input");
});

keyupbox.addEventListener("keyup", () => {
  console.log("Presssing KeyUp");
});
