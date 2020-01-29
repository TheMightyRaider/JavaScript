const form = document.querySelector("form");
const baseEndpoint = " https://api.nasa.gov/neo/rest/v1/feed?";
let asteroidEndpoint;
let startDate, endDate;

async function findAsteroid(date) {
  //Define the query params
  startDate = endDate = date;
  //?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY
  asteroidEndpoint = `${baseEndpoint}start_date=${startDate}&end_date=${endDate}&api_key=API_KEY`;
  const nasaData = await fetch(asteroidEndpoint);
  const jsonData = await nasaData.json();
  console.log(jsonData);
}

function handleclick(event) {
  event.preventDefault();
  const date = event.target.inputDate.value;
  findAsteroid(date);
}

// Listen for submit click
form.addEventListener("submit", handleclick);
