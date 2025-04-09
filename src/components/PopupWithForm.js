import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
constructor({popupSelector, handleFormSubmit}) {
    super({ popupSelector });
    this._modalForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._modalForm.reset();
    super.close();
  }

  setEventListeners() {
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._modalForm);
      this.close();
    });
  }
}

// index.js
