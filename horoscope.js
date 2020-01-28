const userInput = document.querySelector(`input[name='sign']`);
const button = document.querySelector("button");
const result = document.querySelector(".results");
const proxy = `https://cors-anywhere.herokuapp.com/`;
const baseEndpoint = "http://horoscope-api.herokuapp.com/";
const horoscopeEndpoint = "horoscope/today/";

function handleErr(err) {
  console.log("There has been a error!");
}

const handleClick = function() {
  const sign = userInput.value;
  findHoroscope(sign).catch(handleErr);
};

const display = data => {
  const html = `<div>
    <h3>This is want it has to say</h3>
    <p>${data.horoscope}<p>
    </div>`;
  result.innerHTML = html;
};

async function findHoroscope(sign) {
  result.innerHTML = "Hold On!";
  const horoscopePromise = await fetch(`${proxy}${baseEndpoint}${horoscopeEndpoint}${sign}`);
  const data = await horoscopePromise.json();
  display(data);
}

button.addEventListener("click", handleClick);
