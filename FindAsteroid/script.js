const form = document.querySelector("form");
const submit = document.querySelector("button");
const asteroids = document.querySelector(".asteroids");
const baseEndpoint = " https://api.nasa.gov/neo/rest/v1/feed?";
const apikey = "bJOoBSpxEzxxkdaVE8QsMM4cBNpaIVUCbmN5ae9z";
let asteroidEndpoint;
let startDate, endDate;
let asteroidDetails = [];

function handleErr(err) {
  console.log(`There has been some err`);
  console.error(err);
}

function displayDetails(data) {
  const html = data.map(item => {
    return `<div class='asteroid'>
    <h2>Asteroid ${item.name} </h2>
    <p>Size: ${item.size} KM</p>
    <p>Time closest to Earth: ${item.time} </p>
    <p>Speed: ${item.speed} Km/Sec</p>
    <p>Distance From Earth [in A.U] :${item.distanceInAu}</p>
    <p>${item.hazard ? "<b>There is possiblity of danger due to this asteroid</b>" : "Won't be a problem"} </p>
    </div>`;
  });
  asteroids.innerHTML = html.join("");
  asteroidDetails = [];
}

async function findAsteroid(date) {
  //Define the query params
  startDate = endDate = date;

  console.log("Fetching");

  /* PARAMS/QUERY FORMAT 
     ?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY */

  asteroidEndpoint = `${baseEndpoint}start_date=${startDate}&end_date=${endDate}&api_key=${apikey}`;
  const nasaData = await fetch(asteroidEndpoint);
  const jsonData = await nasaData.json();

  console.log("Fetched");
  //Fetch AsteroidName, Size , Time it is closest to Earth wrt au, Speed per sec , Distance from Earth in Km;
  const nearByObjects = jsonData.near_earth_objects[startDate];
  nearByObjects.forEach(items => {
    asteroidDetails.push({
      name: items.name,
      size: items.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2),
      time: new Date(items.close_approach_data[0].epoch_date_close_approach).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      distanceInAu: new Number(items.close_approach_data[0].miss_distance.astronomical).toFixed(2),
      speed: new Number(items.close_approach_data[0].relative_velocity.kilometers_per_second).toFixed(2),
      hazard: items.is_potentially_hazardous_asteroid
    });
  });

  asteroidDetails.sort((a, b) => {
    return a.distanceInAu - b.distanceInAu;
  });

  displayDetails(asteroidDetails);

  /*TODO:
       1. Find the Founded date, and next closest meeting.
       2. Provide a more details link for each asteroid.
  */
}

function handleClick(event) {
  event.preventDefault();
  const date = form.inputDate.value;
  findAsteroid(date).catch(handleErr);
}

function handlePress(event) {
  console.log("Pressed");
  if (event == "Enter") {
    handleClick();
  }
}

// Listen for submit in the form
form.addEventListener("submit", handleClick);
form.addEventListener("keypress", handlePress);
