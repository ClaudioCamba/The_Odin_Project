const img = document.querySelector("img");
const button = document.querySelector("button");
const input = document.querySelector("input");

// Making fetch call to giphy url
const fetchGif = async (s) => {
  const response = await fetch("https://api.giphy.com/v1/gifs/translate?api_key=KEY_HERE&s=" + s, { mode: "cors" });
  response.json().then((response) => {
    img.src = response.data.images.original.url;
  });

  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (response) {
  //   img.src = response.data.images.original.url;
  //   console.log(response);
  // })
  // .catch(function (err) {
  //   alert(err);
  //   input.classList.add("error");
  // });
};

// Button click event to make call
button.addEventListener("click", () => {
  if (input.validity.valid) {
    fetchGif(input.value);
    input.classList.remove("error");
  } else {
    input.classList.add("error");
  }
});

function doubleAfter2Seconds(x) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 100);
  });
}

// function addPromise(x) {
//   return new Promise(resolve => {
//     doubleAfter2Seconds(10).then((a) => {
//       doubleAfter2Seconds(20).then((b) => {
//         doubleAfter2Seconds(30).then((c) => {
//           resolve(x + a + b + c);
//         })
//       })
//     })
//   });
// }

async function addAsync(x) {
  const a = await doubleAfter2Seconds(10);
  const b = await doubleAfter2Seconds(20);
  const c = await doubleAfter2Seconds(30);
  return x + a + b + c;
}

console.log(
  addAsync(10).then((sum) => {
    console.log(sum);
  })
);
