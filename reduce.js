const text = document.querySelector("body").innerText;

const contentArray = Array.from(text);
console.log(contentArray);

function findalphabet(item) {
  if (item.match(/[a-zA-Z0-9]/)) {
    return true;
  }
}

let tolowerCase = item => {
  return item.toLowerCase();
};

function countAlphabet(count, item) {
  count[item] = count[item] + 1 || 1;
  return count;
}

let sorting = function(a, b) {
  return a[1] - b[1]; // Lower to Higher
  // -ve, NO SWAP
  // +ve, SWAP
};

function generateObject(object, item) {
  console.log(item[0], item[1]);
  object[item[0]] = item[1];
  return object;
}

// let objectSort = function(a, b) {
//   return a.
// };

let countIndividualAlphabet = contentArray
  .filter(findalphabet)
  .map(tolowerCase)
  .reduce(countAlphabet, {});

const sortedResult = Object.entries(countIndividualAlphabet).sort(sorting);

console.log(sortedResult);
