let comments = [
  { name: "sanjay", id: 1 },
  { name: "sanj", id: 2 },
  { name: "sany", id: 3 }
];

// function Index(id) {
//   let index = comments.findIndex(items => items.id == id);
//   return [...comments.splice(0, index), ...comments.splice(index + 1)];
// }
const obj = {
  name: "Sanjay",
  age: 20
};

Object.entries(obj).forEach(([header, val]) => {
  console.log(header, val);
});
