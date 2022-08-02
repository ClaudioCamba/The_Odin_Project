// Return true / false if all numbers are within arr
function multipleExist(arr, values) {
  return values.every((value) => {
    return arr.includes(value);
  });
}

// Loop through array and tag each with id = index;
Array.forEach((item, index) => (item.id = index));

// Encode characters
const encodeHTML = (s) => s.split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;").split("'").join("&#39;");
// Decode characters
const decodeHTML = (s) => s.split("&amp;").join("&").split("&lt;").join("<").split("&quot;").join('"').split("&#39;").join("'");

// DOM change eventlistener
// https://stackoverflow.com/questions/3219758/detect-changes-in-the-dom
(function (window) {
  var last = +new Date();
  var delay = 100; // default delay

  // Manage event queue
  var stack = [];

  function callback() {
    var now = +new Date();
    if (now - last > delay) {
      for (var i = 0; i < stack.length; i++) {
        stack[i]();
      }
      last = now;
    }
  }

  // Public interface
  var onDomChange = function (fn, newdelay) {
    if (newdelay) delay = newdelay;
    stack.push(fn);
  };

  // Naive approach for compatibility
  function naive() {
    var last = document.getElementsByTagName("*");
    var lastlen = last.length;
    var timer = setTimeout(function check() {
      // get current state of the document
      var current = document.getElementsByTagName("*");
      var len = current.length;

      // if the length is different
      // it's fairly obvious
      if (len != lastlen) {
        // just make sure the loop finishes early
        last = [];
      }

      // go check every element in order
      for (var i = 0; i < len; i++) {
        if (current[i] !== last[i]) {
          callback();
          last = current;
          lastlen = len;
          break;
        }
      }

      // over, and over, and over again
      setTimeout(check, delay);
    }, delay);
  }

  //
  //  Check for mutation events support
  //

  var support = {};

  var el = document.documentElement;
  var remain = 3;

  // callback for the tests
  function decide() {
    if (support.DOMNodeInserted) {
      window.addEventListener(
        "DOMContentLoaded",
        function () {
          if (support.DOMSubtreeModified) {
            // for FF 3+, Chrome
            el.addEventListener("DOMSubtreeModified", callback, false);
          } else {
            // for FF 2, Safari, Opera 9.6+
            el.addEventListener("DOMNodeInserted", callback, false);
            el.addEventListener("DOMNodeRemoved", callback, false);
          }
        },
        false
      );
    } else if (document.onpropertychange) {
      // for IE 5.5+
      document.onpropertychange = callback;
    } else {
      // fallback
      naive();
    }
  }

  // checks a particular event
  function test(event) {
    el.addEventListener(
      event,
      function fn() {
        support[event] = true;
        el.removeEventListener(event, fn, false);
        if (--remain === 0) decide();
      },
      false
    );
  }

  // attach test events
  if (window.addEventListener) {
    test("DOMSubtreeModified");
    test("DOMNodeInserted");
    test("DOMNodeRemoved");
  } else {
    decide();
  }

  // do the dummy test
  var dummy = document.createElement("div");
  el.appendChild(dummy);
  el.removeChild(dummy);

  // expose
  window.onDomChange = onDomChange;
})(window);

onDomChange(function () {
  console.log("The Times They Are a-Changin'");
});

// Check if element is visible
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Always handle errors
var fs = require("fs");

fs.readFile("/Does/not/exist", handleFile);

function handleFile(error, file) {
  if (error) return console.error("Uhoh, there was an error", error);
  // otherwise, continue on and use `file` in your code
}

// Making ajax call
function get(url) {
  // Return a new promise.
  return new Promise(function (resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open("GET", url);

    req.onload = function () {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      } else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function () {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

// Use it!
get("story.json").then(
  function (response) {
    console.log("Success!", response);
  },
  function (error) {
    console.error("Failed!", error);
  }
);

var userCache = {};

function getUserDetail(username) {
  // In both cases, cached or not, a promise will be returned

  if (userCache[username]) {
    // Return a promise without the "new" keyword
    return Promise.resolve(userCache[username]);
  }

  // Use the fetch API to get the information
  // fetch returns a promise
  return fetch("users/" + username + ".json")
    .then(function (result) {
      userCache[username] = result;
      return result;
    })
    .catch(function () {
      throw new Error("Could not find user: " + username);
    });
}
