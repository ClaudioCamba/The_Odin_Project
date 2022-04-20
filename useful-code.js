// Get viewport width and height
var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight || docElem.clientHeight || body.clientHeight;
alert(x + ' × ' + y);

// Window resize eventlistner
window.addEventListener('resize', function (event) {
    console.log(event);
}, true);