const img = document.querySelector("img");
const button = document.querySelector("button");
const input = document.querySelector("input");

// Making fetch call to giphy url
const fetchGif = (s) => {
  fetch("https://api.giphy.com/v1/gifs/translate?api_key=KEY_HERE&s=" + s, { mode: "cors" })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      img.src = response.data.images.original.url;
      console.log(response);
    })
    .catch(function (err) {
      alert(err);
      input.classList.add("error");
    });
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
