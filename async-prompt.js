// Make a popup using Promises
// Insert the details of the popup
// Add event listener to capture the value of the input
// Store the input in an array

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function deletePopUp(popup) {
  popup.classList.remove("open");
  await wait(500);
  popup.remove();
  popup = null;
}

function ask(options) {
  return new Promise(async function(resolve) {
    const popup = document.createElement("form");
    popup.classList.add("popup");
    popup.insertAdjacentHTML(
      "afterbegin",
      `<fieldset>
      <label>${options.title}</label>
      <input type='text' name='userInput'>
      <button type='submit'>Submit</button>
    </fieldset>`
    );
    document.body.appendChild(popup);
    await wait(50);
    popup.classList.add("open");

    function captureData(event) {
      console.log("Submitted");
      event.preventDefault();
      deletePopUp(popup);
      resolve(event.target.userInput.value);
    }

    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.innerText = "Cancel";
    popup.firstElementChild.appendChild(cancel);
    cancel.addEventListener("click", function() {
      resolve(null);
      deletePopUp(popup);
    });

    popup.addEventListener("submit", captureData, { once: true });
  });
}

question = [`What's your name`, `What's the day?`, "Are you the best?"];

async function askQuestion() {
  const result = [];
  for (const item of question) {
    result.push(await ask({ title: item }));
  }
  return result;
}

async function storeanswer() {
  const value = await askQuestion();
  console.log(value);
}

storeanswer();
