

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
const form = document.querySelector('form');
const userName = document.querySelector('#uname');
const nameError = document.querySelector('#uname + span.error');
const email = document.querySelector('#mail');
const emailError = document.querySelector('#mail + span.error');
const phone = document.querySelector('#phone');
const phoneError = document.querySelector('#phone + span.error');
const comment = document.querySelector('#comment');
const commentError = document.querySelector('#comment + span.error');
const pattern = /^[a-z][\\.][a-z0-9]/;

// There are many ways to pick a DOM node; here we get the form itself and the email
// input box, as well as the span element into which we will place the error message.
userName.addEventListener('input', function (event) {
    // Each time the user types something, we check if the
    // form fields are valid.
    if (userName.validity.valid && pattern.test(userName.value)) {
        // In case there is an error message visible, if the field
        // is valid, we remove the error message.
        nameError.textContent = ''; // Reset the content of the message
        nameError.className = 'error'; // Reset the visual state of the message
    } else {
        // If there is still an error, show the correct error
        showNameError();
    }
});

email.addEventListener('input', function (event) {
    if (email.validity.valid) {
        emailError.textContent = ''; // Reset the content of the message
        emailError.className = 'error'; // Reset the visual state of the message
    } else {
        showEmailError();
    }
});

phone.addEventListener('input', function (event) {
    console.log(email.validity);
    if (phone.validity.valid) {
        phoneError.textContent = ''; // Reset the content of the message
        phoneError.className = 'error'; // Reset the visual state of the message
    } else {
        showPhoneError();
    }
});

comment.addEventListener('input', function (event) {
    if (comment.validity.valid) {
        commentError.textContent = ''; // Reset the content of the message
        commentError.className = 'error'; // Reset the visual state of the message
    } else {
        showCommentError();
    }
});

//  Error messages
function showNameError() {

    if (userName.validity.patternMismatch || pattern.test(userName.value) === false) {
        nameError.textContent = `${userName.value} does not match the username format`;
    }

    if (userName.validity.valueMissing) {
        // If the field is empty,
        // display the following error message.
        nameError.textContent = 'You need to enter a user name.';
    } else if (pattern.test(userName.value) === false) {
        console.log(userName.value)
    } else if (userName.validity.tooLong) {
        // If the field doesn't contain an email address,
        // display the following error message.
        nameError.textContent = `Username should be no more then ${userName.maxLength} characters; you entered ${userName.value.length}.`;
    } else if (userName.validity.tooShort) {
        // If the data is too short,
        // display the following error message.
        nameError.textContent = `Username should be at least ${userName.minLength} characters; you entered ${userName.value.length}.`;
    }

    // Set the styling appropriately
    nameError.className = 'error active';
}

function showEmailError() {

    if (email.validity.valueMissing) {
        emailError.textContent = 'You need to enter an e-mail address.';
    } else if (email.validity.tooShort) {
        emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
    } else if (email.validity.patternMismatch || email.value.indexOf('@bigcorp.eu') === -1) {
        emailError.textContent = 'Email must contain one or more letters (lower or upper case) or numbers, followed by "@bigcorp.eu"';
    }

    emailError.className = 'error active';
}

function showPhoneError() {

    if (phone.validity.valueMissing) {
        phoneError.textContent = 'You need to enter a phone number.';
    } else if (phone.validity.tooLong) {
        phoneError.textContent = `Phone number should be no more then ${userName.maxLength} characters; you entered ${userName.value.length}.`;
    } else if (phone.validity.tooShort) {
        phoneError.textContent = `Phone number should be at least ${userName.minLength} characters; you entered ${userName.value.length}.`;
    }
    phoneError.className = 'error active';
}

function showCommentError() {
    if (comment.validity.valueMissing) {
        commentError.textContent = 'You need to enter a comment.';
    } else if (comment.validity.tooLong) {
        commentError.textContent = `Comment should be no more then ${comment.maxLength} characters; you entered ${comment.value.length}.`;
    } else if (comment.validity.tooShort) {
        commentError.textContent = `Comment should be at least ${comment.minLength} characters; you entered ${comment.value.length}.`;
    }
    commentError.className = 'error active';
}

// Submit
form.addEventListener('submit', function (event) {
    // if the email field is valid, we let the form submit
    if (!userName.validity.valid) {
        // If it isn't, we display an appropriate error message
        showNameError();
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();
    }

    if (!email.validity.valid) {
        showEmailError();
        event.preventDefault();
    }

    if (!phone.validity.valid) {
        showPhoneError();
        event.preventDefault();
    }

    if (!comment.validity.valid) {
        showCommentError();
        event.preventDefault();
    }
    console.log(phone.validity);
});
