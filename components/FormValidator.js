class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._form = formEl;
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
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

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
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

  // _hasInvalidInput(inputElements) {
  //   return inputElements.some((inputEl) => {
  //     return !inputEl.validity.valid;
  //   });
  // }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );

    this
      ._toggleButtonState
      // inputEls
      // submitButton,
      //this._settings.inactiveButtonClass
      ();

    this._inputEls.forEach((inputEl) => {
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

    this._setEventListeners();
  }
}
export default FormValidator;
