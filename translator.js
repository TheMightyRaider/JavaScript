const bornMonth = document.querySelector(`[name='month']`);
const button = document.querySelector("button");
const zodiacSign = document.querySelector(".zodiac");

// Month:Zodiac Object
// find the zodaic month using the above object.

const zodiac = {
  03: "Aries",
  04: "Taurus",
  05: "Gemini",
  06: "Cancer",
  07: "Leo",
  08: "Virgo",
  09: "Libra",
  10: "Scorpio",
  11: "Sagittarius",
  12: "Capricorn",
  01: "Aquarius",
  02: "Pisces"
};

function printText(value) {
  date = value.split("");
  month = date.slice(6, 7).join("");
  day = date.slice(8);
  newdate = [...day, "-", ...month];
  sign = zodiac[month];
  zodiacSign.textContent = sign;
}

bornMonth.addEventListener("input", function(event) {
  value = event.currentTarget.value;
  button.addEventListener("click", _ => {
    printText(value);
  });
});
