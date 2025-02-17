class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._form = formEl;
    this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
    this._inactiveButtonClass = this._settings.inactiveButtonClass;
    this._inputSelector = this._settings.inputSelector;
    this._errorClass = this._settings.errorClass;
    this._inputErrorClass = this._settings.inputErrorClass;
  }


  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageId = `#${inputEl.id}-error`;
    const errorMessageEl = this._form.querySelector(errorMessageId);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.classList.remove(this._errorClass);
    errorMessageEl.textContent = "";
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hasInvalidInput(inputEl) {
    return inputEl.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState(inputEls) {
    if (this._hasInvalidInput(inputEls)) {
      this._disableButton(inputEls);
    } else {
      this._enableButton(inputEls);
    }
  }

  

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput(inputElements) {
    return inputElements.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    toggleButtonState(
      inputEls,
      submitButton,
      this._settings.inactiveButtonClass
    );

    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        checkInputValidity(this._form, inputEl, config);
        toggleButtonState(inputEls, submitButton, config.inactiveButtonClass);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  
    setEventListeners(formEl, config);
  }
  
