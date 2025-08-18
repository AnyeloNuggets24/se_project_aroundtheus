import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._inputlist = this._modalForm.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._modalForm.querySelector(".modal__button");
    this._initialButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputlist.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Show "Saving..." while submitting
      this.renderLoading(true);

      const returnValue = this._handleFormSubmit(this._getInputValues());

      if (returnValue && typeof returnValue.then === "function") {
        returnValue
          .then(() => {
            if (this._afterSubmit) this._afterSubmit();
            this.close();
          })
          .finally(() => this.renderLoading(false));
      } else {
        if (this._afterSubmit) this._afterSubmit();
        this.close();
        this.renderLoading(false);
      }
    });

    super.setEventListeners(); // base close logic
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._initialButtonText;
    }
  }

  afterSubmit(fn) {
    this._afterSubmit = fn;
  }
}
