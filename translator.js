const bornMonth = document.querySelector(`[name='month']`);
const button = document.querySelector("button");
const zodiacSign = document.querySelector(".zodiac");
const luckyNumber = document.querySelector(".luckyNumber");

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

const helpers = {
  printText({ month, day }) {
    newdate = [...day, "-", ...month];
    sign = zodiac[month];
    zodiacSign.textContent = sign;
  },

  generateLuckyNumber({ month }) {
    luckyNumber.textContent = Math.floor(Math.random() * month);
  }
};

bornMonth.addEventListener("input", function(event) {
  value = event.currentTarget.value;
  date = value.split("");
  const dates = {
    month: date.slice(6, 7).join(""),
    day: date.slice(8)
  };
  button.addEventListener("click", _ => {
    helpers.printText(dates);
    helpers.generateLuckyNumber(dates);
  });
});
