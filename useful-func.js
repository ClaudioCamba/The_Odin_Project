// Return true / false if all numbers are within arr
function multipleExist(arr, values) {
    return values.every(value => {
        return arr.includes(value);
    });
}

// Loop through array and tag each with id = index;
Array.forEach((item, index) => item.id = index);

// Encode characters
const encodeHTML = (s) => s.split('&').join('&amp;').split('<').join('&lt;').split('"').join('&quot;').split("'").join('&#39;');
// Decode characters
const decodeHTML = (s) => s.split('&amp;').join('&').split('&lt;').join('<').split('&quot;').join('"').split('&#39;').join("'");