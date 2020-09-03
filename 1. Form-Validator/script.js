const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

const showSuccess = (input) => {
  const formControl = input.parentElement
	formControl.className = 'form-control success'
}

const checkEmail = (input) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

const checkRequired = inputArr => {
  inputArr.map(input => {
    if (input.value.trim() === '') {
      showError(
				input,
				`${getFieldName(input)} is required`
			)
    } else {
      showSuccess(input);
    }
  })
}

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`);
    return false;
  } else if (input.value.length > max) {
    showError(
			input,
			`${getFieldName(input)} must be less than ${max} characters`
    )
    return false
  } else {
    showSuccess(input);
  }
  return true
}

const checkPasswordMatch = (input1, input2) => {
  console.log(input1.value, input2.value)
  if (input1.value.trim() === input2.value.trim()) {
    if (checkLength(password2, 6, 25)) {
      showSuccess(input2)
    }
  } else {
    showError(
			input2,
			`${getFieldName(input2)} do not match`
		)
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);  
  checkLength(username, 3, 8);
  checkLength(password, 6, 25)
  checkEmail(email);
  checkPasswordMatch(password, password2);
})

