// Check filled input once user clicks out
// Use regex to double check email format
// check country name against a reference list

// https://en.wikipedia.org/wiki/List_of_counties_of_the_United_Kingdom
const all = document.querySelectorAll(".wikitable.sortable tbody tr > td:first-child");
let county = [];
for (const link of all) {
  //   if (link.innerText[0] === " ") {
  //     console.log(link);
  //     county.push(link.textContent.slice(1));
  //   } else {
  //     county.push(link.textContent);
  //   }
  console.log(link.textContent);
}
console.log(county);
