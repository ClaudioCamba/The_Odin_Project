// ====================================================================
// USEFUL SNIPPETS
// ====================================================================

// ----------------------------------
// Get viewport width and height
var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight || docElem.clientHeight || body.clientHeight;
alert(x + ' × ' + y);

// ====================================================================
// EVENTLISTENER
// ====================================================================

// ----------------------------------
// Window resize eventlistner
window.addEventListener('resize', function (event) {
    console.log(event);
}, true);

// ====================================================================
// ARRAY
// ====================================================================

const people = [
    { name: "Wes", year: 1988 },
    { name: "Kait", year: 1986 },
    { name: "Irv", year: 1970 },
    { name: "Lux", year: 2015 },
];

const comments = [
    { text: "Love this!", id: 523423 },
    { text: "Super good", id: 823423 },
    { text: "You are the best", id: 2039842 },
    { text: "Ramen is my fav food ever", id: 123523 },
    { text: "Nice Nice Nice!", id: 542328 },
];

// Some and Every Checks
// Array.prototype.some() // is at least one person 19 or older?
const somePeople = people.some(
    (person) => new Date().getFullYear() - person.year >= 19
);
console.log({ somePeople });

// Array.prototype.every() // is everyone 19 or older?
const allPeople = people.every(
    (person) => new Date().getFullYear() - person.year >= 19
);
console.log({ allPeople });

// Array.prototype.find()
// Find is like filter, but instead returns just the one you are looking for
// find the comment with the ID of 823423
const comment = comments.find((comment) => comment.id === 823423);
console.log({ comment });

// Array.prototype.findIndex()
// Find the comment with this ID
// delete the comment with the ID of 823423
let index = comments.findIndex((comment) => comment.id === 823423);
comments.splice(index, 1);
console.table({ comments });

// ====================================================================
// OBJECTS
// ====================================================================

// ----------------------------------
// Computed Properties
let fruit = 'apple';
let bag = {
    [fruit + 'Computers']: 5 // bag.appleComputers = 5
};

// ----------------------------------
// "in" operator
let user = { name: "John", age: 30 };
alert("age" in user); // true, user.age exists
alert("blabla" in user); // false, user.blabla doesn't exist


delete Object.key // delete object key 

// ====================================================================
// STRING
// ====================================================================

str.replace(/[^a-zA-Z]/g, '') // Regex to remove any characters that aren't a-z/A-Z