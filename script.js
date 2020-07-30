const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function showError(input, message) {
  const formControl = input.parentElement;
  
  formControl.className = 'form-control error';
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(input.value && !re.test(String(input.value.trim()).toLowerCase())) {
    showError(input, 'Email is invalid', input2=0)
  } else if (!input.value) {
    showError(input, 'Email is required')
  } else {
    showSuccess(input)
  }
}

function checkRequired(inputArray) {
  inputArray.forEach((input) => {
    if(input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`)
    } else {
      showSuccess(input)
    }
  })
}

function checkLength(input, min, max) {
  if(input.value.length < min && input.value != "") {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`)
  } else if(!input.value) {
    showError(input, `${getFieldName(input)} is required`)
  } else {
    showSuccess(input)
  }
}

function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    formControl = input1.parentElement
    formControl.className = 'form-control error'
    formControl.querySelector('small').innerText = ""
    showError(input2, 'Passwords do not match')
  }
}

function getFieldName(input) {
  return input.id[0].toUpperCase() + input.id.slice(1)
}

// Event Listeners
form.addEventListener("submit", function (event) {
  event.preventDefault();

  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 25)
  checkEmail(email)
  checkPasswordsMatch(password, password2)
});
