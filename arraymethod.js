const feedback = [
  { comment: "Love the burgs", rating: 4 },
  { comment: "Horrible Service", rating: 2 },
  { comment: "Smoothies are great, liked the burger too", rating: 5 },
  { comment: "Ambiance needs work", rating: 3 },
  { comment: "I DONT LIKE BURGERS", rating: 1 }
];

const toppings = [
  "Mushrooms ",
  "Tomatoes",
  "Eggs",
  "Chili",
  "Lettuce",
  "Avocado",
  "Chiles",
  "Bacon",
  "Pickles",
  "Onions",
  "Cheese"
];

const meats = {
  beyond: 10,
  beef: 5,
  pork: 7
};

const people = [
  {
    birthday: "April 22, 1993",
    names: {
      first: "Keith",
      last: "Buckley"
    }
  },
  {
    birthday: "January 3, 1975",
    names: {
      first: "Larry",
      last: "Heep"
    }
  },
  {
    birthday: "February 12, 1944",
    names: {
      first: "Linda",
      last: "Bermeer"
    }
  }
];

function findbyword(word, feedback) {
  return feedback.comment.includes(word) || feedback.comment.includes(word.toUpperCase());
}

let burger = feedback.find(item => findbyword("burg", item));
console.log(burger);

// find all ratings that are above 2 with filter()
const rating = rating => {
  return function(feedback) {
    if (feedback.rating > 2) {
      return true;
    }
  };
};
console.log(feedback.filter(rating(2)));

// find all ratings that talk about a burger with filter()

console.log(feedback.filter(item => findbyword("burg", item)));

// Remove the one star rating however you like!

console.table(feedback.filter(item => item.rating != 1));

// check if there is at least 5 of one type of meat with some()

console.log(Object.values(meats).some(item => item >= 5));

// make sure we have at least 3 of every meat with every()

console.log(Object.values(meats).every(item => item > 3));

// sort the toppings alphabetically with sort()

console.log(toppings.sort());

// sort the order totals from most expensive to least with .sort()

const orderTotals = [342, 1002, 523, 34, 634, 854, 1644, 2222];

console.log(
  orderTotals.sort((a, b) => {
    return b - a;
  })
);

// Sort the prices with sort()

const prices = {
  hotDog: 453,
  burger: 765,
  sausage: 634,
  corn: 234
};

function sortPrice(a, b) {
  return a - b;
}

let sort = Object.entries(prices).sort((a, b) => {
  return a[1] - b[1];
});

let arr = Object.entries(prices);
console.log(
  arr.sort((a, b) => {
    return a[1] - b[1];
  })
);
const day = people.map(people => {
  const dateBorn = new Date(people.birthday).getTime(); // time born
  const now = Date.now();
  let day = Math.floor((now - dateBorn) / 31536000000);
  return day;
});

function print(item) {
  people.forEach(people => console.log(people[item]));
  console.log(item);
}

const inventory = [
  { type: "shirt", price: 4000 },
  { type: "pants", price: 4532 },
  { type: "socks", price: 234 },
  { type: "shirt", price: 2343 },
  { type: "pants", price: 2343 },
  { type: "socks", price: 542 },
  { type: "pants", price: 123 }
];

function inventoryReduce(reducer, item) {
  reducer[item.type] ? (reducer[item.type] = reducer[item.type] + 1) : (reducer[item.type] = 1);
  return reducer;
}

function eachTypeTotal(total, item) {
  total[item.type] ? (total[item.type] = total[item.type] + item.price) : (total[item.type] = item.price);
  return total;
}

function totalPrice(price, item) {
  price ? (price = price + item.price) : (price = item.price);
  return price;
}

const inventoryCollection = inventory.reduce(inventoryReduce, {});
const eachTypePrice = inventory.reduce(eachTypeTotal, {});
const price = inventory.reduce(totalPrice, 0);
console.log(price);
