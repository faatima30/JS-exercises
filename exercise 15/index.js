const people = [
  { name: "Fatima", age: 22, city: "Mogadisho" },
  { name: "Ifrah", age: 23, city: "Hargeysa" }
];

for (let i in people) {
  console.log("name: " + people[i].name);
  console.log("age: " + people[i].age);
  console.log("city: " + people[i].city);
  console.log("---");
}
