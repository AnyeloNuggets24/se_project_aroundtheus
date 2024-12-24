function showInputError(
  formEl,
  inputEl,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add(errorClass);
  console.log("inputError", inputEl);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageId = `#${inputEl.id}-error`;
  const errorMessageEl = formEl.querySelector(errorMessageId);
  console.log(errorMessageEl);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.classList.remove(errorClass);
  errorMessageEl.textContent = "";
}
function checkInputValidity(formEl, inputEl, enmus) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.ValidationMessage, enmus);
  } else {
    hideInputError(formEl, inputEl, enmus);
  }
}

function hasInvalidInput(inputEl) {
  return inputEl.some((inputEl) => {
    return !inputEl.validity.valid;
  });
}

function disabledButton(inputEls, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
    return;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector, submitButtonSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, errorMessage, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableButton(inputEls, submitButton, inactiveButtonClass) {
  if (!hasInvalidInput(inputEls)) {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function toggleButtonState(inputEls, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputEls)) {
    disabledButton(inputEls, submitButton, inactiveButtonClass);
  } else {
    enableButton(inputEls, submitButton, inactiveButtonClass);
  }
}

function setEventListeners(
  formEl,
  { inputSelector, submitButtonSelector, inactiveButtonClass, ...rest }
) {
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputEls, submitButton);

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, rest);
      toggleButtonState(inputEls, submitButton, inactiveButtonClass);
    });
  });
}

function enableValidation({ formSelector, ...rest }) {
  const formEls = Array.from(document.querySelectorAll(formSelector));
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, rest);

    // look for all inputs of form
    //  loop through all the inputs to see if are all valid
    // if input is not valid
    // get validation message
    // add error class to input
    // display error message
    // disabled button
    // if all inputs are
    // enable button
    // reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
