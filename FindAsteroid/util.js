import { asteroids } from "./element.js";
import { asteroidDetails } from "./lib.js";

export async function displayDetails(data) {
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
  //   asteroids.querySelectorAll(".asteroid").forEach(item => item.classList.add("transition"));
  asteroidDetails.length = 0;
}

export function removeAsteroid() {
  const asteroid = document.querySelectorAll(".asteroid");
  asteroid.forEach(item => item.remove());
  console.log("Erased");
}

export function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
