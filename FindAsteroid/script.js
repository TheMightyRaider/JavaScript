const form = document.querySelector("form");
const submit = document.querySelector("button");
const asteroids = document.querySelector(".asteroids");
const baseEndpoint = " https://api.nasa.gov/neo/rest/v1/feed?";
const apikey = "bJOoBSpxEzxxkdaVE8QsMM4cBNpaIVUCbmN5ae9z";
let asteroidEndpoint;
let startDate, endDate;
let asteroidDetails = [];
let nextMeetingDate = [];
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// function interval(data, ms) {
//   return new Promise(resolve =>
//     setInterval(function() {
//       resolve(data);
//     }, ms)
//   );
// }

function handleErr(err) {
  console.log(`There has been some err`);
  console.error(err);
}

async function displayDetails(data) {
  const html = data.map(item => {
    return `<div class='asteroid'>
    <h2>Asteroid ${item.name} </h2>
    <p><b>Size:</b> ${item.size} Meters</p>
    <p><b>Time closest to Earth: </b>${item.time} </p>
    <p><b>Speed</b>: ${item.speed} Km/Sec</p>
    <p><b>Distance From Earth [in A.U] :</b>${item.distanceInAu}</p>
    <p><b>Next Seen:</b> ${item.next}</p>
    <p><b>Previously Seen:</b> ${item.previousMeeting}</p>
    <p>${item.hazard ? "<b>There is possiblity of danger due to this asteroid</b>" : "This won't be a problem"} </p>
    </div>`;
  });
  asteroids.innerHTML = html.join("");
  asteroids.querySelectorAll(".asteroid").forEach(item => item.classList.add("transition"));
  asteroidDetails = [];
}

async function findNextMeeting(data) {
  data.forEach(async item => {
    const https = item.link.slice(0, 4) + "s" + item.link.slice(4);
    const asteroidMeetingPromise = await fetch(https);
    const asteroidMeetingJson = await asteroidMeetingPromise.json();
    const datesArray = asteroidMeetingJson.close_approach_data;
    const currentindex = datesArray.findIndex(item => item.close_approach_date == startDate);
    if (datesArray.length > 1 && currentindex != datesArray.length - 1 && currentindex != 0) {
      const meetingDateindex = datesArray[currentindex + 1].close_approach_date;
      item["next"] = meetingDateindex;
      item["previousMeeting"] = datesArray[currentindex - 1].close_approach_date;
    } else {
      item["next"] = "This is the last time to see this";
      item["previousMeeting"] = `This has been found at ${startDate.split("-")[0]}`;
    }
  });
}

function removeAsteroid() {
  const asteroid = document.querySelectorAll(".asteroid");
  asteroid.forEach(item => item.remove());
  console.log("Erased");
}

async function findAsteroid(date) {
  //Define the query params
  startDate = endDate = date;

  asteroidDetails ? removeAsteroid() : null;
  console.log("Fetching");
  document.body.classList.add("load");

  // const blink = setInterval(function() {
  //   loading.classList.value.includes("border") ? loading.classList.remove("border") : loading.classList.add("border");
  // }, 150);

  /* PARAMS/QUERY FORMAT 
     ?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY */
  asteroidEndpoint = `${baseEndpoint}start_date=${startDate}&end_date=${endDate}&api_key=${apikey}`;
  const nasaData = await fetch(asteroidEndpoint);
  const jsonData = await nasaData.json();
  console.log("Fetched");

  document.body.classList.remove("bckimage");
  // Fetch AsteroidName, Size , Time it is closest to Earth wrt au, Speed per sec , Distance from Earth in Km;

  const nearByObjects = jsonData.near_earth_objects[startDate];
  nearByObjects.forEach(items => {
    asteroidDetails.push({
      link: items.links.self,
      name: items.name,
      size: items.estimated_diameter.meters.estimated_diameter_max.toFixed(2),
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
    return a.distanceInAu - b.distanceInAu; // Try sorting it by Time!
  });

  findNextMeeting(asteroidDetails);
  await wait(5000);
  document.body.classList.remove("load");
  // clearInterval(blink);
  displayDetails(asteroidDetails);

  /*TODO:
       1. Provide a more details link for each asteroid.
       2. Add Loading Screen
       3. Add CSS
  */
}

function handleClick(event) {
  event.preventDefault();
  const date = form.inputDate.value;
  findAsteroid(date).catch(handleErr);
}

function handlePress(event) {
  if (event.key == "Enter") {
    handleClick(); // How to pass the submit event as a arugument
  }
}

// Listen for submit in the form
form.addEventListener("submit", handleClick);
// window.addEventListener("keypress", handlePress);
