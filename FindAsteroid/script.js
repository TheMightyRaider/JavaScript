import { form } from "./element.js";
import { handleClick } from "./handler.js";

// Listen for submit in the form
form.addEventListener("submit", handleClick);
// window.addEventListener("keypress", handlePress);
