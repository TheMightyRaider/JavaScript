import { form } from "./element.js";
import { findAsteroid } from "./lib.js";

export function handleErr(err) {
  console.log(`There has been some err`);
  console.error(err);
}

export function handleClick(event) {
  event.preventDefault();
  const date = form.inputDate.value;
  findAsteroid(date).catch(handleErr);
}

export function handlePress(event) {
  if (event.key == "Enter") {
    handleClick(); // How to pass the submit event as a arugument
  }
}
