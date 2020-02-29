import { displayDetails, removeAsteroid, wait } from "./util.js";
import { baseEndpoint, apikey } from "./element.js";

let asteroidEndpoint;
let startDate, endDate;
let asteroidDetails = [];

export async function findAsteroid(date) {
  //Define the query params
  startDate = endDate = date;

  asteroidDetails ? removeAsteroid() : null;

  console.log("Fetching");
  document.body.classList.add("load");

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
  console.log(asteroidDetails);
  findNextMeeting(asteroidDetails);
  await wait(5000);
  document.body.classList.remove("load");
  // clearInterval(blink);
  displayDetails(asteroidDetails);
}

export async function findNextMeeting(data) {
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

export { asteroidDetails };
